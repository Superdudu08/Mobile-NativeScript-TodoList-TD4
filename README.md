# TODO List -  TD4 : Version avec Cloud Storage - Maxence Duroy

## Lancer l'application

`npm install` pour installer les dépendances

`tns run` pour lancer l\'application

## Commentaires

* Pour une raison inconnue, la connexion à l'API ne se fait pas depuis le wifi chez moi. Si jamais vous avez ce souci, essayer d'utiliser le réseau 4G.

* Je ne parviens pas à afficher le mot de passe après l'avoir modifié, je ne comprend pas pourquoi mais je ne parviens pas à récupérer le champ contenant le nouveau mot de passe dans la réponse JSON de la part de l'API.

* La création de compte n'est pas fonctionnelle malgré l'utilisation de la requête utilisée pour créer le compte par défaut en dur dans l'application.

* Ces deux derniers points ont été particulièrement frustrants, puisque je suppose qu'en ayant accès à la réponse de l'API dans une console/debugger, il aurait été possible de les résoudre, ce qui n'était pas le cas sur mobile.

* `tns resources generate icons  app/assets/images/appicon.png` a été utilisé pour générer l'icone

* `tns resources generate splashes  app/assets/images/todoSplashes.png` a été utilisé pour générer le splash screen