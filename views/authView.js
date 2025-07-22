import { InputHelper } from '../src/utils/inputHelper.js';

export class AuthView {
  static showWelcome() {
    console.clear();
    console.log('='.repeat(50));
    console.log('       SELAMAT DATANG DI TODO APP');
    console.log('='.repeat(50));
  }

  static showAuthMenu() {
    const options = ['Login', 'Register', 'Keluar'];
    return InputHelper.getChoice('Pilih opsi: ', options);
  }

  static getLoginData() {
    console.log('\n--- LOGIN ---');
    const username = InputHelper.getString('Username: ');
    const password = InputHelper.getPassword('Password: ');
    return { username, password };
  }

  static getRegisterData() {
    console.log('\n--- REGISTER ---');
    const username = InputHelper.getString('Username (3-20 karakter): ');
    const email = InputHelper.getString('Email: ');
    const password = InputHelper.getPassword('Password (min 6 karakter): ');
    const confirmPassword = InputHelper.getPassword('Konfirmasi Password: ');
    
    if (password !== confirmPassword) {
      throw new Error('Password tidak cocok!');
    }
    
    return { username, email, password };
  }

  static showProfile(profile) {
    console.log('\n--- PROFIL USER ---');
    console.log(`ID: ${profile.id}`);
    console.log(`Username: ${profile.username}`);
    console.log(`Email: ${profile.email}`);
    console.log(`Bergabung: ${new Date(profile.createdAt).toLocaleDateString('id-ID')}`);
    console.log(`Diupdate: ${new Date(profile.updatedAt).toLocaleDateString('id-ID')}`);
  }

  static showError(message) {
    console.log(`\n❌ Error: ${message}`);
  }

  static showSuccess(message) {
    console.log(`\n✅ ${message}`);
  }
}