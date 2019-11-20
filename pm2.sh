#!/bin/bash

#Script para subir a api gympoint
pm2 start --name "gympoint-api" dist/server.js
