const API = '/api/v1/categories.json';

class CategoryFetchService {
  constructor() { }

  async fetch() {
    const categories = await fetch(API).then(response => response.json());
    return categories;
  }
}

export default new CategoryFetchService();