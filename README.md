# API Gerenciador de Tarefas 📝

API RESTful desenvolvida em Node.js para o gerenciamento de tarefas e usuários. O projeto inclui autenticação JWT, validação de dados, testes automatizados e documentação interativa.

**Projeto da disciplina:** Construção de Backend

**Curso:** Análise e Desenvolvimento de Sistemas (IESB)

**Professor:** José Reginaldo de Sousa Mendes Júnior

**Aluno:** Gustavo Almeida von Sperling de Lima - 2414290052



## 🚀 Tecnologias Utilizadas

- **Node.js** & **Express** — Framework Web
- **MongoDB Atlas** & **Mongoose** — Banco de Dados NoSQL
- **JWT (JsonWebToken)** — Autenticação Segura
- **BcryptJS** — Criptografia de Senhas
- **Express-Validator** — Validação de Entradas
- **Jest** & **Supertest** — Testes Automatizados
- **Swagger UI** — Documentação Interativa



## ⚙️ Pré-requisitos

Antes de rodar o projeto, instale:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) **ou** um servidor MongoDB local



## 🔧 Configuração e Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/guvon1982/api-gerenciador-tarefas
cd api-gerenciador-tarefas
```

### 2. Instale as dependências

`npm install`

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e preencha conforme o exemplo:

### Porta do Servidor

PORT=3000

### String de Conexão do MongoDB Atlas

DATABASE_URL=mongodb+srv://<usuario>:<senha>@cluster...

### Chave Secreta para o Token JWT

JWT_SECRET=sua_chave_secreta_super_segura



## ▶️ Execução

### Rodar o servidor em modo de desenvolvimento:

`npm run dev`

### Servidor disponível em:

**[http://localhost:3000](http://localhost:3000)**



## 🧪 Testes Automatizados

O projeto possui testes para rotas, autenticação e validações.

### Para rodar os testes:

`npm test`

#### Ferramentas utilizadas:

**Jest** e **Supertest**



## 📚 Documentação da API

A documentação completa e interativa dos endpoints está disponível via **Swagger**.

### Como acessar:

1. Inicie o servidor:

`npm run dev`

2. Abra no navegador:

👉 **http://localhost:3000/api-docs**



## 🔗 Endpoints Principais

### 🧍‍♂️ Auth

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/auth/registrar` | Criar nova conta |
| POST | `/auth/login` | Login e gerar Token |



### 📌 Tarefas *(Requer Token Bearer)*

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/tarefas` | Listar minhas tarefas |
| POST | `/tarefas` | Criar tarefa |
| PUT | `/tarefas/:id` | Atualizar tarefa |
| DELETE | `/tarefas/:id` | Remover tarefa |



## 👨‍💻 Autor

**GUvon [Gustavo Almeida von Sperling de Lima]**