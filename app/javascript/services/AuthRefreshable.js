/*
 * This class will be responsible for intercepting each request
 * and checking if the difference in current and iAt time is
 * below 60 minutes. If it exceeds then before making the required
 * request first get the accessToken refreshed and then with the
 * refreshed token make whichever required request is needed.
 *
 *  This class will be taking the help of AuthService for refreshing
 *  token. Every other services will be inheriting from this service.
 */

import AuthService from "./AuthService";

class AuthRefreshable {
  constructor() {}

  // an interceptor method for making request to server.
  async makeRequest(endpoint, options = {}, callBack) {
    if ( AuthService.isLoggedIn() && AuthService.checkValidityOfAccessToken()) {
      // since expired so refresh accessToken with refreshToken
      await AuthService.getAccessToken();
      // Recalculate iat from retreived accessToken.
      AuthService.updateSession();
    }
    return fetch(endpoint, options).then(response => {
      if (response.ok) {
        // Never consume body inside callBack
        callBack && callBack(response);
        return response.json();
      } else {
        throw response.statusText;
      }
    });
  }
}

export default AuthRefreshable;
