# BACKEND
FROM node:16.13.1 AS server-build
WORKDIR /usr/app
COPY src/api/ ./api
RUN cd api && npm install

EXPOSE 8080

CMD ["node", "./api/server.js"]
