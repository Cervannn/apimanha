const express = require('express')
const router = express.Router();

// exemplo de uma rota GET
router.get('/usuario', (req, res) => {
    res.send('Rota do Cervan')
})
// exporte o roteador para que ele possa ser usado  no index.js
module.exports = router;