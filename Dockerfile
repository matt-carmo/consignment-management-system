FROM node:22-alpine
WORKDIR /app
COPY ./be/package*.json ./
RUN npm install
COPY ./be .
EXPOSE 8080
CMD ["npm", "start"]