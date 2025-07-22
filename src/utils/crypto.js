import crypto from 'crypto';

export class CryptoUtils {
  static hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  static generateId() {
    return crypto.randomUUID();
  }

  static verifyPassword(inputPassword, hashedPassword) {
    const inputHashed = this.hashPassword(inputPassword);
    return inputHashed === hashedPassword;
  }
}