FROM node:20-alpine

WORKDIR /app

# Copia package.json primeiro (pra aproveitar cache)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o resto do código
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Expõe a porta
EXPOSE 5000

# Comando final: espera o banco e sobe o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]