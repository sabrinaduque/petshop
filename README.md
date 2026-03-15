# 🐾 Petshop Management System

Sistema web para gerenciamento de pets desenvolvido como projeto de **TCC**.

O sistema permite cadastrar, visualizar, editar e remover pets, além de realizar busca e paginação dos registros.

---

# 📌 Funcionalidades

* Cadastro de pets
* Listagem de pets
* Visualização de detalhes
* Edição de informações
* Remoção de pets
* Busca (search)
* Paginação na listagem
* Interface administrativa

---

# ⚙ Tecnologias Utilizadas

## Backend

* Node.js
* Express
* PostgreSQL

## Frontend

* Next.js
* TypeScript
* Material UI
* Styled Components

---

# 🗄 Banco de Dados

Tabela principal utilizada no sistema:

```
pets
```

Campos:

| Campo         | Tipo      |
| ------------- | --------- |
| id            | serial    |
| nome          | varchar   |
| especie       | varchar   |
| raca          | varchar   |
| idade         | integer   |
| peso          | numeric   |
| nome_dono     | varchar   |
| telefone_dono | varchar   |
| status        | varchar   |
| created_at    | timestamp |

---

# 🚀 Como rodar o projeto

## 1️⃣ Clonar o repositório

```
git clone https://github.com/seu-usuario/petshop-tcc.git
```

---

## 2️⃣ Rodar o Backend

Entrar na pasta:

```
cd backend
```

Instalar dependências:

```
npm install
```

Rodar o servidor:

```
node src/server.js
```

Servidor disponível em:

```
http://localhost:3000
```

---

## 3️⃣ Rodar o Frontend

Entrar na pasta:

```
cd frontend
```

Instalar dependências:

```
npm install
```

Rodar aplicação:

```
npm run dev
```

Aplicação disponível em:

```
http://localhost:3000
```

---

# 📡 Rotas da API

| Método | Rota      | Descrição         |
| ------ | --------- | ----------------- |
| GET    | /pets     | Listar pets       |
| GET    | /pets/:id | Buscar pet por id |
| POST   | /pets     | Criar pet         |
| PUT    | /pets/:id | Atualizar pet     |
| DELETE | /pets/:id | Remover pet       |

---

# 📊 Funcionalidades da API

A API possui suporte a:

* paginação
* busca de pets
* operações CRUD completas

---

# 👨‍💻 Autor

Projeto desenvolvido para Trabalho de Conclusão de Curso.

Autor: Sabrina Nasser

---
