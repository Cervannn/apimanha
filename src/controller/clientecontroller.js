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

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM CLIENTE')
        res.json(result); // Aqui retornamos apenas os dados da cunsulta

    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });

    }

}

//Buscar um cliente por cpf

exports.listarClientesCpf = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf =?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });

        }
        res.json(result[0]);
    } catch (err) {
        console.error('Eroo ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });

    }
}

//adicinar novo cliente
exports.adicinarCliente = async (req, res) => {
    const { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;
    //validação de dados

    const { error } = clienteSchema.validade({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });

    }
    try {
        const hash = await bcrypt.hash(senha, 10);
        const novoCliente = { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha: hash };
        await db.query('INSERT INTO cliente SET ?', novoCliente);

        res.json({ message: 'Cliente adicionado om sucesso' });

    } catch (err) {
        console.error('Erro ao adicionar clietne:', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente' });

    }
};

//Atualizar um cliente

exports.atualizarCliente = async (req, res) => {
    const { cpf } = req.params
    const { nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        //Criptografando senhas
        const hash = await bcrypt.hash(senha, 10);
        const clienteatualizado = { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha: hash };
        await db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteatualizado, cpf]);
        res.json({ message: 'Cliente atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ error: 'Erro ao atualizar clienete' });
    }
};

//Deletar cliente
exports.deletarCliente = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        await db.query('DELETE FROM cliente WHERE cpf = ?', [cpf]);
        res.json({ message: 'Cliente deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar cliente:', err)
        res.status(500).json({ error: 'Erro ao deletar cliente' })
    }
};