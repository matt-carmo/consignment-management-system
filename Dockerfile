# Stage 1: builder
FROM node:22-alpine AS builder
WORKDIR /app

COPY ./be/package*.json ./
RUN npm install

COPY ./be .
RUN npm run build
RUN npx prisma generate

# Stage 2: runner
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 8080
EXPOSE 5555

CMD ["npm", "run", "start"]
