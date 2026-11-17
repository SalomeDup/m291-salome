# Mes cartes

Une ligne par texte écrit à la main dans **une** carte de votre `index.html` (semaine 9). Prenez les étiquettes dans `etiquettes.md` (semaine 10).

## La carte

Élément et classe de la carte entière (par exemple `article.carte`, ou `li` puis `a.carte`) : `article.carte`

## Ce qu'elle montre

| Texte écrit à la main | Étiquette de `data.json` qui le remplace | Élément et classe |
| --- | --- | --- |
| Casquette bleue | `titre` | `h3.carte-titre` |
| cheveux | `categorie` | `p.carte-categorie` |
| 2.50 CHF | `prix` | `p.carte-prix` |
| Disponible | `disponible` | `p.carte-dispo` |

## Les étiquettes vrai ou faux

Pour chaque étiquette qui vaut `true` ou `false` : le texte et la classe à montrer dans chaque cas.

| Étiquette | Si `true` : texte, classe | Si `false` : texte, classe |
| --- | --- | --- |
| `disponible` | « Disponible », `dispo` | « Indisponible », `indispo` |

## Le conteneur

L'élément qui contient toutes les cartes, et l'`id` que vous lui donnez : `section`, `id="liste-cartes"`

## La carte copiée de index.html

```html
<article class="carte">
  <h3 class="carte-titre">Casquette bleue</h3>
  <p class="carte-categorie">cheveux</p>
  <p class="carte-prix">2.50 CHF</p>
  <p class="carte-dispo dispo">Disponible</p>
</article>
```
