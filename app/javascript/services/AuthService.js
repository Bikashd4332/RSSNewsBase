const AUTH_API = '/api/v1/tokens.json';
const SIGNUP_API = '/api/v1/users.json';

class AuthService {
  constructor() {
    // init required variables;
    this.user = null;
    this.refreshToken = '';
    this.accessToken = '';
    this.iAt = '';

    // Try to remember the last logged in user from localStorage;
    this.getSession();
  }
  // For initiating auth to backend api.
  async authenticate(email, password) {
    // Get refresh token first from the endpoint,
    // it also returns the authenticting user if valid.
    this.user = await this.getRefreshToken(email, password);
    // Get access initial access token.
    await this.getAccessToken();
    // Store the session to localStorage.
    this.iAt = Date.now()
    this.setSession();
    return this.user;
  }

  // To check if any user is logged in.
  isAuthenticated() {
    return (this.user) ? true : false;
  }

  // for storing the required data in local storage.
  setSession() {
    Object
      .entries({
        refreshToken: this.refreshToken,
        accessToken: this.accessToken,
        user: JSON.stringify(this.user)
      })
      .forEach(([key, value]) => { localStorage.setItem(key, value) })
  }

  // find and get the previously set token if present else false.
  getSession() {
    ['refreshToken', 'accessToken', 'user', 'iAt']
      .forEach(key => {
        if (key === 'user')
          this.user = JSON.parse(localStorage.getItem(key));
        else
          this[key] = localStorage.getItem(key);
      });
  }

  clearSession() {
    ['refreshToken', 'accessToken', 'user']
      .forEach(key => {
        localStorage.removeItem(key);
      });
  }

  // function to get refresh token from backend
  async getRefreshToken(email, password) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    const body = { email, password };
    return fetch(AUTH_API, { method: 'POST', headers: headers, body: JSON.stringify(body) })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        this.refreshToken = response.headers.get('Authorization');
        return response.json();
      })
  }
  // function to get access token by refresh token;
  async getAccessToken() {
    if (this.refreshToken !== '') {
      const header = { Authorization: this.refreshToken };
      return fetch(AUTH_API, { method: 'PUT', headers: header })
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          this.accessToken = response.headers.get('Authorization')
        })
    }
  }

  // to logout the user currently logged.
  logout() {
    this.clearSession();
    this.user = this.accessToken = this.refreshToken = this.iAt = null;
  }

  // Sign the given user up.
  // param Object<any>, Function
  async signUp(user, validationCallback) {
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ user });

    // Request for user sign up if recieves 422 then call the validationCallback.
    await fetch(SIGNUP_API, { method: 'POST', headers: headers, body: body })
      .then(async response => {
        // if request succeeds then get refresh token.
        if (response.ok) {
          this.refreshToken = response.headers.get('Authorization');
          // we need access token too to complete user auth.
          await this.getAccessToken();
          this.user = await response.json();
        } else {
          const validationResponse = await response.json();
          validationCallback(validationResponse);
        }
      });
    // if everything goes well return this user.
    if (this.accessToken) {
      this.setSession();
      return this.user;
    }
    return null;
  }
}

export default new AuthService();
