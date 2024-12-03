// a importação de todas as dependências
require('dotenv').config(); // carrega variáveis de ambiente de um arquivo .env
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const db = require('./db/db')


const routes = require('./routes/routes') // importa as rotas
const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'], // lista de origens permitidas
    methods: 'GET,POST,PUT,PATCH,DELETE', // metodos HTTP permitidos
    credentials: true, // Permite o envio de cookies
}
const app = express(); // o app ira receber o express e todas suas dependencias 
// middlewares de segurança e utilidades
app.use(helmet()) // protege a aplicação com headers de segurança
app.use(cors(corsOptions)); // habilita o CORS
app.use(morgan('dev')); // loga as requisiçoes no console
app.use(express.json()); // converte os dados recebidos para JSON
// servindo arquivos estaticos
app.use(express.static(path.join(__dirname,'public'))); // pasta de arquivos estaticos // O path retorna o caminho de forma dinamica 

// rota para servir o home.html como sendo nossa pagina principal
app.get('/', (req, res) =>{ // REQ = requisição RES = resposta
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
})
// confi de rotas
// apos declarar nossas rotas, aqui falamos para noss app usar elas como referencia
app.use('/', routes);

// middleware de tratamento de erros
app.use((err, req, res, next) => { // ERR = erro REQ = requisição RES = resposta NEXT = continue
    console.error(err.stack);
   res.status(500).send('Algo deu errado!') 
});
// inicialização do servidor
// AQUI DENIFIMOS QUEM IRA ESCUTAR NOSSO CHAMADO E NOS RESPONDER
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});