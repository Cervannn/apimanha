const express = require('express')
const router = express.Router();
const ProdutoControler = require('../controller/produtocontroller');

router.get('/produtos',ProdutoControler.listaProdutos);
router.get('/produtos/:idProduto', ProdutoControler.listaProdutosID);
router.post('/produtos', ProdutoControler.adicionarprodutos);
router.put('/produtos/:idProduto', ProdutoControler.atualizarProduto);
router.delete('/produtos/:idProduto', ProdutoControler.deletarProduto);

module.exports = router;