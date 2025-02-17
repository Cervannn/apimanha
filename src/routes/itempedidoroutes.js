const express = require('express');
const router = express.Router();
const itemPedidoController = require('../controller/itemcontroller');

router.get('/item', itemPedidoController.listarItemPedido );
router.get('/item/:idItem', itemPedidoController.listarItemID );
router.post('/item', itemPedidoController.adicionarItemPedido );
router.put('/item/:idItem', itemPedidoController.atualizarItemPedido );
router.delete('/item/:idItem', itemPedidoController.deletarItemPedido);

module.exports = router;