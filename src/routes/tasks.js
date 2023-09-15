const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/tasks', TaskController.index);
router.get('/tasks/search', TaskController.search);
// router.get('/search', TaskController.search);
router.get('/venta', TaskController.venta);
router.get('/agregar', TaskController.agregar);
router.post('/agregar', TaskController.store);
router.get('/erase/:codigo', TaskController.erase);
router.get('/edit/:id/:modifier/:info', TaskController.edit);
router.get('/nuevaventa/', TaskController.nuevaventa);
router.get('/almacenarventa/:cash/:amount', TaskController.almacenarventa);
router.get('/aumentar/:id/:info', TaskController.aumentar);
router.get('/getidventa/', TaskController.getidventa);
router.get('/almacenarventa_producto/:idproducto/:idventa', TaskController.almacenarventa_producto);

module.exports = router;

