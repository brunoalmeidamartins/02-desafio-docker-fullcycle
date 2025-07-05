FROM node:18-alpine

RUN apk add --no-cache wget

WORKDIR /app/src

COPY src/package*.json ./
RUN npm install

COPY src ./

EXPOSE 3000
CMD ["node", "index.js"]
