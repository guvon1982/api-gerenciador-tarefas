const express = require('express');

const db = require('./config/database');

db.connect();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Olá, Mundo! Esta é a API do Gerenciador de Tarefas.'
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});