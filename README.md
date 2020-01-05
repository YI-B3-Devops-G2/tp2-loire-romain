# B3 Devops - TP 2
## Info
mail: romain.loire@ynov.com
github _username: romL69

## Objectifs du tp

L'objectif du TP est d'utiliser une api en nodeJS associée à un reverse proxy nginx afin d'obtenir des informations provenant de bases de données redis et postgres.

## Prérequis

Docker & Docker Compose (activer les shared drive dans les settings de docker)


## Installation

Cloner le dépot : `git clone https://github.com/YI-B3-Devops/tp2-loire-romain.git`

Aller a la racine du dépôt et lancer la commande: `docker-compose -f ./docker-compose.dev.yaml up --build --force-recreate`

## Utilisation

`localhost:3000` Page d'acceuil Nginx

`localhost:3000/api` Page  'hello world' de l'API 

`localhost:3000/api/status` Page l'API qui récupere le uptime de postgres et le nombre de clients connectés sur redis
