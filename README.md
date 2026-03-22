Démo ici : 
https://youtube.com/shorts/zr5aU35Uh08?feature=share

Précisions : 
Dans le main se situe le body de l'application, dans la branche authentification le body + la page de connexion et création de compte. 
Merci ! 

## API SOC - Cartes d'alertes

Backend Node/Express pour une appli mobile (Expo/React Native) permettant de s'entraîner à la réponse à incidents à partir de cartes stockées dans MongoDB.

### Stack

- Node.js / Express
- MongoDB + Mongoose
- CORS activé pour consommation depuis une app front (Expo, React, etc.)

### Configuration

1. Copier le fichier `.env.example` en `.env` et adapter si besoin :

   - `MONGODB_URI` : URL de connexion à ta base MongoDB (par défaut `mongodb://127.0.0.1:27017/soc-database`)
   - `PORT` : port HTTP de l'API (par défaut `4000`)

### Scripts

- `npm run dev` : démarre l'API avec `nodemon` sur `http://localhost:4000`
- `npm start` : démarre l'API en production

### Endpoints principaux

- `GET /` : ping simple (`{ message: 'API SOC en ligne' }`)
- `GET /alerts` : liste toutes les cartes
- `GET /alerts/random` : renvoie une carte aléatoire
- `GET /alerts/:id` : renvoie une carte par son champ `id` (numérique)
- `POST /alerts` : crée une nouvelle carte (JSON dans le body)

