const taskRepository = require('../repositories/taskRepository');

const taskService = {
  getAll(userId) {
    return taskRepository.findAllByUser(userId);
  },

  create({ title, description, userId }) {
    if (!title || !title.trim()) {
      throw Object.assign(new Error('Título é obrigatório'), { status: 400 });
    }
    return taskRepository.create({
      title: title.trim(),
      description: description?.trim() || null,
      userId,
    });
  },

  update(id, userId, data) {
    if (data.title !== undefined && !data.title.trim()) {
      throw Object.assign(new Error('Título não pode ser vazio'), { status: 400 });
    }

    const task = taskRepository.update(Number(id), userId, {
      ...data,
      title: data.title?.trim(),
    });

    if (!task) {
      throw Object.assign(new Error('Tarefa não encontrada'), { status: 404 });
    }

    return task;
  },

  delete(id, userId) {
    const deleted = taskRepository.remove(Number(id), userId);
    if (!deleted) {
      throw Object.assign(new Error('Tarefa não encontrada'), { status: 404 });
    }
  },
};

module.exports = taskService;
