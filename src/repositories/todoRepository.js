import { BaseRepository } from './baseRepository.js';
import { Todo } from '../models/todo.js';

export class TodoRepository extends BaseRepository {
  constructor() {
    super('todos.json');
  }

  async findAll() {
    const data = await this.readData();
    return data.map(Todo.fromJSON);
  }

  async findById(id) {
    const todos = await this.findAll();
    return todos.find(todo => todo.id === id) || null;
  }

  async findByUserId(userId) {
    const todos = await this.findAll();
    return todos.filter(todo => todo.userId === userId);
  }

  async save(todo) {
    const todos = await this.findAll();
    const existingIndex = todos.findIndex(t => t.id === todo.id);
    
    if (existingIndex >= 0) {
      todos[existingIndex] = todo;
    } else {
      todos.push(todo);
    }

    const jsonData = todos.map(t => t.toJSON());
    await this.writeData(jsonData);
    return todo;
  }

  async delete(id) {
    const todos = await this.findAll();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    const jsonData = filteredTodos.map(t => t.toJSON());
    await this.writeData(jsonData);
  }

  async deleteByUserId(userId) {
    const todos = await this.findAll();
    const filteredTodos = todos.filter(todo => todo.userId !== userId);
    const jsonData = filteredTodos.map(t => t.toJSON());
    await this.writeData(jsonData);
  }
}