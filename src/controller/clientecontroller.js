const db = require('../db/db')
const Joi = require('joi')
const bcrypt = require('bcrypt')

const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    nome: Joi.string().required().max(50),
    endereco: Joi.string().required().max(80),
    bairro: Joi.string().required().max(30),
    cidade: Joi.string().required().max(30),
    cep: Joi.string().required(),
    telefone: Joi.string().required(),
    email: Joi.string().required().max(50),
    senha: Joi.string().required().max(300)
})

exports.listarClientes = async (req, res) => {
    try{
        const [result] = await db.query('SELECT * FROM cliente')
        res.json(result)
    } catch (err) {
        console.error('Erro ao bucar clientes:', err)
        res.status(500).json({error: 'erro interino do servidor'})
    }
}
exports.listarClientespf = async (req, res) =>{
    const { cpf } = req.paramas
    try{
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf])
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado'})
        }
        res.json(result[0])
    } catch (err) {
        console.error('Erro ao buscar cliente:', err)
        res.status(500).json({ error: 'Erro interno do servidor'})
    }
}

exports.adicionarCliente = async (req, res) => {
    const { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha} = req.body
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha})
    if (error){
        return res.status(400).json({ error: error.details[0].message})
    }
}
exports.adicionarCliente = async (req, res) => {
}
try {
    const hash = await bcrypt.hash(senha, 10)
    const novoCliente = {cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha: hash}
    await db.query('INSERT INTO cliente SET ?', novoCliente)

    res.json({ message: 'Cliente adicionado com sucesso'})
} catch (err) {
    console.error('Erro ao adicionar cliente:', err)
    res.status(500).json({error: 'Erro ao adicionar cliente'})
}
