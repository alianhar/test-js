import { InputHelper } from '../src/utils/inputHelper.js';

export class TodoView {
  static showMainMenu(username) {
    console.clear();
    console.log('='.repeat(50));
    console.log(`       TODO APP - Hai, ${username}!`);
    console.log('='.repeat(50));
    
    const options = [
      'Lihat Semua Todo',
      'Tambah Todo Baru',
      'Edit Todo',
      'Hapus Todo',
      'Toggle Status Todo',
      'Filter Todo',
      'Statistik Todo',
      'Profil User',
      'Logout'
    ];
    
    return InputHelper.getChoice('Pilih menu: ', options);
  }

  static showTodos(todos, title = 'DAFTAR TODO') {
    console.log(`\n--- ${title} ---`);
    
    if (todos.length === 0) {
      console.log('Tidak ada todo ditemukan.');
      return;
    }

    todos.forEach((todo, index) => {
      const status = todo.completed ? '✅' : '⏳';
      const priority = this.getPriorityIcon(todo.priority);
      console.log(`${index + 1}. ${status} ${priority} ${todo.title}`);
      if (todo.description) {
        console.log(`   📝 ${todo.description}`);
      }
      console.log(`   📅 ${new Date(todo.createdAt).toLocaleDateString('id-ID')}`);
      console.log('');
    });
  }

  static getPriorityIcon(priority) {
    const icons = {
      'high': '🔴',
      'medium': '🟡',
      'low': '🟢'
    };
    return icons[priority] || '⚪';
  }

  static getNewTodoData() {
    console.log('\n--- TAMBAH TODO BARU ---');
    const title = InputHelper.getString('Judul todo: ');
    const description = InputHelper.getString('Deskripsi (opsional): ', false) || '';
    
    const priorities = ['low', 'medium', 'high'];
    const priorityIndex = InputHelper.getChoice('Priority: ', priorities);
    const priority = priorities[priorityIndex];
    
    return { title, description, priority };
  }

  static selectTodoFromList(todos) {
    if (todos.length === 0) {
      throw new Error('Tidak ada todo untuk dipilih');
    }

    console.log('\nPilih todo:');
    todos.forEach((todo, index) => {
      const status = todo.completed ? '✅' : '⏳';
      const priority = this.getPriorityIcon(todo.priority);
      console.log(`${index + 1}. ${status} ${priority} ${todo.title}`);
    });

    const choice = InputHelper.getChoice('Pilih nomor todo: ', 
      todos.map((_, i) => (i + 1).toString()));
    return todos[choice];
  }

  static getUpdateTodoData(todo) {
    console.log('\n--- EDIT TODO ---');
    console.log(`Todo saat ini: ${todo.title}`);
    console.log('Biarkan kosong jika tidak ingin mengubah');
    
    const title = InputHelper.getString(`Judul baru (${todo.title}): `, false);
    const description = InputHelper.getString(`Deskripsi baru (${todo.description}): `, false);
    
    const priorities = ['low', 'medium', 'high'];
    console.log(`Priority saat ini: ${todo.priority}`);
    console.log('Pilih priority baru (atau 0 untuk tidak mengubah):');
    priorities.forEach((priority, index) => {
      console.log(`${index + 1}. ${priority}`);
    });
    console.log('0. Tidak mengubah');
    
    const priorityInput = InputHelper.getString('Pilihan: ', false);
    let priority = null;
    if (priorityInput && priorityInput !== '0') {
      const priorityIndex = parseInt(priorityInput) - 1;
      if (priorityIndex >= 0 && priorityIndex < priorities.length) {
        priority = priorities[priorityIndex];
      }
    }

    const updates = {};
    if (title) updates.title = title;
    if (description !== null) updates.description = description;
    if (priority) updates.priority = priority;
    
    return updates;
  }

  static showFilterMenu() {
    const filters = [
      'Semua Todo',
      'Todo Selesai',
      'Todo Belum Selesai',
      'Priority High',
      'Priority Medium',
      'Priority Low'
    ];
    
    const filterIndex = InputHelper.getChoice('Filter todo: ', filters);
    const filterMap = ['all', 'completed', 'pending', 'high', 'medium', 'low'];
    return filterMap[filterIndex];
  }

  static showStats(stats) {
    console.log('\n--- STATISTIK TODO ---');
    console.log(`📊 Total Todo: ${stats.total}`);
    console.log(`✅ Selesai: ${stats.completed}`);
    console.log(`⏳ Belum Selesai: ${stats.pending}`);
    console.log(`🔴 High Priority: ${stats.high}`);
    console.log(`🟡 Medium Priority: ${stats.medium}`);
    console.log(`🟢 Low Priority: ${stats.low}`);
    
    if (stats.total > 0) {
      const completionRate = ((stats.completed / stats.total) * 100).toFixed(1);
      console.log(`📈 Tingkat Penyelesaian: ${completionRate}%`);
    }
  }

  static showError(message) {
    console.log(`\n❌ Error: ${message}`);
  }

  static showSuccess(message) {
    console.log(`\n✅ ${message}`);
  }
}