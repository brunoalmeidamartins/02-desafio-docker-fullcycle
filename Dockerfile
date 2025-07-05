FROM node:18-alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

WORKDIR /app/src

# Só copia package.json para instalar deps antes de copiar todo o código
COPY src/package*.json ./
RUN npm install

# Copia o restante do código
COPY src ./

EXPOSE 3000
CMD ["node", "index.js"]
