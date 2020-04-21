const API = '/api/v1/agencies.json';

class AgencyFetchService {
  constructor() {}
  async fetch() {
    const headers = { 'Authorization': localStorage.getItem("accessToken")};
    const newsItems = fetch(API, { headers }).then(response => response.json());
    return newsItems;
  }
}

export default new AgencyFetchService();
