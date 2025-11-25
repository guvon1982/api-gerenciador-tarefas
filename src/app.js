const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const db = require('./config/database');
const tarefaRoutes = require('./routes/tarefaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Olá, Mundo! Esta é a API do Gerenciador de Tarefas.',
    docs: 'Acesse /api-docs para ver a documentação.'
  });
});

app.use('/auth', authRoutes);
app.use('/tarefas', tarefaRoutes);

module.exports = app;