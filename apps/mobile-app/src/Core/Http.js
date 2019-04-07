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
    return fetch(`http://192.168.1.30:3000/${url}`, options).then(async (x) => {
      const data = await x.json();
      return {
        data: data,
        headers: x.headers
      };
    });
  }
}
