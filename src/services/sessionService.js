import { Session } from '../models/session.js';

export class SessionService {
  constructor() {
    this.currentSession = null;
  }

  login(user) {
    this.currentSession = new Session(user.id, user.username);
    return this.currentSession;
  }

  logout() {
    if (this.currentSession) {
      this.currentSession.logout();
      this.currentSession = null;
    }
  }

  getCurrentUser() {
    return this.currentSession ? {
      id: this.currentSession.userId,
      username: this.currentSession.username
    } : null;
  }

  isLoggedIn() {
    return this.currentSession && this.currentSession.isActive;
  }
}

// Singleton instance
export const sessionService = new SessionService();