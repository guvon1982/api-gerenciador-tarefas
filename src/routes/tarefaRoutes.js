const router = require('express').Router();

const tarefaController = require('../controllers/tarefaController');

const authMiddleware = require('../middlewares/authMiddleware');

const { regrasCriacao, regrasAtualizacao } = require('../validators/tarefaValidator');


router.post('/', authMiddleware, regrasCriacao, tarefaController.createTarefa);
router.get('/', authMiddleware, tarefaController.getAllTarefas);
router.get('/:id', authMiddleware, tarefaController.getTarefaById);
router.put('/:id', authMiddleware, regrasAtualizacao, tarefaController.updateTarefa);
router.delete('/:id', authMiddleware, tarefaController.deleteTarefa);

module.exports = router;