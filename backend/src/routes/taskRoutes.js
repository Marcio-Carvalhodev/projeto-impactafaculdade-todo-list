const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(auth);

router.get('/', taskController.getAll);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;
