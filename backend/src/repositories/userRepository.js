const db = require('../config/database');

const userRepository = {
  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  findById(id) {
    return db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(id);
  },

  create({ name, email, password }) {
    const result = db
      .prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
      .run(name, email, password);
    return { id: result.lastInsertRowid, name, email };
  },
};

module.exports = userRepository;
