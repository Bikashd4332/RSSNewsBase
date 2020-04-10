const API = '/api/v1/agencies.json';

class AgencyFetchService {
  constructor() {}
  async fetch() {
    const url = API;
    const newsItems = fetch(url).then(response => response.json());
    return newsItems;
  }
}

export default new AgencyFetchService();