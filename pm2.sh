#!/bin/bash


# Run queue
pm2 start --name "gympoint-queue" dist/queue.js

# Script para subir a api gympoint
pm2 start --name "gympoint-api" dist/server.js


