const { check, body, validationResult } = require('express-validator');

const { validar } = require('./authValidator');

exports.regrasCriacao = [
  check('titulo')
    .notEmpty().withMessage('O título é obrigatório.')
    .isString().withMessage('O título deve ser um texto.')
    .trim()
    .escape(),

  check('descricao')
    .optional()
    .isString().withMessage('A descrição deve ser um texto.')
    .trim()
    .escape(),

  check('concluida')
    .optional()
    .isBoolean().withMessage('O campo "concluida" deve ser um valor booleano (true ou false).'),

  validar, 
];

exports.regrasAtualizacao = [
  check('titulo')
    .optional()
    .notEmpty().withMessage('O título não pode ser enviado como vazio.')
    .isString().withMessage('O título deve ser um texto.')
    .trim()
    .escape(),
  
  check('descricao')
    .optional()
    .isString().withMessage('A descrição deve ser um texto.')
    .trim()
    .escape(),
  
  check('concluida')
    .optional()
    .isBoolean().withMessage('O campo "concluida" deve ser um valor booleano (true ou false).'),
  
  body().custom((value, { req }) => {
    if (Object.keys(req.body).length === 0) {
      throw new Error('Pelo menos um campo deve ser fornecido para atualização (titulo, descricao ou concluida).');
    }
    return true;
  }),

  validar,
];