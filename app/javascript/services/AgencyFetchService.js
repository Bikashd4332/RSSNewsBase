import AuthService from "./AuthService";
import AuthRefreshable from "./AuthRefreshable";

const ALL_AGENCY_API = "/api/v1/agencies.json";
const USER_AGENCY_API = "/api/v1/users_agencies.json";

class AgencyFetchService extends AuthRefreshable {
  constructor() {
    super();
    this.recentlyFetchedAgencies = null;
  }
  // this version of fetch depends if the user is logged in or not
  // and thus fetched records accoridngly
  async fetch() {
    const headers = AuthService.isLoggedIn()
      ? { Authorization: AuthService.accessToken }
      : {};
    const url = AuthService.isLoggedIn() ? USER_AGENCY_API : ALL_AGENCY_API;
    const agencies = await this.makeRequest(url, { headers: headers });
    return agencies;
  }

  // this is always fetches complete records even if any user is logged in.
  async fetchAll() {
    const headers = { Authorization: AuthService.accessToken };
    const agencies = await super.makeRequest(ALL_AGENCY_API, { headers });
    this.recentlyFetchedAgencies = agencies;
    return agencies;
  }

  // param agencyIds Array<Integer> - subscribe to all the ids for the logged in user
  async subscribe(agencyIds) {
    const body = { agency_selection: agencyIds };
    const headers = {
      Authorization: AuthService.accessToken,
      "Content-Type": "application/json"
    };
    await super.makeRequest(USER_AGENCY_API, {
      headers,
      method: "POST",
      body: JSON.stringify(body)
    });
  }
}

export default new AgencyFetchService();
