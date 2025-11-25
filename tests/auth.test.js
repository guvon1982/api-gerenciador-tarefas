const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Usuario = require('../src/models/UsuarioModel');

const usuarioTeste = {
  email: 'usuario.teste.jest@email.com',
  senha: '123456'
};

describe('Testes de Integração - Autenticação', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
  });

  afterEach(async () => {
    await Usuario.deleteMany({ email: usuarioTeste.email });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /auth/registrar - Deve registrar um novo usuário com sucesso', async () => {
    const res = await request(app)
      .post('/auth/registrar')
      .send(usuarioTeste);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.usuario.email).toBe(usuarioTeste.email);
  });

  it('POST /auth/registrar - Não deve registrar com email inválido', async () => {
    const res = await request(app)
      .post('/auth/registrar')
      .send({ email: 'email-errado', senha: '123' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erros');
  });

  it('POST /auth/login - Deve fazer login com credenciais válidas', async () => {
    await request(app).post('/auth/registrar').send(usuarioTeste);

    const res = await request(app)
      .post('/auth/login')
      .send(usuarioTeste);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /auth/login - Deve negar login com senha incorreta', async () => {
    await request(app).post('/auth/registrar').send(usuarioTeste);

    const res = await request(app)
      .post('/auth/login')
      .send({ email: usuarioTeste.email, senha: 'senha-errada' });

    expect(res.statusCode).toBe(401);
  });

});