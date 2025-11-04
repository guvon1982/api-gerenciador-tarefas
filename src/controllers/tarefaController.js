const Tarefa = require('../models/TarefaModel');


exports.createTarefa = async (req, res) => {
  try {
    const { titulo, descricao, concluida } = req.body;

    const novaTarefa = new Tarefa({
      titulo: titulo,
      descricao: descricao,
      concluida: concluida,
    });

    const tarefaSalva = await novaTarefa.save();

    res.status(201).json(tarefaSalva);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });
  }
};

exports.getAllTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error: error.message });
  }
};

exports.getTarefaById = async (req, res) => {
  try {
    const { id } = req.params;

    const tarefa = await Tarefa.findById(id);

    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json(tarefa);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefa', error: error.message });
  }
};

exports.updateTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, concluida } = req.body;

    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(
      id,
      { titulo, descricao, concluida },
      { new: true, runValidators: true }
    );

    if (!tarefaAtualizada) {
      return res.status(404).json({ message: 'Tarefa não encontrada para atualizar' });
    }

    res.status(200).json(tarefaAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error: error.message });
  }
};

exports.deleteTarefa = async (req, res) => {
  try {
    const { id } = req.params;

    const tarefaDeletada = await Tarefa.findByIdAndDelete(id);

    if (!tarefaDeletada) {
      return res.status(404).json({ message: 'Tarefa não encontrada para deletar' });
    }

    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message });
  }
};