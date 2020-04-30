import AuthService from "./AuthService";

const ALL_AGENCY_API = "/api/v1/agencies.json";
const USER_AGENCY_API = "/api/v1/users_agencies.json";

class AgencyFetchService {
  constructor() {
    this.recentlyFetchedAgencies = null;
  }
  // this version of fetch depends if the user is logged in or not
  // and thus fetched records accoridngly
  async fetch() {
    const headers = AuthService.isLoggedIn()
      ? { Authorization: AuthService.accessToken }
      : {};
    const url = AuthService.isLoggedIn() ? USER_AGENCY_API : ALL_AGENCY_API;
    const agencies = fetch(url, { headers: headers }).then(response =>
      response.json()
    );
    return agencies;
  }

  // this is always fetches complete records even if any user is logged in.
  async fetchAll() {
    const headers = { Authorization: AuthService.accessToken };
    const agencies = await fetch(ALL_AGENCY_API, { headers }).then(response =>
      response.json()
    );
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
    await fetch(USER_AGENCY_API, {
      headers,
      method: "POST",
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) {
        throw response.statusText;
      }
    });
  }
}

export default new AgencyFetchService();
