const url = require('url');
const cheerio = require('cheerio');
const request = require('request');
const Q = require('q');

function getUrlQueryParams(urlString) {
  return url.parse(urlString, true).query;
}

function scrape(url, fn) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      if (error || response.statusCode !== 200) {
        reject(error);
        return;
      }
      const $ = cheerio.load(html);
      const params = getUrlQueryParams(url);
      resolve(fn($, params));
    });
  });
}

function batchPromises(items, fn, options) {
  var results = [];
  var index = options.batchSize - 1;

  function getNextItem() {
    index++;
    if (items.length > index) {
      var nextItem = items[index];
      return getCurrentItem(nextItem);
    }
  }

  function getCurrentItem(item) {
    console.log(item, 'Starting');
    return fn(item)
      .then(function(result) {
        console.log(item, 'Success');
        results.push(result);
        return getNextItem();
      })
      .catch(function() {
        console.log(item, 'Error');
        return options.retry ? getCurrentItem(item) : getNextItem();
      });
  }

  var promises = items.slice(0, options.batchSize).map(function(item) {
    return getCurrentItem(item);
  });
  return Q.all(promises).then(function() {
    return results;
  });
}

function diffInMinutes(time2, time1) {

  var diff = (time2 - time1) / 1000;
  diff /= 60;
  return Math.abs(diff).toFixed(2);

}

module.exports = {
  scrape: scrape,
  batchPromises: batchPromises,
  diffInMinutes: diffInMinutes
};
