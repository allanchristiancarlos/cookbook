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
      body: JSON.stringify(data)
    }
    return Http.fetch(url, options);
  }

  static fetch(url, options) {
    return fetch(`http://192.168.1.30:3000/${url}`, options).then(x =>
      x.json()
    );
  }
}