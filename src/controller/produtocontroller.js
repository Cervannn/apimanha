const { hash } = require('bcrypt')
const db = require('../db/db')
const Joi = require('joi')

const produtoSchema = Joi.object({
idProduto: Joi.string().length(30).required().max(50),
nomeProduto: Joi.string().required(),
tipo: Joi.string().required().max(30),
descrica: Joi.string().required().max(30),
valorUnit: Joi.string().required(),
imagem: Joi.string().required()
})

//lista dos produtos
exports.listaProdutos = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM PRODUTO')
        res.json(result);

    } catch (err) {
        console.error('Erro ao buscar o produto:', err);
        res.status(500).json({ error: 'Erro interno do servidor'});
    }
}

//Buscar Produtos por ID

exports.listaProdutosID = async (req, res) => {
    const { idProduto } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM produto WHERE idProduto = ?', [idProduto])
        if (result.length === 0) {
            return res.status(404).json({ error: 'Produto não localizado'})  
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar o produto', err);
        res.status(500).json({ error: 'Erro interno no servidor'})
        
    }
}

//Adicionar Produtos

exports.adicionarprodutos = async (req, res) => {
    const { idProduto, nomeProduto, tipo, descricao, valorUnit, imagem } = req.body;

    const { error } = produtoSchema.validade({idProduto, nomeProduto, tipo, descricao, valorUnit, imagem});
    if (error) {
        return res.status(400).json({ error: error.details[0].message})
    }
    try {
        const novoProduto = { idProduto, nomeProduto, tipo, descricao, valorUnit, imagem }
        await db.query('INSERT INTO produto SET ?', novoProduto);

        res.json({ message: 'Produto adicionado com sucesso'})

        
    }
};