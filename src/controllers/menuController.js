import { AuthController } from './authController.js';
import { TodoController } from './todoController.js';
import { sessionService } from '../services/sessionService.js';
import { TodoView } from '../../views/todoView.js';

export class MenuController {
  constructor() {
    this.authController = new AuthController();
    this.todoController = new TodoController();
  }

  async start() {
    console.log('🚀 Starting Todo App...\n');
    
    while (true) {
      try {
        if (!sessionService.isLoggedIn()) {
          const loginSuccess = await this.authController.showAuthMenu();
          if (!loginSuccess) {
            break; // User chose to exit
          }
        } else {
          await this.showMainMenu();
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        console.log('Press Enter to continue...');
        process.stdin.once('data', () => {});
      }
    }
  }

  async showMainMenu() {
    const currentUser = sessionService.getCurrentUser();
    const choice = TodoView.showMainMenu(currentUser.username);

    switch (choice) {
      case 0: // Lihat Semua Todo
        await this.todoController.showAllTodos();
        break;
      case 1: // Tambah Todo Baru
        await this.todoController.createTodo();
        break;
      case 2: // Edit Todo
        await this.todoController.editTodo();
        break;
      case 3: // Hapus Todo
        await this.todoController.deleteTodo();
        break;
      case 4: // Toggle Status Todo
        await this.todoController.toggleTodo();
        break;
      case 5: // Filter Todo
        await this.todoController.filterTodos();
        break;
      case 6: // Statistik Todo
        await this.todoController.showStats();
        break;
      case 7: // Profil User
        await this.authController.showProfile();
        break;
      case 8: // Logout
        this.authController.logout();
        break;
      default:
        TodoView.showError('Pilihan tidak valid');
    }
  }
}