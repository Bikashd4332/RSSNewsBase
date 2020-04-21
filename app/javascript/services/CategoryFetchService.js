const API = '/api/v1/categories.json';

class CategoryFetchService {
  constructor() { }

  async fetch() {
    const headers = { 'Authorization': localStorage.getItem("accessToken")}
    const categories = await fetch(API, { headers }).then(response => response.json());
    return categories;
  }
}

export default new CategoryFetchService();
