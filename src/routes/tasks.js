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
router.get('/almacenarventa/:cash/:amount/:date', TaskController.almacenarventa);
router.get('/aumentar/:id/:info', TaskController.aumentar);
router.get('/getidventa/', TaskController.getidventa);
router.get('/almacenarventa_producto/:idproducto/:idventa', TaskController.almacenarventa_producto);
router.get('/editpreciopercode/:codigo/:precio', TaskController.editpreciopercode);
router.get('/editstockpercode/:codigo/:stock', TaskController.editstockpercode);
router.get('/verventas', TaskController.verventas);
router.get('/searchVentas/:table', TaskController.searchVentas);
router.get('/filterbyday/:from/:to', TaskController.filterbyday)

module.exports = router;

