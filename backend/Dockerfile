FROM node:20-alpine

WORKDIR /app

# Instala dependências do sistema
RUN apk add --no-cache openssl

# Copia os arquivos de configuração
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Gera o cliente do Prisma
RUN npx prisma generate

# Inicia a aplicação
CMD ["npm", "run", "dev"]