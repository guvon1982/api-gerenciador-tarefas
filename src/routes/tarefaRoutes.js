const router = require('express').Router();

const tarefaController = require('../controllers/tarefaController');


router.post('/', tarefaController.createTarefa);


router.get('/', tarefaController.getAllTarefas);


router.get('/:id', tarefaController.getTarefaById);


router.put('/:id', tarefaController.updateTarefa);


router.delete('/:id', tarefaController.deleteTarefa);


module.exports = router;