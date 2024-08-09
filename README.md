# OlympicGamesStarter

## Lancement du site en dev

- Installer les librairies \
```npm i```
- Lancer le serveur de base de données en local \
```json-server --watch src/assets/mock/olympic.json```
- Lancer le projet Angular en local \
```ng serve```
- Ouvrir le lien `http://localhost:4200/` dans le navigateur


- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

I suggest you to start by understanding this starter code. Pay an extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the typescript interfaces inside the `models` folder. As you can see I already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` by the corresponding interface.

You're now ready to implement the requested features.

Good luck!
