# Api Gympoint

## Backend NodeJS desenvolvido no treinamento GoStack Bootcamp [Rocketseat](https://rocketseat.com.br)

<h1 align="center">
<img src="https://raw.githubusercontent.com/davidfaria/gympoint-backend/master/assets/logo.png">
</h1>

## Como utilizar

- Download / Clone o repositório:

  ```
  git clone https://github.com/davidfaria/gympoint-backend.git
  ```

- Instalando as dependências do package.json:

  ```
  yarn install
  ```

- Configurar as variáveis de ambiente

  ```
  cp .env.example .env
  ```

- Inicialize os banco de dados (postgres e mongodb) com docker:

  **_Dependência (docker e docker-compose): você pode instalar no linux (ubuntu/linux_mint)_**

  ```
  sudo apt install docker docker-compose
  ```

  ```
  docker-compose up -d
  ```

- Rode as Migrations e Seeds para criar e popular o banco de dados

  ```
    yarn sequelize db:migrate
    yarn sequelize db:seed:all
  ```

* Inicialize a api

  ```
  yarn dev
  ```

* Teste utilizando o browser.

  **_Obs. Usei a porta: 4444 no meu arquivo .env_**

  http://localhost:4444

![localhost](https://raw.githubusercontent.com/davidfaria/gympoint-backend/master/assets/localhost.png)

- Testar endpoint com insomnia

  ### **_Você pode simular as chamadas para api utilizando o app insomnia e importando as rotas da pasta [INSOMNIA]_**

![Insomnia](https://raw.githubusercontent.com/davidfaria/gympoint-backend/master/assets/insomnia.png)

## Bônus

- Iniciando Testes com Jest

  ```
    yarn test
  ```

![Testes](https://raw.githubusercontent.com/davidfaria/gympoint-backend/master/assets/teste.png)
