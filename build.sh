#!/bin/bash

# Script de build para Vercel
echo "Building frontend..."

# Instalar dependencias del frontend
cd frontend
npm ci

# Ejecutar el build
npm run build

echo "Frontend build completed!"
