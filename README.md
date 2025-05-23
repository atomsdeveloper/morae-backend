# Morae Backend

Este é o backend do projeto **Morae**, uma plataforma de reservas de imóveis. Este repositório contém as migrações e seeds para o banco de dados, que utiliza **Sequelize ORM** para gerenciar a comunicação com o banco de dados relacional.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript.
- **Sequelize** - ORM (Object-Relational Mapping) para interagir com o banco de dados.
- **PostgreSQL** - Banco de dados relacional.

# 🏠 Morae Database - Documentação das Tabelas

## Estrutura do Banco de Dados

O banco de dados do projeto é composto por várias tabelas inter-relacionadas, cada uma com uma função específica. A seguir, estão os detalhes de cada tabela e seu relacionamento.

### **Tabelas Criadas**

#### 1. **reserves**

- **Descrição:** Armazena informações sobre as reservas de imóveis.
- **Colunas:**
  - `id` (INTEGER, Auto Increment, PK) - Identificador único da reserva.
  - `name` (STRING(100)) - Nome da reserva.
  - `country` (STRING(100)) - País da reserva.
  - `city` (STRING(100)) - Cidade da reserva.
  - `description` (STRING(255)) - Descrição da reserva.
  - `rooms_count` (INTEGER) - Número de quartos disponíveis.
  - `type` (ENUM('casa', 'ap')) - Tipo de moradia da reserva (casa ou apartamento).
  - `price` (DECIMAL) - Preço da reserva.
  - `created_at` (DATE) - Data de criação.
  - `updated_at` (DATE) - Data de atualização.

#### 2. **users**

- **Descrição:** Armazena informações sobre os usuários do sistema.
- **Colunas:**
  - `id` (INTEGER, Auto Increment, PK) - Identificador único do usuário.
  - `name` (STRING(100)) - Nome do usuário.
  - `email` (STRING(100), Unique) - Endereço de e-mail do usuário.
  - `password` (STRING(255)) - Senha criptografada do usuário.
  - `created_at` (DATE) - Data de criação.
  - `updated_at` (DATE) - Data de atualização.

#### 3. **user_reserves**

- **Descrição:** Relacionamento entre os usuários e suas reservas.
- **Colunas:**
  - `id` (INTEGER, Auto Increment, PK) - Identificador único da associação.
  - `user_id` (INTEGER, FK) - Identificador do usuário (referencia a tabela `users`).
  - `reserve_id` (INTEGER, FK) - Identificador da reserva (referencia a tabela `reserves`).
  - `reserve_date` (DATE) - Data da reserva.
  - `created_at` (DATE) - Data de criação.
  - `updated_at` (DATE) - Data de atualização.

## Migrações

As migrações foram criadas para definir a estrutura do banco de dados, conforme descrito acima.

### **1. Migração para Criação da Tabela `reserves`**

Criação da tabela `reserves` com as colunas essenciais para a reserva de imóveis, incluindo a coluna `type`, que é um ENUM que pode ter os valores `casa` ou `ap` (apartamento).

### **2. Migração para Criação da Tabela `users`**

Criação da tabela `users`, que armazena os dados dos usuários do sistema. A tabela contém informações como `name`, `email` (único), e `password`.

### **3. Migração para Criação da Tabela `user_reserves`**

A tabela `user_reserves` foi criada para associar usuários às reservas. Contém chaves estrangeiras para as tabelas `users` e `reserves`, além da coluna `reserve_date` para armazenar a data de cada reserva.

## Seeds

Foram criados seeds para popular o banco de dados com dados iniciais, facilitando o desenvolvimento e os testes do sistema.

### **1. Seed para a Tabela `users`**

Inserção de usuários fictícios na tabela `users`.

### **2. Seed para a Tabela `reserves`**

Inserção de várias reservas fictícias na tabela `reserves`.

### **3. Seed para a Tabela `user_reserves`**

Associação de usuários a reservas através da tabela `user_reserves`, incluindo a data da reserva.

## Como Rodar o Projeto

### **1. Instalar Dependências**

```bash
npm install
```

## 2. Configurar o Banco de Dados

1. Crie um arquivo `.env` na raiz do seu projeto.
2. Adicione as variáveis de ambiente necessárias para a conexão com o banco de dados. Exemplo:

```env
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=senha
DB_NAME=nome_do_banco
DB_DIALECT=postgres
```

## 3. Rodar as Migrações

As migrações são responsáveis por criar e atualizar as tabelas no banco de dados. Para rodar as migrações, execute o seguinte comando:

```bash
npx sequelize-cli db:migrate
```

## 4. Rodar as Seeds

Os seeds são usados para popular o banco de dados com dados iniciais. Para rodar os seeds, execute:

```bash
npx sequelize-cli db:seed:all
```

# 🏠 Morae API — Documentação das Rotas

API RESTful desenvolvida com Node.js, Express, Sequelize e integração com Cloudinary para upload de fotos. A API é protegida por autenticação JWT e controle de permissões por nível de acesso.

