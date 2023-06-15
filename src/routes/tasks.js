const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/tasks', TaskController.index);
router.get('/tasks/search', TaskController.search)
// router.get('/search', TaskController.search);
router.get('/venta', TaskController.venta);
router.get('/agregar', TaskController.agregar);
router.post('/agregar', TaskController.store);

module.exports = router;

