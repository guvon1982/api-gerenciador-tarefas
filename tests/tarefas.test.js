const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Usuario = require('../src/models/UsuarioModel');
const Tarefa = require('../src/models/TarefaModel');

let token;
let userId;

const usuarioTeste = {
  email: 'usuario.tarefas@email.com',
  senha: '123456'
};

describe('Testes de Integração - Rotas de Tarefas (CRUD)', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
    
    await Usuario.deleteMany({ email: usuarioTeste.email });
    await Tarefa.deleteMany({});

    const resRegistro = await request(app).post('/auth/registrar').send(usuarioTeste);
    
    token = resRegistro.body.token;
    userId = resRegistro.body.usuario._id;
  });

  afterAll(async () => {
    await Usuario.deleteMany({ email: usuarioTeste.email });
    await Tarefa.deleteMany({});
    await mongoose.connection.close();
  });

  it('POST /tarefas - Deve criar uma nova tarefa (Com Token)', async () => {
    const res = await request(app)
      .post('/tarefas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Tarefa de Teste Jest',
        descricao: 'Criada automaticamente'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Tarefa de Teste Jest');
    expect(res.body).toHaveProperty('_id');
    expect(res.body.usuario).toBe(userId);
  });

  it('POST /tarefas - Não deve criar tarefa sem título', async () => {
    const res = await request(app)
      .post('/tarefas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        descricao: 'Esqueci do título'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erros');
  });

  it('GET /tarefas - Deve listar as tarefas do usuário', async () => {
    const res = await request(app)
      .get('/tarefas')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('PUT /tarefas/:id - Deve atualizar uma tarefa existente', async () => {
    const tarefaCriada = await Tarefa.create({
      titulo: 'Tarefa para Atualizar',
      usuario: userId
    });

    const res = await request(app)
      .put(`/tarefas/${tarefaCriada._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Tarefa Atualizada com Sucesso',
        concluida: true
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('Tarefa Atualizada com Sucesso');
    expect(res.body.concluida).toBe(true);
  });

  it('DELETE /tarefas/:id - Deve deletar uma tarefa', async () => {
    const tarefaParaDeletar = await Tarefa.create({
      titulo: 'Tarefa para Deletar',
      usuario: userId
    });

    const res = await request(app)
      .delete(`/tarefas/${tarefaParaDeletar._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    
    const buscaNoBanco = await Tarefa.findById(tarefaParaDeletar._id);
    expect(buscaNoBanco).toBeNull();
  });

});