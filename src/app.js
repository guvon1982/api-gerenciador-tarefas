const express = require('express');
const db = require('./config/database');
const tarefaRoutes = require('./routes/tarefaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Olá, Mundo! Esta é a API do Gerenciador de Tarefas.'
  });
});

app.use('/auth', authRoutes);
app.use('/tarefas', tarefaRoutes);

module.exports = app;