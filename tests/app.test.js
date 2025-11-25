const request = require('supertest');
const app = require('../src/app');

describe('Testes de Integração - Configuração Inicial', () => {

  it('GET / - Deve retornar a mensagem de boas-vindas com status 200', async () => {
    
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    
    expect(response.body).toHaveProperty('message');
    
    expect(response.body.message).toBe('Olá, Mundo! Esta é a API do Gerenciador de Tarefas.');
  });

});