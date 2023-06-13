![Logo de l'application 80s-90s Flicks](/frontend/src/assets/flix-logo-on-black.png)

# Contexte

Cette application est un projet personnel développé en 2023.

# Résumé

**80s-90s Flicks** est une application de recherche de films des années 80 et 90, avec un module de filtrage des recherches et un tableau de bord permettant d'enregistrer des favoris, des films vus et des films à voir.

# Technologies utilisées (MERN)

-   MongoDB Atlas
-   JavaScript ES6
-   Node.js
-   Mongoose
-   Express
-   Bcrypt
-   JWT
-   React
-   React Router 6
-   Redux
-   Redux Toolkit
-   PropTypes
-   Material UI

# Fonctionnalités

-   donnés cinéma issues d'une API externe (The Movie Database), avec plus de 35 000 films répertoriés pour la période 80s-90s :

![page d'accueil](/frontend/src/assets/img/captures/flix-home.webp)

-   une fiche détaillée par film :

![page film](/frontend/src/assets/img/captures/flix-movie.webp)

-   module de recherche par titre :

![recherche](/frontend/src/assets/img/captures/flix-search.webp)

-   filtrage par date et genre :

![filtres](/frontend/src/assets/img/captures/flix-filters.webp)

-   fiches individuelles avec filmographie complète pour les réalisateurs, scénaristes et acteurs :

![fiche individuelle](/frontend/src/assets/img/captures/flix-person.webp)

-   tableau de bord avec films favoris, films vus et films à voir :

![taleau de bord](/frontend/src/assets/img/captures/flix-dashboard.webp)

# Fonctionnalités à venir

-   choix de langue pour l'application (français ou anglais)
-   choix du thème (clair / sombre)
-   module de recherche de personnes
-   ajout des bandes-annonces
-   ajout des producteurs
-   possibilité d'ajouter une photo de profil
-   création de listes par l'utilisateur

# Installation

## Back-end

-   Créer une base de données sur [MongoDB Atlas](https://www.mongodb.com/atlas/database), avec une collection intitulée "AppCine_80s-90s" et un utilisateur autorisé à manipuler cette collection.

-   Dans l'interface de MongoDB, cliquer sur le bouton "Connect", choisir "Connect to your application" et noter le "connection string", dans lequel figure le cluster de la base de données (nécessaire pour l'étape suivante).

-   Dans le répertoire `backend`, créer un fichier `.env` contenant les instructions suivantes (ne pas conserver les balises `<>`):

```
MONGO_DBNAME=AppCine_80s-90s
MONGO_USERNAME=<nom de l'utilisateur de la collection>
MONGO_PASSWORD=<mot de passe de cet utilisateur>
MONGO_CLUSTER=<cluster de la base de données (exemple : cluster0.lhpmlqm)>

TOKEN_SECRET_PHRASE=<choisir une phrase complexe>
```

-   Toujours dans le répertoire `backend`, exécuter la commande :

`npm install`

## Front-end

-   Dans le répertoire `frontend`, exécuter la commande :

`npm install`

# Lancement de l'application

-   Dans le répertoire `backend`, exécuter la commande :

`node server`

-   Dans le répertoire `frontend`, exécuter la commande :

`npm start`
