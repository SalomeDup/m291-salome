// Figurine Creator : affiche les options de la figurine.
// Les 30 fiches sont dans data.json. La page les demande avec fetch.
//
// Ce fichier sert pour toutes les pages :
// - index.html : les boutons sont des liens, il n'y a pas de cartes à montrer.
// - cheveux.html, tete.html, torse.html, jambes.html : chaque page montre
//   seulement les cartes de SA catégorie (écrite dans <body data-categorie="...">).

const conteneur = document.getElementById("liste-cartes");
const zoneEtat = document.getElementById("etat");

// La catégorie de la page (par ex. "torse"). Sur index.html, elle vaut undefined.
const categoriePage = document.body.dataset.categorie;

// La pile des fiches de cette catégorie. Elle est vide tant que data.json n'est pas arrivé.
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

// ----- Recherche (semaine 12) -----
// Timéo cherche une pièce par son titre, dans la catégorie de la page.
function appliquerFiltres() {
  const champRecherche = document.getElementById("recherche");
  const texte = champRecherche.value.trim().toLowerCase();

  const resultats = tousLesLieux.filter(function (option) {
    return option.titre.toLowerCase().includes(texte);
  });

  afficherLieux(resultats);
  document.getElementById("aucun-resultat").hidden = resultats.length > 0;
}

// Tout ce qui suit ne sert que sur une page de catégorie (là où il y a des cartes).
if (conteneur && categoriePage) {

  // ----- Chargement des fiches (semaine 11) -----
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
      // On garde seulement les fiches de la catégorie de cette page.
      tousLesLieux = donnees.filter(function (option) {
        return option.categorie === categoriePage;
      });
      if (tousLesLieux.length === 0) {
        zoneEtat.textContent = "Aucune option pour le moment.";
        return;
      }
      appliquerFiltres();
    })
    .catch(function (erreur) {
      console.error(erreur);
      zoneEtat.textContent = "Impossible de charger les options. Rechargez la page dans un moment.";
    });

  document.getElementById("recherche").addEventListener("input", function () {
    appliquerFiltres();
  });

}

// ----- Formulaire « Enregistre ton personnage » (page d'accueil) -----
// Quand Timéo a fini sa figurine, il lui donne un prénom et l'enregistre.
// Le personnage est gardé dans le navigateur (localStorage) : il reste
// enregistré même si on ferme la page.
const formulaireEnregistrer = document.getElementById("enregistrer");

if (formulaireEnregistrer) {
  const zoneErreurs = document.getElementById("erreurs");
  const zoneConfirmation = document.getElementById("confirmation");

  // Si un personnage a déjà été enregistré, on le rappelle.
  const dejaEnregistre = localStorage.getItem("personnage");
  if (dejaEnregistre) {
    const personnage = JSON.parse(dejaEnregistre);
    zoneConfirmation.textContent = "Dernier personnage enregistré : " + personnage.prenom;
  }

  formulaireEnregistrer.addEventListener("submit", function (event) {
    // Sans cette ligne, le navigateur enverrait le formulaire et rechargerait la page.
    event.preventDefault();

    const donnees = new FormData(formulaireEnregistrer);
    const prenom = donnees.get("prenom").trim();

    if (prenom.length < 2) {
      zoneErreurs.textContent = "Erreur : Donne un prénom à ton personnage, au moins 2 lettres.";
      zoneConfirmation.textContent = "";
      return;
    }
    zoneErreurs.textContent = "";

    const personnage = {
      prenom: prenom,
      date: new Date().toLocaleDateString("fr-CH")
    };
    localStorage.setItem("personnage", JSON.stringify(personnage));

    zoneConfirmation.textContent = "Bravo ! " + prenom + " est enregistré 🎉";
    formulaireEnregistrer.reset();
  });
}
