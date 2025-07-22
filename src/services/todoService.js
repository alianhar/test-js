import { TodoRepository } from '../repositories/todoRepository.js';
import { CryptoUtils } from '../utils/crypto.js';
import { Validator } from '../utils/validator.js';
import { Todo } from '../models/todo.js';

export class TodoService {
  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async createTodo(userId, title, description = '', priority = 'medium') {
    if (!Validator.isNotEmpty(title)) {
      throw new Error('Judul todo tidak boleh kosong');
    }

    if (!Validator.isValidPriority(priority)) {
      throw new Error('Priority harus: low, medium, atau high');
    }

    const newTodo = new Todo(
      CryptoUtils.generateId(),
      userId,
      title.trim(),
      description.trim(),
      false,
      priority.toLowerCase()
    );

    return await this.todoRepository.save(newTodo);
  }

  async getUserTodos(userId) {
    return await this.todoRepository.findByUserId(userId);
  }

  async getTodoById(id) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new Error('Todo tidak ditemukan');
    }
    return todo;
  }

  async updateTodo(id, userId, updates) {
    const todo = await this.getTodoById(id);
    
    if (todo.userId !== userId) {
      throw new Error('Anda tidak memiliki akses untuk mengubah todo ini');
    }

    if (updates.title !== undefined) {
      if (!Validator.isNotEmpty(updates.title)) {
        throw new Error('Judul todo tidak boleh kosong');
      }
      todo.title = updates.title.trim();
    }

    if (updates.description !== undefined) {
      todo.description = updates.description.trim();
    }

    if (updates.priority !== undefined) {
      if (!Validator.isValidPriority(updates.priority)) {
        throw new Error('Priority harus: low, medium, atau high');
      }
      todo.priority = updates.priority.toLowerCase();
    }

    if (updates.completed !== undefined) {
      todo.completed = Boolean(updates.completed);
    }

    todo.updatedAt = new Date();
    return await this.todoRepository.save(todo);
  }

  async toggleTodo(id, userId) {
    const todo = await this.getTodoById(id);
    
    if (todo.userId !== userId) {
      throw new Error('Anda tidak memiliki akses untuk mengubah todo ini');
    }

    todo.completed = !todo.completed;
    todo.updatedAt = new Date();
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id, userId) {
    const todo = await this.getTodoById(id);
    
    if (todo.userId !== userId) {
      throw new Error('Anda tidak memiliki akses untuk menghapus todo ini');
    }

    await this.todoRepository.delete(id);
  }

  async getFilteredTodos(userId, filter = 'all') {
    const todos = await this.getUserTodos(userId);
    
    switch (filter.toLowerCase()) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      case 'high':
        return todos.filter(todo => todo.priority === 'high');
      case 'medium':
        return todos.filter(todo => todo.priority === 'medium');
      case 'low':
        return todos.filter(todo => todo.priority === 'low');
      default:
        return todos;
    }
  }

  async getTodoStats(userId) {
    const todos = await this.getUserTodos(userId);
    return {
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      pending: todos.filter(todo => !todo.completed).length,
      high: todos.filter(todo => todo.priority === 'high').length,
      medium: todos.filter(todo => todo.priority === 'medium').length,
      low: todos.filter(todo => todo.priority === 'low').length
    };
  }
}