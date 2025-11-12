const { check, validationResult } = require('express-validator');

exports.regrasRegistro = [
  check('email')
    .notEmpty().withMessage('O email é obrigatório.')
    .isEmail().withMessage('Por favor, insira um email válido.')
    .normalizeEmail(),

  check('senha')
    .notEmpty().withMessage('A senha é obrigatória.')
    .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
];

exports.regrasLogin = [
  check('email')
    .notEmpty().withMessage('O email é obrigatório.')
    .isEmail().withMessage('Por favor, insira um email válido.')
    .normalizeEmail(),

  check('senha')
    .notEmpty().withMessage('A senha é obrigatória.'),
];

exports.validar = (req, res, next) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  next();
};