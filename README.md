# API RESTful de Usuários (Backend e Frontend)

### Overview

- Sistema **CRUD** completo para gerenciamento de usuários
- Abrange tanto o **Backend** quanto o **Frontend**
- Desenvolvido em **NestJs (NodeJs)** para o backend e **ReactJs** para o frontend.
- O sistema deve ser acessado **(Login)** com autenticação por token (**JWT**, Oauth2, etc).
- O sistema possui sistema de **recuperação de senha** (validação de usuário cadstrado e **envio de e-mail**)
- **Tecnologias**: Typescript, Vite, React, React-form-hooks, Axios, Zod, Tailwindcss, Shadcn/ui, PrismaORM, PostgreSQL, Nestjs, Passport, NodeMailer, JWT token, Swagger

### Objetivo

- Desenvolver um sistema CRUD completo para gerenciamento de usuários,
  abrangendo tanto o backend quanto o frontend

### Frontend

- Utilizar um framework de front-end (**React**, Angular ou Vue.js) para
  construir a aplicação.
- Link da Spec (AdobeXD): https://xd.adobe.com/view/6c0ff585-36dd-4969-9d1f-b7661d820524-395c/screen/8f855f3a-02f9-4976-8dbe-1c0f054f892a/
- Desenvolver uma **interface de usuário** e suas **validações**.
- **Telas:**

  - Apresentação (**HOME**)
  - **Lista de usuários**

    - Pesquisa por nome
    - Paginação

  - **Cadastro de usuários**

    1. **Nome** - _Apenas Letras_
    2. **Email** - _Apenas e-mails válidos_
    3. **Matrícula** - _Apenas Números_
    4. **Senha** - _Alfanuméricos de 6 dígitos_
    5. _Habilitar botão de salvar apenas quando todos os campos forem válidos._
    6. _Todos os campos são obrigatórios_

  - **Edição de Usuário**
  - **Deletar Usuário**
  - Outras telas: **Login, ForgotPassword e ResetPassword**

### Backend

- Desenvolver endpoints para **CRUD** (Create, Read, Update, Delete) de
  usuários.
- Criar uma **API RESTful** utilizando **Nestjs**
- Documentar com **Swagger UI**
  - Para acessar a documentação, após a execução do projeto basta acessar: http://localhost:3000/api

### Banco de Dados

- Configurar um banco de dados relacional (MySQL ou **PostgreSQL**).
- Criar tabelas necessárias para armazenar dados dos usuários.

## Configuração do Projeto

### Requisitos

- Nodejs >= 20
- Npm
- PostgreSQL
- PrismaORM
- Postman ou outro API Client for REST (Ex.: Insomnia, Thunder Client etc)

### Instalação

1. Clone o repositório ou Download ZIP:

   ```bash
   $ git clone https://github.com/YagoLopesMartins/react-dashboard-admin-nest.git
   cd react-dashboard-admin-nest
   ```

2. Instale as dependências:

   - 2.1 LOCAL
     - 2.1.1 Crie seu banco de dados postgresql
        ```bash
         $  sudo -u postgres psql
         $ postgres=# CREATE DATABASE nome_do_banco;
       ```
     - 2.1.2 Configure o arquivo `.env`:
       - Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário por exemplo: DATABASE_URL, JWT_SECRET, USER_EMAIL, USER_EMAIL_PASS

     - 2.2.1 Acesso o diretório backend
       ```bash
         $ cd backend
         $ npm install ou npm i
         $ npx prisma generate
         $ npx prisma migrate dev --name init
         $ npx prisma db seed // Ex.: E-mail: teste@teste.com Senha: teste123 (verifique qual o usuário criado em prisma/seed.ts)
         $ npm run build
         $ npm run start:prod
       ```
       - 2.2.1.1 Acesse o diretorio postman e import os endpoints de testes
       - 2.2.1.2 URI: `http://localhost:3000/`
       - 2.2.1.3 Insira pelo menos um usuário (POST)
    
     - 2.2.3 Acesso o diretório frontend
       ```bash
         $ cd frontend
         $ npm install ou npm i
         $ npm run dev
       ```
       - Acese: http://localhost:5173/login (Entre com E-mail e senha cadastrados item 2.2.1.3)

   - DOCKER
     - $ docker compose build
     - $ docker compose up
     - Configure a conexão do bando por exemplo no DBeaver
     - Acesse: http://localhost:3001/users
     

## Rotas da API

- Aqui estão as principais rotas da API
- A API estará disponível em: `http://localhost:3000`.

### Autenticação

- **Login de usuário**

  - `POST /login`
  - Valida usuário se possui credencial de entrada ao sistema. Requer um JSON com os seguintes campos:
    - `email`: E-mail deve ser válido
    - `password`: Senha (Minimo 6 digitos e alfanúmericos)

### Recuperação de E-mail

- `POST /send-reset-email`
- Requer um JSON com os seguintes campos: (Se usuário existir envia-se e-mail para cadastrar nova senha)

  - `email`: E-mail deve ser válido

- `POST /reset-password/:token_jwt`
- Requer um JSON com os seguintes campos:
  - `newPassword`: Senha (Minimo 6 digitos e alfanúmericos)

### Usuários

- **Listar usuarios**

  - `GET /users`
  - Retorna uma lista de usuarios com paginação. Obs: 10 por página
  - Query parameters:
    - `search` (opcional): filtro por nome.
    - `page` (opcional): Número da página.
    - `limit` (opcional): Quantidade de itens por página.

- **Exibir usuário**

  - `GET /users/{id}`
  - Retorna detalhes de um usuario específico.

- **Criar usuário**

  - `POST /users`
  - Cria um novo usuário. Requer um JSON com os seguintes campos:
    - `name`: Nome do usuário (Apenas letras)
    - `email`: E-mail deve ser válido
    - `registration`: Matricula do usuário (Apenas números)
    - `password`: Senha (Minimo 6 digitos e alfanúmericos)

- **Atualizar usuário**

  - `PUT /users/{id}`
  - Atualiza um usuario existente. Aceita os mesmos campos que a criação.

- **Deletar usuário**
  - `DELETE /users/{id}`
  - Remove um usuario.

## Contribuição

Sinta-se à vontade para contribuir para este projeto enviando pull requests ou relatando problemas. Para demais pedidos e sugestões enviar e-mail para: ylm@icomp.ufam.edu.br
