FROM keymetrics/pm2:latest-alpine
RUN mkdir -p /app/tls
WORKDIR /app/tls
COPY ./app/ ./
COPY ./conf/ormconfig.json ./server
WORKDIR /app/tls/server
RUN npm install --production
EXPOSE 3333