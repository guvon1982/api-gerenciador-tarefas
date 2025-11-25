const router = require('express').Router();
const tarefaController = require('../controllers/tarefaController');
const authMiddleware = require('../middlewares/authMiddleware');
const { regrasCriacao, regrasAtualizacao } = require('../validators/tarefaValidator');

/**
 * @swagger
 * tags:
 *   - name: Tarefas
 *     description: Gerenciamento de tarefas (Requer Token)
 */

/**
 * @swagger
 * /tarefas:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Minha Nova Tarefa
 *               descricao:
 *                 type: string
 *                 example: Detalhes da tarefa...
 *               concluida:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, regrasCriacao, tarefaController.createTarefa);

/**
 * @swagger
 * /tarefas:
 *   get:
 *     summary: Lista todas as tarefas do usuário logado
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get('/', authMiddleware, tarefaController.getAllTarefas);

/**
 * @swagger
 * /tarefas/{id}:
 *   get:
 *     summary: Obtém uma tarefa específica pelo ID
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Dados da tarefa
 *       404:
 *         description: Tarefa não encontrada
 */
router.get('/:id', authMiddleware, tarefaController.getTarefaById);

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               concluida:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/:id', authMiddleware, regrasAtualizacao, tarefaController.updateTarefa);

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     summary: Remove uma tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/:id', authMiddleware, tarefaController.deleteTarefa);

module.exports = router;