---

## 📌 Rotas Disponíveis

### 🏠 Home

- **GET /**
  - Descrição: Rota pública usada como teste de disponibilidade da API.
  - Acesso: Público

---

### 🔐 Autenticação (Token)

- **POST /token**
  - Descrição: Gera um token JWT para autenticação.
  - Body:
    ```json
    {
      "email": "seuemail@email.com",
      "password": "suasenha"
    }
    ```
  - Acesso: Público

---

### 👤 Usuários (`/users`)

> Todas as rotas a seguir requerem `loginRequired` e, para algumas, `adminRequired`.

| Método | Rota                | Descrição                    | Middleware                       |
| ------ | ------------------- | ---------------------------- | -------------------------------- |
| GET    | `/users`            | Lista todos os usuários      | `loginRequired`, `adminRequired` |
| GET    | `/users/:id`        | Mostra um usuário específico | `loginRequired`, `adminRequired` |
| POST   | `/users/create`     | Cria um novo usuário         | `loginRequired`, `adminRequired` |
| PUT    | `/users/:id/edit`   | Atualiza dados de um usuário | `loginRequired`                  |
| DELETE | `/users/:id/delete` | Deleta um usuário            | `loginRequired`                  |

---

### 🏡 Reservas (`/reserves`)

> Rotas para criação, listagem e manutenção de reservas. Algumas requerem nível de admin.

| Método | Rota                   | Descrição                      | Middleware                       |
| ------ | ---------------------- | ------------------------------ | -------------------------------- |
| GET    | `/reserves`            | Lista todas as reservas        | `loginRequired`                  |
| GET    | `/reserves/:id`        | Detalha uma reserva específica | `loginRequired`                  |
| POST   | `/reserves/create`     | Cria uma nova reserva          | `loginRequired`, `adminRequired` |
| PUT    | `/reserves/:id/edit`   | Edita uma reserva existente    | `loginRequired`, `adminRequired` |
| DELETE | `/reserves/:id/delete` | Remove uma reserva             | `loginRequired`, `adminRequired` |

---

### 📸 Upload de Fotos (`/photo`)

- **POST /photo**
  - Descrição: Envia uma foto associada a um usuário ou reserva.
  - Requisitos:
    - A foto deve ser enviada com `Content-Type: multipart/form-data`.
    - O campo da imagem no `form-data` deve se chamar `file`.
    - O corpo da requisição deve conter o `id` do `User` ou `Reserve`.
    - Caso o `id` pertença ao próprio usuário autenticado, a foto será associada a ele.
    - Se for uma reserva, apenas administradores podem realizar o upload.
  - Middleware: `loginRequired`

---

## 🔒 Middlewares

### `loginRequired`

- Garante que o usuário esteja autenticado via JWT.
- O token deve ser passado no cabeçalho:
  ```
  Authorization: Bearer SEU_TOKEN
  ```

### `adminRequired`

- Verifica se o usuário autenticado tem papel `"admin"` antes de prosseguir com a rota.
- Utilizado para proteger ações críticas (criação e edição de reservas/usuários).

---

## 🗃️ Relacionamentos de Banco de Dados

- **User**

  - Tem muitas `Reserves` através de `UserReserve`
  - Tem muitas `Photos`

- **Reserve**

  - Tem muitos `Users` através de `UserReserve`
  - Tem muitas `Photos`

- **Photo**
  - Pode pertencer a `User` ou `Reserve` (dependendo do `id` enviado na requisição)

---

## 🧪 Testando Upload de Foto (Exemplo com Insomnia/Postman)

- Método: `POST`
- URL: `http://localhost:PORT/photo`
- Headers:
  ```
  Authorization: Bearer SEU_TOKEN
  Content-Type: multipart/form-data
  ```
- Body:
  - Tipo: `form-data`
  - Campos:
    - `file`: (selecionar imagem)
    - `id`: (id do usuário logado ou id da reserva)

---

## ✅ Exemplo de resposta com sucesso

```json
{
  "success": true,
  "message": "Rota acessada com sucesso.",
  "file": {
    "id": 1,
    "filename": "https://res.cloudinary.com/...",
    "originalname": "minha_foto.png"
  }
}
```

---

## 🧠 Observação Importante

- Fotos dos usuários são listadas em `GET /users`
- Fotos associadas às reservas **não** vêm por padrão. Para isso, relacione o modelo `Photo` dentro de `Reserves`:

```js
include: [
  {
    model: Reserves,
    as: "reserves",
    include: [
      {
        model: Photo,
        as: "photos",
        attributes: ["id", "filename", "originalname"],
      },
    ],
  },
  {
    model: Photo,
    as: "photos",
    attributes: ["id", "filename", "originalname"],
  },
];
```

---

## 🛠️ Contribuição

Pull requests são bem-vindos! Para mudanças maiores, abra uma issue para discutirmos o que você gostaria de mudar.

---

## 📄 Licença

Este projeto está sob a licença MIT.
