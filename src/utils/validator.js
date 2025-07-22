export class Validator {
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidUsername(username) {
    return username && username.length >= 3 && username.length <= 20;
  }

  static isValidPassword(password) {
    return password && password.length >= 6;
  }

  static isNotEmpty(value) {
    return value && value.trim().length > 0;
  }

  static isValidPriority(priority) {
    return ['low', 'medium', 'high'].includes(priority.toLowerCase());
  }
}