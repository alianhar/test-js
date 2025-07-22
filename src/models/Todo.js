export class Todo {
  constructor(id, userId, title, description = '', completed = false, priority = 'medium', createdAt = new Date()) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.priority = priority; // low, medium, high
    this.createdAt = createdAt;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      description: this.description,
      completed: this.completed,
      priority: this.priority,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(data) {
    return new Todo(
      data.id,
      data.userId,
      data.title,
      data.description,
      data.completed,
      data.priority,
      new Date(data.createdAt)
    );
  }
}