const taskService = require('../services/taskService');

const taskController = {
  async getAll(req, res, next) {
    try {
      const tasks = await taskService.getAll(req.user.id);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const task = await taskService.create({ ...req.body, userId: req.user.id });
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const task = await taskService.update(req.params.id, req.user.id, req.body);
      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await taskService.delete(req.params.id, req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = taskController;
