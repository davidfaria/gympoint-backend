<h1 align="center">
<img src="https://raw.githubusercontent.com/davidfaria/gympoint-backend/master/.github/logo.png">
</h1>
<h3 align="center">
Back-end Node.js - GoStack Bootcamp [Rocketseat](https://rocketseat.com.br)
</h3>

<p align = "center">
<img alt = "Última confirmação do Github" src="https://img.shields.io/github/last-commit/davidfaria/gympoint-backend">
<img alt = "Idioma principal do GitHub" src="https://img.shields.io/github/languages/top/davidfaria/gympoint-backend">
<img alt = "GitHub" src = "https://img.shields.io/github/license/davidfaria/gympoint-backend.svg">
</p>

## :gear: Back-end

## Pré requisitos

- Git [Git](https://git-scm.com)
- Node.js [Node.js v10.16](https://nodejs.org/)
- Yarn [Yarn v1.13](https://yarnpkg.com/)
- Postgres [PostgreSQL](https://www.postgresql.org/)
- Redis [Redis](https://redis.io/)
- MongoDB [MongoDB](https://www.mongodb.com/)
- Docker [Docker](https://www.docker.com/)
- Docker Compose [Docker Compose](https://docs.docker.com/compose/)

## Instruções Back-end

```bash
# clonar o repositório
git clone https://github.com/davidfaria/gympoint-backend.git

# entrar na pasta do projeto
cd gympoint-backend

# instalar as dependências
yarn install

# criar .env para informar as SUAS variáveis de ambiente
cp .env.example .env

# subir os serviços (postgres, redis, mongodb)
# Obs. foi utilizado docker para subir as bases (postgres, redis e mongodb)
docker-compose up -d

# criar estrutura do banco de dados Postgres
yarn sequelize db:migrate

# povoar o banco de dados
yarn sequelize db:seed:all

# iniciar o servidor da aplicação
yarn dev

# iniciar a fila de jobs  (outro terminal)
yarn queue

```

---

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
