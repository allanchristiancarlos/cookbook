const utils = require('./utils');
const fs = require('fs');
const path = require('path');
const rxjs = require('rxjs');
const rxjsOperators = require('rxjs/operators');


function scrape(url) {
  return utils.scrape(url, ($, queryParams) => {
    const name = $(
      '.node-recipe > div.group-left > div.field.field-name-title.field-type-ds.field-label-hidden > div > div > h1'
    ).text();
    const prepTimeRaw = parseFloat(
      $(
        '.node-recipe > div.group-right > div.field.field-name-field-preparation-time.field-type-text.field-label-inline.clearfix > div.field-items > div'
      ).text()
    );
    const prepTime = $(
      '.node-recipe > div.group-right > div.field.field-name-field-preparation-time.field-type-text.field-label-inline.clearfix > div.field-items > div'
    ).text();
    const cookTime = $(
      '.node-recipe > div.group-right > div.field.field-name-field-cooking-time.field-type-text.field-label-inline.clearfix > div.field-items > div'
    ).text();
    const cookTimeRaw = parseFloat(
      $(
        '.node-recipe > div.group-right > div.field.field-name-field-cooking-time.field-type-text.field-label-inline.clearfix > div.field-items > div'
      ).text()
    );
    const serving = parseFloat(
      $(
        '.node-recipe > div.group-right > div.field.field-name-field-serves.field-type-taxonomy-term-reference.field-label-inline.clearfix > div.field-items > div > span > a'
      ).text()
    );
    const rating = parseFloat(
      $(
        '#fivestar-custom-widget > div > div > div > div > div.description > div > span.average-rating > span'
      ).text()
    );
    const difficulty = $(
      '.node-recipe > div.group-right > div.field.field-name-field-difficulty.field-type-taxonomy-term-reference.field-label-above > div.field-items > div'
    ).text();
    const ingredients = Array.from(
      $(
        '#quicktabs-tabpage-recipe_single_tabs-0 > div > div.attachment.attachment-after > div.view.view-recipes-single.view-id-recipes_single.view-display-id-attachment_1 > div.view-content > div > div.views-field.views-field-field-ingredients > div > div > ul > li > span'
      )
    ).map(x => {
      return $(x)
        .text()
        .trim();
    });

    const steps = Array.from(
      $(
        '#quicktabs-tabpage-recipe_single_tabs-0 > div > div.attachment.attachment-after > div.view.view-recipes-single.view-id-recipes_single.view-display-id-attachment_2 > div.view-content > div.views-row.views-row-1.views-row-odd.views-row-first > div.views-field.views-field-field-method > div > div > ol > li'
      )
    ).map(x => {
      return $(x)
        .text()
        .trim();
    });
    const occasions = Array.from(
      $(
        '.node-recipe > div.group-right > div.field.field-name-field-events-seasons.field-type-taxonomy-term-reference.field-label-above > div.field-items > div > a'
      )
    ).map(x => {
      return $(x)
        .text()
        .trim();
    });
    const relatedCategories = Array.from(
      $(
        '.node-recipe > div.group-right > div.field.field-name-field-categories-all.field-type-taxonomy-term-reference.field-label-above > div.field-items > div > a'
      )
    ).map(x => {
      return $(x)
        .text()
        .trim();
    });
    return {
      id: queryParams.recipeId,
      name,
      prepTimeRaw: prepTimeRaw || null,
      prepTime: prepTime || null,
      cookTime: cookTime || null,
      cookTimeRaw: cookTimeRaw || null,
      serving: serving || null,
      rating: rating || null,
      difficulty: difficulty || null,
      ingredients: ingredients || null,
      steps: steps || null,
      occasions: occasions || null,
      relatedCategories: relatedCategories || null
    };
  });
}

function scrapeMany(urls, filename) {
  const totalCount = urls.length;
  let finishedCount = 0;
  let fs = require('fs');
  let p = path.join(__dirname, filename);
  const writeFiles$ = new rxjs.Subject();

  writeFiles$
    .pipe(
      rxjsOperators.concatMap(x => {
        return rxjs.of(
          new Promise((resolve, reject) => {
            var data = fs.readFileSync(p, 'utf8');
            
            var obj = JSON.parse(data || '""') || []; //now it an object
            obj.push(x); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFileSync(p, json, 'utf8'); // write it back
            finishedCount++;
            const percent = ((finishedCount / totalCount) * 100).toFixed(
              2
            );
            console.log(
              `Written: ${finishedCount}/${totalCount} - ${percent}% | ${
              x.name
              }`
            );
          })
        );
      })
    )
    .subscribe();

  return utils.batchPromises(
    urls,
    item => {
      return scrape(item).then(x => {
        writeFiles$.next(x);
        return x;
      });
    },
    { batchSize: 3, retry: true }
  );
}

module.exports = {
  scrape: scrape,
  scrapeMany: scrapeMany
};
