const express=require('express')
const router=express.Router();
const pedidoControleer=require('../controller/pedidocontroller');
 
router.get('/pedido', pedidoControleer.listarpedido);
 
router.get('/pedido/:idpedido', pedidoControleer.listarpedidosid);
 
router.post('/pedido', pedidoControleer.adicionarPedido);
 
router.put('/pedido/idpedido',pedidoControleer.adicionarPedido )
 
router.delete('/pedido/:idpedido', pedidoControleer.deletarpedido)
 
module.exports = router