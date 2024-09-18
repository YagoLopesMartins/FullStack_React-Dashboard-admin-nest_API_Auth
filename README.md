# API de Users (Desenvolver um sistema CRUD completo para gerenciamento de usuários,
abrangendo tanto o backend quanto o frontend)

Esta é uma API desenvolvida em NestJs para gerenciar usuarios.
- Desenvolver um sistema CRUD completo para gerenciamento de usuários,
abrangendo tanto o backend quanto o frontend
- Utilizar um framework de front-end (React, Angular ou Vue.js) para
construir a aplicação.
- Desenvolver uma interface de usuário e suas validações.


- O sistema deve ser acessado com autenticação por token (JWT, Oauth2, etc).
- Deve-se implementar o modelo entidade-relacionamento a seguir: 
  - Entidade usuario: 
    - i. Nome - Apenas Letras
    - ii. Email - Apenas e-mails válidos
    - iii.  Matrícula - Apenas Números
    - iv.  Senha - Alfanuméricos de 6 dígitos
    - v.  Habilitar botão de salvar apenas quando todos os campos forem
válidos.
    - vi. Todos os campos são obrigatórios

- Documentação: 
   - a. http://localhost:3000/api (Swagger)
  
- Diferenciais Adicionais: 
   - a. Uso de Docker para executar o projeto apenas com o comando “docker-composer up -d”  

## Configuração do Projeto

### Requisitos

- Docker
- Node >=20
- Npm
- PostgreSQL
- PrismaORM
- Postman ou outro API Client for REST (Ex.: insomnia, Thunder etc)

### Instalação

1. Clone o repositório:

    ```bash
    $ git clone https://github.com/YagoLopesMartins/desafioBackendlientechirede.git
    cd desafioBackendlientechirede
    ```

2. Instale as dependências:
   
   2.1 COM DOCKER
   ```bash
   $ docker-compose up -d 
     ```
     - Obs: Verificar no docker se o container desafiobackendlientechirede foi iniciado, se não fora, inicialize manualmente
     - Obs1: Se erro de mysql então procure por painel de controle de Serviços do Windows (pressionando Win + R
       e digite services.msc e depois ENTER), localize o serviço do MySQL, que esta em Execução e interrompa-o (pare)
     - Obs2: Entrar na url http://localhost:9001/ para acessar banco de dados do container o qual terá o banco 
       - Credenciais:
         - Servidor: mysql_db
         - Usuario: root
         - Senha: root
   - $ docker-compose build
   - $ docker exec container bash -c "npm install"
   - Configure .env (Item 2.2.1 Configure o arquivo .env)
   - Acesse: http://localhost:3000/
   - Acesse: http://localhost:3000/users
   - No insomnia importe os arquivos do diretorio insomnia na raiz do projeto e altere a uri para http://localhost:9000/
   - Primeiro é necessário registrar-se http://localhost:9000/api/register, será gerado um token como o exemplo abaixo
     ```bash
     {
	   "token": "1|rZCc2cpH94fT5mDm1yoG8gcD6cvqqYLpDur5qZhS0995578b"
     }
       ```
   - Depois Efetuar o login passando o token anterior no Auth da requisição e o usuário de registro (e-mail e senha) vai gerar outro token exemplo abaixo
     ```bash
     {
	   "token": "3|bqQyd54ULpg3eFvH7xAf2jVqdvqT4BgU6ORmHalTcd6ab703"
     }
       ```
   - Pronto, agora pode testar os endpoints principais repassando o token gerado

   2.2 SE LOCAL
   
   
  2.2.1 Configure o arquivo `.env`:

    Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário.


A API estará disponível em `http://localhost:3000`.

## Rotas da API

Aqui estão as principais rotas da API:

### usuarios

- **Listar usuarios**
  - `GET /api/usuarios`
  - Retorna uma lista de usuarios com paginação. Obs: 10 por página
  - Query parameters:
    - `search` (opcional): filtro por nome ou descrição.

- **Exibir usuario**
  - `GET /api/usuarios/{id}`
  - Retorna detalhes de um usuario específico.

- **Criar usuario**
  - `POST /api/usuarios`
  - Cria um novo usuario. Requer um JSON com os seguintes campos:
    - `nome`: Nome do usuario (máx. 50 caracteres)
    - `descricao`: Descrição do usuario (máx. 200 caracteres)
    - `preco`: Preço do usuario (valor positivo)
    - `data_validade`: Data de validade (não anterior à data atual)
    - `imagem`: Imagem do usuario (opcional)
    - `categoria_id`: ID da categoria associada

- **Atualizar usuario**
  - `PUT /api/usuarios/{id}`
  - Atualiza um usuario existente. Aceita os mesmos campos que a criação.

- **Deletar usuario**
  - `DELETE /api/usuarios/{id}`
  - Remove um usuario.

## Contribuição

Sinta-se à vontade para contribuir para este projeto enviando pull requests ou relatando problemas.

