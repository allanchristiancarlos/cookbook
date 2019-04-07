export class Http {
  static get(url, options) {
    options = {
      ...options,
      method: 'GET'
    };
    return Http.fetch(url, options);
  }

  static post(url, data, options) {
    options = {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return Http.fetch(url, options);
  }

  static delete(url, options) {
    options = {
      ...options,
      method: 'DELETE'
    };
    return Http.fetch(url, options);
  }

  static patch(url, data, options) {
    options = {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return Http.fetch(url, options);
  }

  static fetch(url, options) {
    const { withUrl = true } = options;
    const fullUrl = withUrl ? `http://192.168.1.30:3000/${url}` : url;
    return fetch(fullUrl, options).then(async x => {
      const data = await x.json();
      return {
        data: data,
        links: parseHeaderLink(x.headers.get('link'))
      };
    });
  }
}

function parseHeaderLink(header) {
  if (!header) {
    return null;
  }
  if (header.length === 0) {
    throw new Error('input must not be of zero length');
  }

  // Split parts by comma
  const parts = header.split(',');
  const links = {};
  // Parse each part into a named link
  for (let i = 0; i < parts.length; i++) {
    const section = parts[i].split(';');
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    const url = section[0].replace(/<(.*)>/, '$1').trim();
    const name = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = url;
  }
  return links;
}
