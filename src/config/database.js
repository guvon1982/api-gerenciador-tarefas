require('dotenv').config();

const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

const connect = () => {
  
  if (!DATABASE_URL) {
    console.error('Erro: A string de conexão DATABASE_URL não está definida no .env');
    process.exit(1); 
  }

  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Conectado com sucesso ao MongoDB Atlas!');
  });

  db.on('error', (err) => {
    console.error(`Erro na conexão com o MongoDB: ${err.message}`);
  });
};

module.exports = {
  connect,
};