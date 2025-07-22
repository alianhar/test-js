import { BaseRepository } from './baseRepository.js';
import { User } from '../models/user.js';

export class UserRepository extends BaseRepository {
  constructor() {
    super('users.json');
  }

  async findAll() {
    const data = await this.readData();
    return data.map(User.fromJSON);
  }

  async findById(id) {
    const users = await this.findAll();
    return users.find(user => user.id === id) || null;
  }

  async findByUsername(username) {
    const users = await this.findAll();
    return users.find(user => user.username === username) || null;
  }

  async findByEmail(email) {
    const users = await this.findAll();
    return users.find(user => user.email === email) || null;
  }

  async save(user) {
    const users = await this.findAll();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }

    const jsonData = users.map(u => u.toJSON());
    await this.writeData(jsonData);
    return user;
  }

  async delete(id) {
    const users = await this.findAll();
    const filteredUsers = users.filter(user => user.id !== id);
    const jsonData = filteredUsers.map(u => u.toJSON());
    await this.writeData(jsonData);
  }
}