export class User {
  constructor(id, username, email, password, createdAt = new Date()) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(data) {
    return new User(
      data.id,
      data.username,
      data.email,
      data.password,
      new Date(data.createdAt)
    );
  }
}