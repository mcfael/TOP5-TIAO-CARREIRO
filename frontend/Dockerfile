# Etapa 1: build da aplicação React (Vite)
FROM node:20-alpine AS build
WORKDIR /app

# Copia só o package.json e package-lock.json e instala dependências
COPY src/package*.json ./
RUN npm ci

# Copia o restante do código e gera o build
COPY src/ .
RUN npm run build

# Etapa 2: NGINX para servir os arquivos estáticos
FROM nginx:alpine AS production

# Sua configuração customizada do Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copia o resultado do build direto para o diretório público do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
