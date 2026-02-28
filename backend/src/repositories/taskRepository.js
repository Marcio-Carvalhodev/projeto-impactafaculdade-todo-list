const db = require('../config/database');

const taskRepository = {
  findAllByUser(userId) {
    return db
      .prepare('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC')
      .all(userId);
  },

  findByIdAndUser(id, userId) {
    return db
      .prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?')
      .get(id, userId);
  },

  create({ title, description, userId }) {
    const result = db
      .prepare('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)')
      .run(title, description || null, userId);
    return this.findByIdAndUser(result.lastInsertRowid, userId);
  },

  update(id, userId, { title, description, completed }) {
    const current = this.findByIdAndUser(id, userId);
    if (!current) return null;

    db.prepare(`
      UPDATE tasks
      SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).run(
      title ?? current.title,
      description !== undefined ? description : current.description,
      completed !== undefined ? (completed ? 1 : 0) : current.completed,
      id,
      userId,
    );

    return this.findByIdAndUser(id, userId);
  },

  remove(id, userId) {
    const result = db
      .prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?')
      .run(id, userId);
    return result.changes > 0;
  },
};

module.exports = taskRepository;
