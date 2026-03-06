const pool = require('../config/database');

const taskRepository = {
  async findAllByUser(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId],
    );
    return rows;
  },

  async findByIdAndUser(id, userId) {
    const { rows } = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, userId],
    );
    return rows[0] || null;
  },

  async create({ title, description, userId }) {
    const { rows } = await pool.query(
      'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description || null, userId],
    );
    return rows[0];
  },

  async update(id, userId, { title, description, completed }) {
    const current = await this.findByIdAndUser(id, userId);
    if (!current) return null;

    const { rows } = await pool.query(`
      UPDATE tasks
      SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4 AND user_id = $5
      RETURNING *
    `, [
      title ?? current.title,
      description !== undefined ? description : current.description,
      completed !== undefined ? completed : current.completed,
      id,
      userId,
    ]);

    return rows[0];
  },

  async remove(id, userId) {
    const { rowCount } = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
      [id, userId],
    );
    return rowCount > 0;
  },
};

module.exports = taskRepository;
