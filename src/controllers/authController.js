import { AuthService } from '../services/authService.js';
import { sessionService } from '../services/sessionService.js';
import { AuthView } from '../../views/authView.js';
import { InputHelper } from '../utils/inputHelper.js';

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async showAuthMenu() {
    while (true) {
      try {
        AuthView.showWelcome();
        const choice = AuthView.showAuthMenu();

        switch (choice) {
          case 0: // Login
            await this.handleLogin();
            return sessionService.isLoggedIn();
          case 1: // Register
            await this.handleRegister();
            break;
          case 2: // Keluar
            console.log('\nTerima kasih telah menggunakan Todo App!');
            return false;
          default:
            AuthView.showError('Pilihan tidak valid');
        }
      } catch (error) {
        AuthView.showError(error.message);
        InputHelper.waitForEnter();
      }
    }
  }

  async handleLogin() {
    const { username, password } = AuthView.getLoginData();
    const user = await this.authService.login(username, password);
    sessionService.login(user);
    AuthView.showSuccess(`Selamat datang, ${user.username}!`);
    InputHelper.waitForEnter();
  }

  async handleRegister() {
    const { username, email, password } = AuthView.getRegisterData();
    await this.authService.register(username, email, password);
    AuthView.showSuccess('Registrasi berhasil! Silakan login.');
    InputHelper.waitForEnter();
  }

  async showProfile() {
    try {
      const currentUser = sessionService.getCurrentUser();
      const profile = await this.authService.getUserProfile(currentUser.id);
      AuthView.showProfile(profile);
      InputHelper.waitForEnter();
    } catch (error) {
      AuthView.showError(error.message);
      InputHelper.waitForEnter();
    }
  }

  logout() {
    const currentUser = sessionService.getCurrentUser();
    sessionService.logout();
    AuthView.showSuccess(`Sampai jumpa, ${currentUser.username}!`);
    InputHelper.waitForEnter();
  }
}