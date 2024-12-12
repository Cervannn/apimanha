const db = require('../db/db');
const Joi = require('joi');
const pedidoSchema = Joi.object({
    idpedido: Joi.string().length(30).required().max(50),
    datapedido: Joi.string().required().max(50),
    qtdeItens: Joi.string().required(),
    formaPgto: Joi.string().required(),
    valortotal: Joi.string().required(),
    observacao: Joi.string().required().max(50),
    cpf: Joi.string().length(11).required().max(50),
    idEntregador: Joi.string().length(30).required().max(50)
})
 
exports.listarpedido = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM PEDIDO')
        res.json(result);
    } catch (err) {
        console.error('Error ao buscar pedido', err);
       
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
 
exports.listarpedidosid = async (req, res) => {
    const { idpedido } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM produto WHERE idproduto =?', [idpedido]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'pedido não encontrado' });
        }
        res.json(result[0])
    } catch (err) {
        console.error('Erro ao buscar pedido:', err);
        res.status(500).json({ error: 'Erro ao buscar pedido:' });
 
    }
}
 
exports.adicionarPedido = async (req, res) => {
    const { } = req.body;
 
    const { error } = pedidoSchema.validade({
        idpedido,
        datapedido, qtdeItens, formaPgto, valortotal, observacao, cpf, idEntregador
    });
    if (error) {
        return res.status(400).json({ error: error.details[0] })
    } try {
        const novopedido = { idpedido, datapedido, qtdeItens, formaPgto, valortotal, observacao, cpf, idEntregador };
        await db.query('INSERT INTO pedido SET ?', novopedido);
        res.json({ menssage: 'pedido adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adiconar pedido', err);
        res.status(500).json({ error: 'Erro ao adicionar pedido' })
    }
};
 
exports.atualizarpedido = async (req, res) => {
    const { idpedido } = req.params;
    const { datapedido, qtdeItens, formaPgto, valortotal, observacao, cpf, idEntregador } = req.body;
    const { error } = produtoSchema.validate({ idpedido,datapedido,qtdeItens,formaPgto,valortotal,observacao,cpf,idEntregador});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
 
    }
    try {
        const [result] = await db.query('SELECT * FROM pedido WHERE idpedido=?', [idpedido]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'pedido não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao atualizar pedido', err);
        res.status(500).json({ error: 'Error ao atualizar o pedido' })
    }
};    
 
exports.deletarpedido=async(req,res)=>{
    const{idpedido}=req.params;
    try{
    const[result]=await db.query('SELECT *  FROM pedido WHERE idpedido=?',[idpedido]);
    if (result.length===0) {
        return res.status(404).json({error:'pedido Não encontrado'});
    }
    await db.query('DELETE FROM prouto WHERE idpedido=?',[idpedido])
    res.json({message:'pedido deletado com sucesso'})
   }catch(err){
    console.error('Erro ao deletar pedido',err);
    res.status(500).json({error:'Error ao deletar o cliente'})
   }
   };
 
exports.buscarpedidoCPF =async(req,res)=>{
    const {nomepedido}=req.params;
 
    try{
        const[result]=await db.query('SELECT * FROM pedido WHERE nomepedido LIKE?',[`${nomepedido}%`]);
        if (result.length===0) {
            return res.status(404).json({error:'pedido não encontrado'});
        }
        res.json(result);
    }catch(err){
        console.error('Erro ao buscar pedido',err);
       res.status(500).json({error:'Erro interno do servidor'})
    }
};