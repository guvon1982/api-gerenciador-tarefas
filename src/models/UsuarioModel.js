const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  email: {
    type: String,
    required: [true, 'O campo "email" é obrigatório.'],
    unique: true,
    match: [/.+\@.+\..+/, 'Por favor, insira um email válido.'],
  },
  
  senha: {
    type: String,
    required: [true, 'O campo "senha" é obrigatório.'],
    select: false, 
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});


UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UsuarioSchema.methods.compararSenha = async function (senhaFornecida) {
  return await bcrypt.compare(senhaFornecida, this.senha);
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;