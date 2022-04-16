# BACKEND
FROM node:16.13.1 AS server-build
WORKDIR /usr/app
COPY src/api/ ./api
RUN cd api && npm install

EXPOSE 8080

CMD ["node", "./api/server.js"]

## FRONTEND
#FROM node:16.13.1
## installe un simple serveur http pour servir un contenu statique
#RUN npm install -g http-server
#
## définit le dossier 'app' comme dossier de travail
#WORKDIR /usr/front
#
## copie 'package.json' et 'package-lock.json' (si disponible)
#COPY package*.json ./
#
## installe les dépendances du projet
#RUN npm install
#
## copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
#COPY ./src ./src
#COPY ./public ./public
#COPY ./babel.config.js ./
#
## construit l'app pour la production en la minifiant
#RUN npm run build
#
#EXPOSE 8081
#CMD [ "http-server", "dist" ]
