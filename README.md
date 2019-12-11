<h1 align="center">
<img src="https://raw.githubusercontent.com/davidfaria/gympoint-backend/master/assets/logo.png">
</h1>
<h3 align="center">
Backend Node.js - GoStack Bootcamp [Rocketseat](https://rocketseat.com.br)
</h3>

<p align = "center">
<img alt = "Última confirmação do Github" src="https://img.shields.io/github/last-commit/davidfaria/gympoint-backend">
<img alt = "Idioma principal do GitHub" src="https://img.shields.io/github/languages/top/davidfaria/gympoint-backend">
<img alt = "GitHub" src = "https://img.shields.io/github/license/davidfaria/gympoint-backend.svg">
</p>

## :gear: Back-end

## Pré requesitos

- Git [Git](https://git-scm.com)
- Node.js [Node.js v10.16](https://nodejs.org/)
- Yarn [Yarn v1.13](https://yarnpkg.com/)
- Postgres [PostgreSQL](https://www.postgresql.org/)
- Redis [Redis](https://redis.io/)
- MongoDB [MongoDB](https://www.mongodb.com/)

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

- Verificando se a aplicação está funcionando

http://localhost:4444

![localhost](https://raw.githubusercontent.com/davidfaria/gympoint-backend/master/assets/localhost.png)

- Testar endpoint com insomnia

### **_Você pode simular as chamadas para api utilizando o app insomnia e importando as rotas da pasta [.GITHUB/INSOMNIA]_**

![Insomnia](https://raw.githubusercontent.com/davidfaria/gympoint-backend/master/assets/insomnia.png)

## Tests (Jest)

```bash
  # run test
    yarn test
```

![Testes](https://raw.githubusercontent.com/davidfaria/gympoint-backend/master/assets/teste.png)
