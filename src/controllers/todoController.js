import { TodoService } from '../services/todoService.js';
import { sessionService } from '../services/sessionService.js';
import { TodoView } from '../../views/todoView.js';
import { InputHelper } from '../utils/inputHelper.js';

export class TodoController {
  constructor() {
    this.todoService = new TodoService();
  }

  getCurrentUserId() {
    const currentUser = sessionService.getCurrentUser();
    return currentUser.id;
  }

  async showAllTodos() {
    try {
      const todos = await this.todoService.getUserTodos(this.getCurrentUserId());
      TodoView.showTodos(todos);
      InputHelper.waitForEnter();
    } catch (error) {
      TodoView.showError(error.message);
      InputHelper.waitForEnter();
    }
  }

  async createTodo() {
    try {
      const todoData = TodoView.getNewTodoData();
      await this.todoService.createTodo(
        this.getCurrentUserId(),
        todoData.title,
        todoData.description,
        todoData.priority
      );
      TodoView.showSuccess('Todo berhasil ditambahkan!');
      InputHelper.waitForEnter();
    } catch (error) {
      TodoView.showError(error.message);
      InputHelper.waitForEnter();
    }
  }

  async editTodo() {
    try {
      const todos = await this.todoService.getUserTodos(this.getCurrentUserId());
      if (todos.length === 0) {
        TodoView.showError('Tidak ada todo untuk diedit');
        InputHelper.waitForEnter();
        return;
      }

      const selectedTodo = TodoView.selectTodoFromList(todos);
      const updates = TodoView.getUpdateTodoData(selectedTodo);
      
      if (Object.keys(updates).length === 0) {
        TodoView.showError('Tidak ada perubahan yang dilakukan');
        InputHelper.waitForEnter();
        return;
      }

      await this.todoService.updateTodo(selectedTodo.id, this.getCurrentUserId(), updates);
      TodoView.showSuccess('Todo berhasil diupdate!');
      InputHelper.waitForEnter();
    } catch (error) {
      TodoView.showError(error.message);
      InputHelper.waitForEnter();
    }
  }

  async deleteTodo() {
    try {
      const todos = await this.todoService.getUserTodos(this.getCurrentUserId());
      if (todos.length === 0) {
        TodoView.showError('Tidak ada todo untuk dihapus');
        InputHelper.waitForEnter();
        return;
      }

      const selectedTodo = TodoView.selectTodoFromList(todos);
      const confirmation = InputHelper.getConfirmation(`Yakin ingin menghapus "${selectedTodo.title}"?`);
      
      if (confirmation) {
        await this.todoService.deleteTodo(selectedTodo.id, this.getCurrentUserId());
        TodoView.showSuccess('Todo berhasil dihapus!');
      } else {
        TodoView.showSuccess('Penghapusan dibatalkan');
      }
      InputHelper.waitForEnter();
    } catch (error) {
      TodoView.showError(error.message);
      InputHelper.waitForEnter();
    }
  }

  async toggleTodo() {
    try {
      const todos = await this.todoService.getUserTodos(this.getCurrentUserId());
      if (todos.length === 0) {
        TodoView.showError('Tidak ada todo untuk diubah statusnya');
        InputHelper.waitForEnter();
        return;
      }

      const selectedTodo = TodoView.selectTodoFromList(todos);
      await this.todoService.toggleTodo(selectedTodo.id, this.getCurrentUserId());
      
      const newStatus = selectedTodo.completed ? 'belum selesai' : 'selesai';
      TodoView.showSuccess(`Status todo berhasil diubah menjadi ${newStatus}!`);
      InputHelper.waitForEnter();
    } catch (error) {
      TodoView.showError(error.message);
      InputHelper.waitForEnter();
    }
  }

  async filterTodos() {
    try {
      const filter = TodoView.showFilterMenu();
      const todos = await this.todoService.getFilteredTodos(this.getCurrentUserId(), filter);
      
      const filterNames = {
        'all': 'SEMUA TODO',
        'completed': 'TODO SELESAI',
        'pending': 'TODO BELUM SELESAI',
        'high': 'TODO PRIORITY HIGH',
        'medium': 'TODO PRIORITY MEDIUM',
        'low': 'TODO PRIORITY LOW'
      };
      
      TodoView.showTodos(todos, filterNames[filter]);
      InputHelper.waitForEnter();
    } catch (error) {
      TodoView.showError(error.message);
      InputHelper.waitForEnter();
    }
  }

  async showStats() {
    try {
      const stats = await this.todoService.getTodoStats(this.getCurrentUserId());
      TodoView.showStats(stats);
      InputHelper.waitForEnter();
    } catch (error) {
      TodoView.showError(error.message);
      InputHelper.waitForEnter();
    }
  }
}