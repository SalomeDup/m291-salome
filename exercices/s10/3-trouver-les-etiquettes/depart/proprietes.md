# Les étiquettes de la location d'instruments

Une ligne par étiquette. La colonne « Sert à » répond aux questions 2, 3 et 4 de la méthode : afficher, filtrer, trier. Une étiquette qui ne sert à rien de tout cela n'entre pas dans le fichier, sauf `id`.

| Étiquette   | Écran         | Sert à (afficher, filtrer, trier) | Sorte de valeur | Unique ? | Exemple              |  
| nom         | Liste, Détail | afficher                          | texte           | non      | Violon 3/4           |
| famille     | Liste, Détail | afficher, filtrer                 | texte           | non      | cordes               |
| prix        | Liste, Détail | afficher, trier                   | nombre          | non      | 25                   |
| taille      | Détail        | afficher                          | texte           | non      | enfant               |
| description | Détail        | afficher                          | texte           | non      | Avec étui et archet. |
| disponible  | aucun         | filtrer                           | vrai/faux       | non      | true                 |
| id          | aucun         | distinguer les fiches             | nombre          | oui      | 1                    |

Pourquoi le nom de l'instrument ne suffit pas à distinguer les fiches (une phrase) :
Car il y a plusique fois les même instrument 

Suggestion de l'IA que j'ai refusée, et pourquoi :
l'IA a dit une "etiquette image" mais dans la consigne ils n'ont pas dit qu'ils voulait ça 