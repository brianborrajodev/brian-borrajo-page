FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY index.html vite.config.js eslint.config.js ./
COPY public ./public
COPY src/frontend ./src/frontend

EXPOSE 5173

CMD ["npm", "run", "dev"]
