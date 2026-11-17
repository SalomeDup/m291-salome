// Figurine Creator : affiche les options de la figurine.
// Les 30 fiches sont dans data.json. La page les demande avec fetch.

const conteneur = document.getElementById("liste-cartes");
const zoneEtat = document.getElementById("etat");

// La pile de toutes les fiches. Elle est vide tant que data.json n'est pas arrivé.
let tousLesLieux = [];

// Montre une carte par fiche de la liste qu'on lui donne.
// Elle efface d'abord les cartes déjà affichées.
function afficherLieux(liste) {
  conteneur.textContent = "";

  for (const option of liste) {
    const carte = document.createElement("article");
    carte.className = "carte";

    const titre = document.createElement("h3");
    titre.className = "carte-titre";
    titre.textContent = option.titre;

    const categorie = document.createElement("p");
    categorie.className = "carte-categorie";
    categorie.textContent = option.categorie;

    const prix = document.createElement("p");
    prix.className = "carte-prix";
    prix.textContent = option.prix.toFixed(2) + " CHF";

    const dispo = document.createElement("p");
    if (option.disponible) {
      dispo.className = "carte-dispo dispo";
      dispo.textContent = "Disponible";
    } else {
      dispo.className = "carte-dispo indispo";
      dispo.textContent = "Indisponible";
    }

    carte.append(titre, categorie, prix, dispo);
    conteneur.append(carte);
  }
}

// ----- Votre code de la semaine 11 commence ici -----
zoneEtat.textContent = "Chargement des options…";

fetch("data.json")
  .then(function (reponse) {
    if (!reponse.ok) {
      throw new Error("Fichier introuvable : code " + reponse.status);
    }
    return reponse.json();
  })
  .then(function (donnees) {
    zoneEtat.textContent = "";
    tousLesLieux = donnees;
    if (tousLesLieux.length === 0) {
      zoneEtat.textContent = "Aucune option pour le moment.";
      return;
    }
    afficherLieux(tousLesLieux);
  })
  .catch(function (erreur) {
    console.error(erreur);
    zoneEtat.textContent = "Impossible de charger les options. Rechargez la page dans un moment.";
  });

// ----- Filtre par catégorie -----
// Un clic sur un bouton garde seulement les fiches de sa catégorie.
// Un deuxième clic sur le même bouton remontre toutes les fiches.
const boutons = document.querySelectorAll(".bouton-categorie");
let categorieChoisie = null;

function filtrerParCategorie(categorie) {
  // Tant que data.json n'est pas arrivé, il n'y a rien à filtrer.
  if (tousLesLieux.length === 0) {
    return;
  }

  if (categorieChoisie === categorie) {
    categorieChoisie = null;
  } else {
    categorieChoisie = categorie;
  }

  for (const bouton of boutons) {
    bouton.setAttribute("aria-pressed", bouton.dataset.categorie === categorieChoisie);
  }

  if (categorieChoisie === null) {
    zoneEtat.textContent = "";
    afficherLieux(tousLesLieux);
    return;
  }

  const fiches = tousLesLieux.filter(function (option) {
    return option.categorie === categorieChoisie;
  });

  if (fiches.length === 0) {
    zoneEtat.textContent = "Aucune option dans cette catégorie pour le moment.";
  } else {
    zoneEtat.textContent = "";
  }
  afficherLieux(fiches);
}

for (const bouton of boutons) {
  bouton.addEventListener("click", function () {
    filtrerParCategorie(bouton.dataset.categorie);
  });
}
