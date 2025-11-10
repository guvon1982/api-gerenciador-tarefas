const Usuario = require('../models/UsuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

exports.registrar = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const usuarioExistente = await Usuario.findOne({ email }).select('+senha');
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    const novoUsuario = new Usuario({ email, senha });
    await novoUsuario.save();

    const payload = {
      userId: novoUsuario._id,
      email: novoUsuario.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      token,
      usuario: {
        _id: novoUsuario._id,
        email: novoUsuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const usuario = await Usuario.findOne({ email }).select('+senha');

    if (!usuario) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const senhaCorreta = await usuario.compararSenha(senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const payload = {
      userId: usuario._id,
      email: usuario.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token,
      usuario: {
        _id: usuario._id,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};