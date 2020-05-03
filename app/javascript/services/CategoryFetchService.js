import AuthService from "./AuthService";
import AuthRefreshable from "./AuthRefreshable";

const ALL_CATEGORY_FETCH_API = "/api/v1/categories.json";
const USER_CATEGORY_FETCH_API = "/api/v1/users_categories.json";

class CategoryFetchService extends AuthRefreshable {
  constructor() {
    super();
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
    const categories = await super.makeRequest(url, { headers: headers });
    return categories;
  }

  // this is always fetches complete records even if any user is logged in.
  async fetchAll() {
    const headers = { Authorization: AuthService.accessToken };
    const categoryList = await super.makeRequest(ALL_CATEGORY_FETCH_API, {
      headers
    });
    this.recentlyFetchedCategories = categoryList;
    return categoryList;
  }

  // param categoryIds Array<Integer> - subscribe to all the ids for the logged in user
  async subscribe(categoryIds) {
    const headers = {
      Authorization: AuthService.accessToken,
      "Content-Type": "application/json"
    };
    await super.makeRequest(USER_CATEGORY_FETCH_API, {
      method: "POST",
      headers,
      body: JSON.stringify({ category_selection: categoryIds })
    });
  }
}

export default new CategoryFetchService();
