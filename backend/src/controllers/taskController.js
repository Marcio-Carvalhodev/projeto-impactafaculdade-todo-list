const taskService = require('../services/taskService');

const taskController = {
  getAll(req, res, next) {
    try {
      const tasks = taskService.getAll(req.user.id);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },

  create(req, res, next) {
    try {
      const task = taskService.create({ ...req.body, userId: req.user.id });
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  update(req, res, next) {
    try {
      const task = taskService.update(req.params.id, req.user.id, req.body);
      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  delete(req, res, next) {
    try {
      taskService.delete(req.params.id, req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = taskController;
