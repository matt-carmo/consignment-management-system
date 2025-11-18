# Stage 1: builder
FROM node:22-alpine AS builder
WORKDIR /app
COPY ./be/package*.json ./
RUN npm install
COPY ./be .
RUN npm run build

# Stage 2: runner