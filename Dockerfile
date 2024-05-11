# Usar una imagen base de Node.js
FROM node:18 as build

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Compilar la aplicación Angular en modo producción
RUN npm run build --configuration=production

# Etapa de producción
FROM nginx:1-alpine-slim

# Copiar los archivos de la etapa de construcción al directorio de trabajo de Nginx
COPY --from=build /app/dist/* /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para la aplicación web
EXPOSE 443

# Comando para ejecutar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
