import { UserRepository } from '../repositories/userRepository.js';
import { CryptoUtils } from '../utils/crypto.js';
import { Validator } from '../utils/validator.js';
import { User } from '../models/user.js';

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(username, email, password) {
    // Validasi input
    if (!Validator.isValidUsername(username)) {
      throw new Error('Username harus antara 3-20 karakter');
    }

    if (!Validator.isValidEmail(email)) {
      throw new Error('Format email tidak valid');
    }

    if (!Validator.isValidPassword(password)) {
      throw new Error('Password minimal 6 karakter');
    }

    // Cek apakah username sudah ada
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('Username sudah digunakan');
    }

    // Cek apakah email sudah ada
    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error('Email sudah digunakan');
    }

    // Buat user baru
    const hashedPassword = CryptoUtils.hashPassword(password);
    const newUser = new User(
      CryptoUtils.generateId(),
      username,
      email,
      hashedPassword
    );

    return await this.userRepository.save(newUser);
  }

  async login(username, password) {
    if (!username || !password) {
      throw new Error('Username dan password harus diisi');
    }

    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Username atau password salah');
    }

    if (!CryptoUtils.verifyPassword(password, user.password)) {
      throw new Error('Username atau password salah');
    }

    return user;
  }

  async getUserProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User tidak ditemukan');
    }

    // Return user tanpa password
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}