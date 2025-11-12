const router = require('express').Router();
const authController = require('../controllers/authController');

const { regrasRegistro, regrasLogin, validar } = require('../validators/authValidator');

router.post('/registrar', regrasRegistro, validar, authController.registrar);

router.post('/login', regrasLogin, validar, authController.login);

module.exports = router;