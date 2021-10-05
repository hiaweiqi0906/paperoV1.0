import axios from "axios";

class Auth {
  constructor() {
    this.authenticated = false;
    this.haventCheck = true;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
