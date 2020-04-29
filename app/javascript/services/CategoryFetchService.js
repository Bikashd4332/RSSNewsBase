import AuthService from "./AuthService";

const ALL_CATEGORY_FETCH_API = "/api/v1/categories.json";
const USER_CATEGORY_FETCH_API = "/api/v1/users_categories.json";

class CategoryFetchService {
  constructor() {
    this.recentlyFetchedCategories = [];
  }

  // Fethces the categories depending on the logged in user.
  async fetch() {
    // should request go to all categories or user preferred categories.
    const url = AuthService.isLoggedIn()
      ? USER_CATEGORY_FETCH_API
      : ALL_CATEGORY_FETCH_API;
    const headers = AuthService.isLoggedIn()
      ? { Authorization: AuthService.accessToken }
      : {};
    const categories = await fetch(url, { headers: headers })
      .then(response => response.json())
      .catch(reason => {
        throw reason;
      });
    return categories;
  }

  // this is always fetches complete records even if any user is logged in.
  async fetchAll() {
    const categoryList = await fetch(ALL_CATEGORY_FETCH_API).then(response =>
      response.json()
    );
    this.recentlyFetchedCategories = categoryList;
    return categoryList;
  }

  // param categoryIds Array<Integer> - subscribe to all the ids for the logged in user
  async subscribe(categoryIds) {
    const headers = {
      Authorization: AuthService.accessToken,
      "Content-Type": "application/json"
    };
    await fetch(USER_CATEGORY_FETCH_API, {
      method: "POST",
      headers,
      body: JSON.stringify({ category_selection: categoryIds })
    }).then(response => {
      if (!response.ok) {
        throw response.statusText;
      }
    });
  }
}

export default new CategoryFetchService();
