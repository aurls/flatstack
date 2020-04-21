class Location {
  constructor () {
    this._url = 'http://ip-api.com/json/';
  }

  async get () {
    const response = await window.fetch(this._url);
    if (!response.ok) {
      return new Error();
    }
    return response.json();
  }
}

export default Location;
