export class Session {
  constructor(userId, username, loginTime = new Date()) {
    this.userId = userId;
    this.username = username;
    this.loginTime = loginTime;
    this.isActive = true;
  }

  logout() {
    this.isActive = false;
    this.logoutTime = new Date();
  }
}