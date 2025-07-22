import path from 'path';

export const config = {
  dataDirectory: path.join(process.cwd(), 'src', 'data'),
  files: {
    users: 'users.json',
    todos: 'todos.json'
  },
  security: {
    passwordMinLength: 6,
    usernameMinLength: 3,
    usernameMaxLength: 20
  },
  app: {
    name: 'Todo List App',
    version: '1.0.0'
  }
};