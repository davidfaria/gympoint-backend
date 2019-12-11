#!/bin/bash


# path views
VIEWS=app/views

# install dependências
npm install

# build projeto sucrase
npm run build

# copy view to build folder
rsync -ahv "./src/$VIEWS/" "./dist/$VIEWS"

# run migrate
npx sequelize db:migrate

# Start Or Reload Api
if [ "$(pm2 id gympoint-api)" = "[]" ]; then
	echo "Start - gympoint-api"
  pm2 start --name "gympoint-api" dist/server.js
else
  echo "Reload - gympoint-api"
  pm2 reload gympoint-api
fi



# Start Or Reload Queue Jobs
if [ "$(pm2 id gympoint-queue)" = "[]" ]; then
	echo "Start - gympoint-queue"
  pm2 start --name "gympoint-queue" dist/queue.js
else
  echo "Reload - gympoint-queue"
  pm2 reload gympoint-queue
fi
