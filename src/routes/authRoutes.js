const router = require('express').Router();
const authController = require('../controllers/authController');
const { regrasRegistro, regrasLogin, validar } = require('../validators/authValidator');

/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Gerenciamento de usuários (Registro e Login)
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: teste@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/registrar', regrasRegistro, validar, authController.registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna um Token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: teste@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', regrasLogin, validar, authController.login);

module.exports = router;
