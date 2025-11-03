const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TarefaSchema = new Schema({
  titulo: {
    type: String,
    required: [true, 'O campo "titulo" é obrigatório.'],
  },
  descricao: {
    type: String,
    required: false, // Mesmo não sendo obrigatório, é bom deixar explícito
  },
  concluida: {
    type: Boolean,
    default: false,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

const Tarefa = mongoose.model('Tarefa', TarefaSchema);

module.exports = Tarefa;