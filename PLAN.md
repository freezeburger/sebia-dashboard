
# Pratices

1. Terminer avec soucis du détails les composant de "ui"
2. Modeliser "raisonnablement" les données
3. Developper les action CRUD du service "logger"
4. Experimenter a loisir et preparer des questions.


# Plan

>  Page "Review" : revue d'analyses.
- AnalysisDTO   - Infos sur analyse
- ReviewDTO     - Commentaires sur analyse

> La page "Review" permet de visualiser les analyses et de les commenter.
- Valider / Commenter / Skipper / Voir details

- Espace pour skipper
- Passer en revue les analyses non commentées : droite/gauche
- Enter pour valider

Une analyse validee genere un review avec le status "VALIDATED"
Une analyse validee genere un review avec le status "SKIPPED"
Une review peux avoir un commentaire libre.

> Bonus page de liste des reviews.