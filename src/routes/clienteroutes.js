const express = require('express');
const router = express.Router();
const clienteControler = require('../controller/clientecontroller');

router.get('/clientes', clienteControler.listarClientes);
router.get('/clientes/:cpf', clienteControler.listarClientesCpf);
router.post('/clientes', clienteControler.adicinarCliente);
router.put('/clientes/:cpf', clienteControler.atualizarCliente);
router.delete('/cliente/:cpf', clienteControler.deletarCliente);

module.exports = router;