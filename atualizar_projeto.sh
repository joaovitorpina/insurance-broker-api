#!/bin/sh
cd /home/seguralta/Projetos/api-chatbot || exit
temAtualizacoes=$(git pull)

if [ "$temAtualizacoes" != "Already up-to-date." ]; then
  forever stopall
  npm run build
  cp ormconfig.prod.json ormconfig.json
  NODE_ENV=production forever start dist/server.js
fi