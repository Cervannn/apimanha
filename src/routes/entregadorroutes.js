const express = require('express')
const router = express.Router();
const EntregadorController = require('../controller/entregadorcontroller');

router.get('/entregador', EntregadorController.listaEntregador);
router.get('/entregador/:idEntregador', EntregadorController.listaEntregadorID);
router.post('/entregador', EntregadorController.adicionarEntregador);
router.put('/entregador/:idEntregador', EntregadorController.atualizarEntregador);
router.delete('/entregador/:idEntregador', EntregadorController.deletarEntregador);

module.exports = router;