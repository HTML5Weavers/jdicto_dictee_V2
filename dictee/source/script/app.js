/*
// JDICTO
// dictee : exercice de dictée
// Script : app.js

LICENCE

Copyright Patrick CARDONA 2017

pcardona34@gmail.com

Ce logiciel est un programme informatique permettant de s'exercer à la dictée.

Ce logiciel est régi par la licence CeCILL-C soumise au droit français et
respectant les principes de diffusion des logiciels libres. Vous pouvez
utiliser, modifier et/ou redistribuer ce programme sous les conditions
de la licence CeCILL-C telle que diffusée par le CEA, le CNRS et l'INRIA
sur le site "http://www.cecill.info".

En contrepartie de l'accessibilité au code source et des droits de copie,
de modification et de redistribution accordés par cette licence, il n'est
offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
seule une responsabilité restreinte pèse sur l'auteur du programme,  le
titulaire des droits patrimoniaux et les concédants successifs.

A cet égard  l'attention de l'utilisateur est attirée sur les risques
associés au chargement,  à l'utilisation,  à la modification et/ou au
développement et à la reproduction du logiciel par l'utilisateur étant
donné sa spécificité de logiciel libre, qui peut le rendre complexe à
manipuler et qui le réserve donc à des développeurs et des professionnels
avertis possédant  des  connaissances  informatiques approfondies.  Les
utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
logiciel à leurs besoins dans des conditions permettant d'assurer la
sécurité de leurs systèmes et ou de leurs données et, plus généralement,
à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.

Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
pris connaissance de la licence CeCILL-C, et que vous en avez accepté les
termes.

FIN DE LA LICENCE */

/* ------------------------------- */
  // On charge les chaines de message
  /* ------------------------------- */
/* ---------------------------------- */

    var MSG_ERREUR_SECTION = "Erreur : aucune section définie";
    var MSG_VOIX_SYNTHESE_DECOUVERTE = "découverte (voix de synthèse)";
    var MSG_VOIX_DECOUVERTE = "découverte";
    var MSG_VOIX_SYNTHESE_ENTRAINEMENT = "entrainement (voix de synthèse)";
    var MSG_VOIX_ENTRAINEMENT = "entrainement";
    var MSG_DICTAM = "dictée aménagée";
    var MSG_PREFERENCES = "Les préférences ont été appliquées.";
    var MSG_CORRECTION_MOT_EN_TROP = "Un mot/espace en trop a été saisi ou un mot a été découpé à tort. ";
    var MSG_CORRECTION_MOTS_EN_TROP = " mots/espaces en trop ont été saisis ou des mots ont été découpés à tort. ";
    var MSG_SIGNE_EN_TROP = "<br />Il peut aussi s'agir d'un signe de ponctuation séparé à tort du mot qui le précède.";
    var MSG_CORRECTION_INDISPONIBLE = "(Correction non disponible : pour une explication, voir le message ci-dessus.)";
    var MSG_BRAVO = "Bravo !";
    var MSG_CAR = " caractère";
    var MSG_CARS = " caractères";
    var MSG_MOT = "mot";
    var MSG_MOTS = "mots";
    var MSG_MANQUE = "Il manque ";
    var MSG_MOTS_DECOUPES = " ou certains mots doivent être découpés. ";
    var MSG_SIGNE_COLLE = "<br />Il peut aussi s'agir d'un signe de ponctuation collé à tort au mot qui le précède.";
    var MSG_TON_TEXTE = "Ton texte comporte ";
    var MSG_ERREUR = " erreur";
    var MSG_TEXTE_COMPLET = "Texte complet :";
    var MSG_PHRASE = "Phrase ";
    var MSG_NUMERO_DICTEE = "Tu dois d'abord sélectionner une dictée dans le sommaire (<i class='material-icons'>home</i>).";
    var MSG_FIC_INCOMPATIBLE = "Le fichier de données n'a pas le bon format : ";
    var MSG_AUCUN_TEXTE = "Tu voudrais afficher une correction, mais aucun texte n'a été saisi.<br />Pour saisir ton texte : <kbd>menu <i class='material-icons'>menu</i> : <i class='material-icons'>edit</i> saisir ";
    var MSG_ERREUR_DECOUPAGE = "Erreur de découpage de l'enregistrement. Fragment audio inconnu.";
    var MSG_ERREUR_PARTAGE = "Tu tentes de partager une dictée à partir d'une application locale. Le partage n'est pas disponible dans ce cas.";
    var MSG_ERREUR_SOMMAIRE = "Le sommaire n'est pas au bon format.";
    var MSG_ERREUR_INCONNUE = "Erreur non définie pour le numéro : ";
    var MSG_TXT_CM = "Texte à choix multiples : recopie ce texte sur ton cahier de brouillon en tenant compte des choix proposés entre crochets : <span class='evidence'>{ }</span>";


/* -------------------------------------------- */
/* Fonctions  d'optimisation			        */
/* -------------------------------------------- */
 var $ = new class $ {
  set(id) {
    this.id = document.getElementById(id);
  }

  montrer() {
    this.id.style.display = "block";
  }

  montrer_en_ligne(){
    this.id.style.display = "inline";
  }

  masquer() {
    this.id.style.display = "none";
  }

  cliquer() {
    this.id.click();
  }

  set_classe(classeCSS) {
    this.id.className = classeCSS;
  }

  set_texte(texte) {
    this.id.textContent = texte;
  }

  maj_texte(texte) {
    this.id.textContent += texte;
  }

  set_html(texte) {
    this.id.innerHTML = texte;
  }

  maj_html(texte) {
    this.id.innerHTML += texte;
  }

  set_valeur(valeur) {
    this.id.value = valeur;
  }

  get_texte(){
    return this.id.textContent;
  }

  get_html(){
    return this.id.innerHTML;
  }

  get_valeur(){
    return this.id.value;
  }
};

var q$ = new class q$ {
  set(el) {
    this.el = document.querySelector(el);
  }

  montrer() {
    this.el.style.display = "block";
  }

  montrer_en_ligne(){
    this.el.style.display = "inline";
  }

  masquer() {
    this.el.style.display = "none";
  }

  cliquer() {
    this.el.click();
  }

  set_classe(classeCSS) {
    this.el.className = classeCSS;
  }

  set_texte(texte) {
    this.el.textContent = texte;
  }

  set_html(texte) {
    this.el.innerHTML = texte;
  }

  maj_html(texte){
    this.el.innerHTML += texte;
  }
};

// Récupération et affichage de la version
  loadData("data/version.json", chargerVersion);

// Chargement du sommaire
  loadData("data/sommaire.json", chargeSommaire);

/* On adapte le libellé du menu item 1 - Idem pour le titre h1 de la section 1
En fontion de la préférence choisie : dictée écoutée VS dictée aménagée */
  adapteLibelles();

/* ---------------------------------- */
/* GESTIONNAIRES DES EVENEMENTS       */
/* ---------------------------------- */

/* ---------------------------------- */
// Gestionnaire du chargement de la PAGE
/* ---------------------------------- */
window.addEventListener('load', function() {

  // Event : si on clique sur le bouton menu... on affiche le menu vertical
  document.getElementById('menu').addEventListener("click", function () {

    // On masque la barre d'actions (zone d'affichage des boutons)
    $.set("barre_actions");
    $.masquer();

    // On masque le sommaire éventuellement affiché
    $.set("menu_sommaire");
    $.masquer();

    // On affiche le bloc menu vertical
    $.set("menu_vertical");
    $.montrer();

    // Et on efface les sections :
    masquerLesSections();
  }, false); // Fin gestion Event menu.onclick

/* ---------------------------------- */
// Gestionnaire du menu SOMMAIRE
/* ---------------------------------- */
document.getElementById("sommaire").addEventListener("click", function(){
  // On masque auparavant un éventuel menu déjà affiché
  $.set("menu_vertical");
  $.masquer();
  // Et on affiche le sommaire...
  afficherSommaire();
}, false);

  /* --------------------------------- */
  // SOMMAIRE cycles 3 et 4
  /* --------------------------------- */
  var sommaires = new Array("cm2","6e","5e","4e","3e");
  sommaires.forEach(function(niv){

    // Les items sont des tiroirs qui se déplient/replient
    document.getElementById("sommaire_"+niv).addEventListener("click", function()
    {
      replierSommaire();
      deplierReplierNiveauSommaire(niv);
    },false);
  });

// Par défaut, le sommaire est replié
replierSommaire();

/* --------------------------------- */
// Gestionnaire items de l'aide
/* --------------------------------- */

// Si on clique sur un des 3 items de l'aide
var items_aide = new Array("1", "2", "3");
items_aide.forEach(function(niv){
  document.getElementById("aide_" + niv).addEventListener('click', function(){
    replierContenusAide();
    deplierReplierContenuAide(niv);
  }, false);

});
// Et on les replie tous par défaut
replierContenusAide();

/* ---------------------------------- */
// Gestionnaire du menu AIDE
/* ---------------------------------- */
document.getElementById("aide").addEventListener("click", function(){
  // On masque auparavant un éventuel menu déjà affiché
  $.set("menu_vertical");
  $.masquer();
  // On masque le sommaire éventuellement affiché
  $.set("menu_sommaire");
  $.masquer();
  // Et on affiche l'aide...
  afficherAide();
}, false);
/* ---------------------------------- */
// Gestionnaire du menu PARTAGE
/* ---------------------------------- */
document.getElementById("partage").addEventListener("click", function(){
  // On masque auparavant un éventuel menu déjà affiché
  $.set("menu_vertical");
  $.masquer();
  // On masque le sommaire éventuellement affiché
  $.set("menu_sommaire");
  $.masquer();
  // Et on affiche le partage si une dictée est chargée...
  if(atonChargeUneDictee()){
    afficherPartage();
  }else{
    // Sinon, erreur #1
    masquerLesSections();
    erreur(1);
  }

}, false);


/* ---------------------------------- */
// Gestionnaires des onglets onglet_aide et onglet_licence
/* ---------------------------------- */
document.getElementById("onglet_aide").addEventListener("click", function(){
  afficherArticle("aide");
  }, false);
  // On affiche l'aide par défaut
  $.set("onglet_aide");
  $.cliquer();

document.getElementById("onglet_licence").addEventListener("click", function(){
  afficherArticle("licence");
  }, false);

document.getElementById("onglet_illustrations").addEventListener("click", function(){
  afficherArticle("illustrations");
  }, false);

  /* -------------------------------------------- */
  // Ecouteurs d'événements en lien avec l'EDITEUR
  /* -------------------------------------------- */

  // Caractères spéciaux
	// Cliquer sur un bouton de l'éditeur insère ce caractère
	// à la position courante du curseur de texte
	var caracteres = document.querySelectorAll(".spec");
	caracteres.forEach(function (caractere){
	  caractere.addEventListener("click", function(){
	    var carspec = caractere.textContent;
	    insertion(carspec);
	  },false);
	});

  // Le compteur de caractères est mis à jour à chaque insertion ou suppression
  document.getElementById("editeur").addEventListener("input", function(){
    compteurMAJ("A");
  },false);

  // LA POSITION DU CURSEUR DE TEXTE
  // Elle est mémorisée à chaque événement : touche pressée/relevée
  // ou clic dans le texte...
  var editeur = document.getElementById("editeur");
  // On écoute plusieurs événements possibles
  addListenerMulti(editeur, "mousedown mouseup keydown keyup", maj_curseur, false);

  /* -------------------------------- */
  // GESTIONNAIRE DES CHOIX DE MENUS
  /* -------------------------------- */

  // liste des items de menus / et des sections associées
    var items = [
    'item1',
    'item2',
    'item3',
    'item4',
    'item5',
    'item6'
  ];

  // Pour chaque item...
  items.forEach(function (item) {
    // Quand on clique sur cet item de menu
    document.getElementById(item).addEventListener("click", function () {
      // On masque le menu vertical
      $.set('menu_vertical');
      $.masquer();
      // On masque les sections... (sauf la section Message)
      masquerLesSections();

      // On masque la barre des actions (zone d'affichage des boutons)...
      $.set('barre_actions');
      $.masquer();

      // On récupère le nom de la section à partir de l'item choisi et on l'affiche...
      var section = 'section_' + item;
      afficherSection(section);
      // On affecte une action et un libellé aux boutons...
      switch(section){

        /* ----------------------- */
        // SECTION ITEM 1
        /* ----------------------- */
        case "section_item1":
            // Si une dictée est sélectionnée
            if(atonChargeUneDictee()){
              afficherSelecteur();
              definitActionBouton("D", fd, true);
            }else{
              // Sinon erreur #1
              masquerLesSections();
              erreur(1);
            }
        break;

        /* ----------------------- */
        // SECTION ITEM 2
        /* ----------------------- */
        case "section_item2":

            // Si une dictée est chargée
            if(atonChargeUneDictee()){

              /* GESTIONNAIRE changement état éditeur de texte */
              document.getElementById("editeur").addEventListener("input", function(){
              compteurMAJ("A");
            }, false);
              definitActionBouton("A", fa, true);
              definitActionBouton("B", fb, true);
              compteurMAJ();
            }else{
              // Sinon erreur #1
              masquerLesSections();
              erreur(1);
            }
        break;

        /* ----------------------- */
        // SECTION ITEM 3
        /* ----------------------- */
        case "section_item3":
            // Si on a chargé une dictée
            if(atonChargeUneDictee()){
              // On récupère le nombre de caractères saisis
              $.set("nombre");
              var nombre = $.get_texte();
              // Si aucun caractère n'a été saisi
              if(nombre === "0"){
                masquerLesSections();
                // => erreur #3
                erreur(3);
              }else{
                definitActionBouton("C", fc, true);
              }
            }else{
              // Sinon erreur #1 (aucune dictée sélectionnée)
              masquerLesSections();
              erreur(1);
            }
        break;

        /* ----------------------- */
        // SECTION ITEM 4
        /* ----------------------- */
        case "section_item4":
            // Si on sélectionné une dictée
             if(atonChargeUneDictee()){
              afficherSolution();
            }else{
              // Sinon erreur #1
              masquerLesSections();
              erreur(1);
            }
        break;

        /* ----------------------- */
        // SECTION ITEM 5
        /* ----------------------- */
        case "section_item5":
            // Si on chargé une dictée
            if(atonChargeUneDictee()){
              definitActionBouton("H", fh, true);
            }else{
              // Sinon erreur #1
              masquerLesSections();
              erreur(1);
            }
        break;

        /* ----------------------- */
        // SECTION ITEM 6
        /* ----------------------- */
        case "section_item6":
        // Si on a sélectionné une dictée
            if(atonChargeUneDictee()){
              definitActionBouton("F", ff, true);
            }else{
              // Sinon erreur #1
              masquerLesSections();
              erreur(1);
            }
        break;

        default:
          afficherMessage(MSG_ERREUR_SECTION, "erreur")
      }

  },false); // Fin de AddEventListener menu.onclick

  }); // Fin du forEach items


 /* -------------------------------- */
 /* INITIALISATION DE L'APP          */
 /* -------------------------------- */

  // A-t-on passé un paramètre dans l'URL ? Ou est-elle déposée dans le LocalStorage ?
  // On recherche le numéro de la dictée courante
  var numero;
  numero = obtenirParametre("numero");

  // Si le numéro est défini, on charge les données de cette dictée
  if(numero){
    loadData("data/dictee" + numero + ".json", chargerDonnees);
    /* ----------------------------------- */
    // On intialise la zone de sélecteur de phase:
    afficherSelecteur();

    // On initialise la solution affichée si la langue est donnée au chat ;-)
    afficherSolution();

    /* La section A PROPOS est chargée en 1er */
    // donc on simule un clic sur l'item 6 du menu
    $.set("item6");
    $.cliquer();

  }else{
    // Sinon on affiche le sommaire pour inciter à sélectionner une dictée
    // en simlulant un clic sur l'item sommaire
    $.set("sommaire");
    $.cliquer();
  }

  /* -------------------------------------- */
  /* On initialise l'écran des préférences */
  /* -------------------------------------- */

  // On initialise la liste des voix dans le panneau des préférences
  listeVoix();

  // On associe un gestionnaire au réglage du débit de la voix
  document.querySelector("input[name=debit]").addEventListener("change", changeDebit, false);

  // On associe un gestionnaire à l'option police cursive de l'éditeur
  document.getElementById("police_editeur").addEventListener("change", prefEditeur, false);

  // On associe un gestionnaire à la liste déroulante des voix
  document.getElementById("voix").addEventListener("change", choisirVoix, false);

  // On associe un gestionnaire au lien "changer de modalité"
  // qui affiche la section "préférences"
  document.getElementById("changer_modalite").addEventListener("click", function(){
    $.set("item5");
    $.cliquer();
  },false);

  // On associe un gestionnaire au choix de la modalité :
  // découverte - c-à-d avec voix de synthèse et découpage en phrases
  document.getElementById("decouverte").addEventListener("change", function(){
    $.set("modalite_choisie");
    $.set_texte(MSG_VOIX_SYNTHESE_DECOUVERTE);
    afficherSelecteur();
    afficherSolution();
    // On associe/met à jour le gestionnaire associé au bouton LIRE...
    document.getElementById("lire").addEventListener("click", ecouterDictee, false);
  },false);

  // On associe un gestionnaire au choix de la modalité :
  // découverte audio - c-à-d avec voix enregistrée et découpage en phrases
  document.getElementById("decouverte_audio").addEventListener("change", function(){
    $.set("modalite_choisie");
    $.set_texte(MSG_VOIX_DECOUVERTE);
    afficherSelecteur();
    afficherSolution();
    // On associe/met à jour le gestionnaire associé au bouton LIRE...
    document.getElementById("lire_audio").addEventListener("click", ecouterDicteeAudio, false);
  },false);

  // On associe un gestionnaire au choix de la modalité :
  // entrainement - c-à-d texte complet avec voix de synthèse
  document.getElementById("entrainement").addEventListener("change", function(){
    $.set("modalite_choisie");
    $.set_texte(MSG_VOIX_SYNTHESE_ENTRAINEMENT);
    afficherSelecteur();
    afficherSolution();
    // On associe/met à jour le gestionnaire associé au bouton LIRE...
    document.getElementById("lire").addEventListener("click", ecouterDictee, false);
  },false);

  // On associe un gestionnaire au choix de la modalité :
  // entrainement - c-à-d texte complet avec voix enregistrée
  document.getElementById("entrainement_audio").addEventListener("change", function(){
    $.set("modalite_choisie");
    $.set_texte(MSG_VOIX_ENTRAINEMENT);
    afficherSelecteur();
    afficherSolution();
    // On associe/met à jour le gestionnaire associé au bouton LIRE...
    document.getElementById("lire_audio").addEventListener("click", ecouterDicteeAudio, false);
  },false);

// On rafraichit le sélecteur de phrase en simulant un changement de modalité...
// D'abord texte complet : cela permet de pré-charger le fichier audio en entier
  $.set("entrainement");
  $.cliquer();
  $.set("decouverte_audio");
  $.cliquer();

  // On associe un gestionnaire au choix de la modalité :
  // dictée aménagée - c-à-d texte complet avec choix proposés
  document.getElementById("dictee_amenagee").addEventListener("change", function(){
    $.set("modalite_choisie");
    $.set_texte(MSG_DICTAM);
    afficherSelecteur();
    afficherSolution();
  },false);

  // Si on veut masquer un message en cliquant sur le bouton de fermeture
 document.getElementById("bouton_fermer_message").addEventListener("click", masquerMessage, false);

/* On peut maintenant afficher le corps de la page... */
// La classe chargement crée un effet progressif d'affichage
// afin d'éviter un affichage intempestif du menu
// avant qu'il ne soit masqué...
$.set("corps");
$.set_classe("chargement");

},false); // Fin du gestionnaire d'Event "onload"
/* ----------------------------------- */






/* /////////////////////////////////  */
/* ---------------------------------- */
// FONCTIONS
/* ---------------------------------- */
/* /////////////////////////////////  */

// Afficher une section
function afficherSection(section){
  $.set(section);
  $.montrer();
  masquerBoutonsAction();
  masquerSommaire();
} // Fin de la fonction

/* ---------------------------------- */
/* Afficher un message */
// Masquer toutes les sections
function masquerLesSections() {

  let sections = document.querySelectorAll("section");
  sections.forEach(function(section){
    section.style.display = "none";
  }); // Fin du forEach
} // Fin de la fonction


/* -------------------------------------------------------------- */
// Retour à la section # en simulant un clic sur l'item # du menu
// Paramètres :
// @num_section : le numéro de l'item / de la section
function revenir(num_section){
  $.set("item" + num_section);
  $.cliquer();
} // Fin fonction


/* ---------------------------------- */
/* Afficher un message */
/*
// Paramètres :
// @texte : "texte du message"
// @type (facultatif) : type de message :
// "information" (par défaut) | "erreur" | "succes" | "attention"
*/

function afficherMessage(texte, type = "information"){
 $.set("section_message");
 $.set_classe(type);
 $.set("bouton_fermer_message");
 $.montrer();
 $.set("contenu_message");
 $.set_html(texte);
 $.set("section_message");
 $.montrer();
} // Fin de la fonction

/* --------------------------------- */

function masquerMessage(){
  $.set("section_message");
  $.masquer();
} // Fin de la fonction

/* -------------------- */
/* Masquer tous les boutons d'action */
function masquerBoutonsAction(){
  var boutons = document.querySelectorAll("#actions li");
  boutons.forEach(function(bouton){
    bouton.style.display = "none";
  }); // Fin forEach
} // Fin de la fonction

/* --------------------- */
/* Barre des actions */
function afficherActions(){
  // montrer la bare des actions
  var barreActions = document.getElementById("barre_actions");
  if(barreActions.style.display === "none"){
    barreActions.style.display = "block";
  }
} // Fin de la fonction

/* ---------------------------- */
// Actions assciées aux boutons de la barre d'action
// Paramètres :
// @indice : lettre qui identifie le bouton dans le document
// @f : fonction associée à l'événement onclick sur le bouton
// @montrer : option montrer/masquer le bouton

function definitActionBouton(indice, f, montrer=true){
 afficherActions();
var bouton, item;
  bouton = document.querySelector("#"+indice+">a");
  item = document.getElementById(indice);
  // gestionnaire Event associé à la fonction f
  bouton.addEventListener("click", f, false);
    // afficher l'item de liste
    montrer === true ? item.style.display = "inline" : item.style.display = "none";
}

/* ---------------------------------- */
// Callbacks des actions de boutons...
/* ---------------------------------- */

// Si on clique sur le bouton A...
function fa() {
  afficherErreurs(3);
} // Fin de la fonction

/* ---------------------------------- */
// Si on clique sur le bouton B...
function fb() {
  effacerEditeur();
} // Fin de la fonction

/* ---------------------------------- */
// Si on clique sur le bouton C...
function fc() {
  revenir(2);
  definitActionBouton("A", fa, true);
  definitActionBouton("B", fb, true);
  compteurMAJ();
  masquerMessage();
} // Fin de la fonction

/* ---------------------------------- */
// Si on clique sur le bouton D...
function fd() {
  revenir(6);
} // Fin de la fonction

/* ---------------------------------- */
// Si on clique sur le bouton E...
function fe() {
  $.set("item2");
  $.cliquer();
} // Fin de la fonction

/* ---------------------------------- */
// Si on clique sur le bouton F...
function ff() {
  revenir(1);
} // Fin de la fonction

/* ---------------------------------- */
// Si on clique sur le bouton G...
function fg() {
  revenir(1);
  masquerMessage();
} // Fin de la fonction

/* ---------------------------------- */
// Si on clique sur le bouton H
function fh() {
  finPreferences();
} // Fin de la fonction

/* ---------------------------------- */
// Si on clique sur le bouton I...
function fi() {
  $.set("partage");
  $.cliquer();
} // Fin de la fonction

/* ---------------------------------- */
// Si on clique sur le bouton J
function fj() {
  $.set("item6");
  $.cliquer();
} // Fin de la fonction


/* --------------------------------- */
/* GESTIONNAIRE DES DONNEES          */
/* --------------------------------- */
// Paramètres :
// @url : chemin du fichier JSON contenant les données
// @cFunction : Callback qui traite les données chargées
// Voir les fonctions suivantes pour ces Callbacks

function loadData(url, cFunction) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.addEventListener("error", function(){
    erreur(1);
    }, false);
  xhttp.open("GET", url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
xhttp.send(null);
} // Fin fonction

/* ---------------------------------------------- */
/* Callback : chargement des données de la dictée */
/* ---------------------------------------------- */

function chargerDonnees(xhttp){
  var donnees;
  donnees = JSON.parse(xhttp.responseText);

  var app_name = donnees.app_name;
  if(app_name === "jDicto"){
    $.set("prof");
    $.set_texte(donnees.prof);

    $.set("reference");
    $.set_texte(donnees.reference);

    $.set("titre");
    $.set_texte(donnees.titre);

    $.set("auteur");
    $.set_texte(donnees.auteur);

    $.set("ouvrage");
    $.set_texte(donnees.ouvrage);

    if (donnees.legal !== undefined){
      $.set("legal");
      $.set_texte(donnees.legal);
    }

    $.set("solution");
    $.set_texte(donnees.texte);

  }else{
    erreur(2);
  }
} // Fin fonction

/* -------------------------------------------------------- */
/* Callback : chargement des fragments sonores de la dictée */
/* -------------------------------------------------------- */
function chargerAudioDictee(xhttp){

  var donnees;
  donnees = JSON.parse(xhttp.responseText);

  var media = "media/dictee" + donnees.dictee + ".ogg"
  $.set("texte");
  var phrase = $.get_valeur();
  var segments = donnees.segments;
  var dernier = segments.length;
  var lecteur_audio = document.getElementById("lecteur_audio");

  if(phrase > dernier){
    erreur(4);
    return;
  }

  var numero = obtenirParametre("numero");
  if (numero){
    switch (phrase){
    case 0:
      // Convention : il s'agit du media correspondant au texte entier
      uri = media;
    break;

    default:

      uri = media + "#t=" + segments[(phrase - 1)]
  } // fin switch
  lecteur_audio.src = uri;
  lecteur_audio.load();
  }
} // Fin fonction

/* ------------------------------------- */
// Callback - Charger la dictée aménagée
/* ------------------------------------- */
function chargerDicteeAmenagee(xhttp){
  var donnees = JSON.parse(xhttp.responseText);
  var dictam = donnees.dictam;
  dictam = replaceAll(dictam, "10", donnees.mot10);
  dictam = replaceAll(dictam, "1", donnees.mot1);
  dictam = replaceAll(dictam, "2", donnees.mot2);
  dictam = replaceAll(dictam, "3", donnees.mot3);
  dictam = replaceAll(dictam, "4", donnees.mot4);
  dictam = replaceAll(dictam, "5", donnees.mot5);
  dictam = replaceAll(dictam, "6", donnees.mot6);
  dictam = replaceAll(dictam, "7", donnees.mot7);
  dictam = replaceAll(dictam, "8", donnees.mot8);
  dictam = replaceAll(dictam, "9", donnees.mot9);

  dictam = replaceAll(dictam, "{", "<span class='evidence'>{</span>");
  dictam = replaceAll(dictam, "}", "<span class='evidence'>}</span>");
  dictam = replaceAll(dictam, "|", "<span class='evidence'>|</span>");

  // On rend dans l'affichage les éventuels sauts de ligne...
  var reg = new RegExp ( /\n/g );
  dictam =	dictam.replace(reg,"<br />");
  $.set("dictam");
  $.set_html(dictam);
} // Fin de fonction

/* -------------------------------------------------- */
// Callback - Récupération et affichage de la version
/* -------------------------------------------------- */
function chargerVersion(xhttp){
  var donnees = JSON.parse(xhttp.responseText);
  var version = donnees.version;
  $.set("app_version");
  $.set_texte(version);
}

/* ------------------------------------- */
/* Callback - Gestionnaire Sommaire      */
/* ------------------------------------- */
function chargeSommaire(xhttp){
    var donnees = JSON.parse(xhttp.responseText);
    // On vérifie la compatibilité du sommaire chargé
    var nom_app = donnees.app_name;
    if (nom_app.toLowerCase() !== "jdicto"){
      erreur(6);
    } else {
    var niveaux = donnees.niveaux;
    niveaux.forEach(function(niv){
      var liste_niv = document.getElementById(niv);
      var donnees_niv = chargeDonneesSectionSommaire(xhttp, niv);
      var nombreEnfants = document.getElementById(niv).childNodes.length;

      // Nombre de dictées pour le niveau courant
      var nombre_niv = donnees_niv.length;
      // On l'indique entre parenthèses
      $.set("nb_"+niv);
      $.set_texte("("+nombre_niv+")");
      // Si aucune dictée encore rattachée à ce niveau: premier chargement
      if(nombre_niv){

        donnees_niv.forEach(function(dn){

          var item = document.createElement("li");
          var lien = document.createElement("a");
          var textnode = document.createTextNode("Dictée " + dn);
          lien.appendChild(textnode);
          //lien.href = "/?numero=" + donnees_niv[i];
          lien.href = "#";
          lien.id = dn;
          item.appendChild(lien);
          liste_niv.appendChild(item);

          document.getElementById(lien.id).addEventListener("click", function(){
            sessionStorage.setItem("numero", lien.id);
            loadData("data/dictee" + lien.id + ".json", chargerDonnees);
            window.location.reload(true);
          },false);

      }); // fin ForEach (dn)
    } // fin du IF(donnees_niv)
  replierSommaire();
  });  // fin du ForEach (niv)
 }// fin ELSE
} // FIN fonction

/* ------------------------------------------- */
// Callback - On charge une section du sommaire
/* ------------------------------------------- */
function chargeDonneesSectionSommaire(xhttp, niv){
  var donnees = JSON.parse(xhttp.responseText);

  switch (niv) {
    case "cm2":
      return donnees.niv_cm2
    break;

    case "6e":
      return donnees.niv_6e;
    break;

    case "5e":
      return donnees.niv_5e;
    break;

    case "4e":
      return donnees.niv_4e;
    break;

    case "3e":
      return donnees.niv_3e;
    break;

    default:
      return false;
    break;

  } // fin du switch
} // fin fonction

/* ---------------------------------- */
/* Pour replier le sommaire           */
/* niv : "cm2", "6e", "5e", etc.      */
/* ---------------------------------- */
function replierSommaire() {
    var niveaux = new Array("cm2", "6e", "5e", "4e", "3e");
    niveaux.forEach(function(niveau){
      $.set(niveau);
      $.masquer();
      $.set("sommaire_"+niveau);
      $.set_classe("replie");
    });
} // Fin fonction

/* ---------------------------------- */
/* Déplier/replier un niveau du sommaire */
function deplierReplierNiveauSommaire(niv) {
  var item = document.getElementById(niv);
  var parent = document.getElementById("sommaire_" + niv);
  if (item.style.display === "none"){
    item.style.display = "block";
    parent.className = "deplie";
  }else{
    item.style.display = "none";
    parent.className = "replie";
  }
} // Fin fonction

/* ---------------------------------- */
// AFFICHER/MASQUER LE SOMMAIRE
/* ---------------------------------- */
function afficherSommaire(){
  masquerLesSections();
  masquerBoutonsAction();
  $.set("menu_sommaire");
  $.montrer();
} // Fin de fonction

/* ---------------------------- */
function masquerSommaire(){
  $.set("menu_sommaire");
  $.masquer();
} // Fin de fonction


/* --------------------------------------------------------- */
/* GESTIONNAIRE des Paramètres passés à Session STORAGE      */
/* --------------------------------------------------------- */
// Pour obtenir la valeur de @cle
// Retourne FAUX si ce paramètre n'est pas disponible

function obtenirParametre(cle)
{
       // On cherche si un paramètre a été passé dans l'URL
       // Cas application Web
       var params = new URLSearchParams(window.location.search);
       if (params.has(cle)){
         var valeur = params.get(cle);
         sessionStorage.setItem(cle, valeur);
         document.location.href = window.location.origin + window.location.pathname;
         return valeur;
       }else{
         // Sinon on cherche la clé dans le LocalStorage
         // ie sélection à partir du sommaire...
         if(sessionStorage.getItem(cle)){
            return sessionStorage.getItem(cle);
          }else{
            // Sinon rien n'a été ni passé ni sélectionné...
         return(false);
       }
      }
} // Fin fonction

/* ----------------------------------- */
// A-t-on chargé une dictée ?
/* ----------------------------------- */
function atonChargeUneDictee(){
  var numero = obtenirParametre("numero");
  return numero;
} // Fin de fonction

/* ----------------------------------- */
/* FONCTIONS EDITEUR DE TEXTE          */
/* ----------------------------------- */

/* ---------------------------------- */
/* insertion caractère spécial */
function insertion(car) {
		$.set("editeur");
		var texte = $.get_valeur();
		$.set("curseur");
		var curseur = $.get_texte();
        var sous_chaine_un = texte.substring(0,curseur);
        var sous_chaine_deux = texte.substring(curseur,texte.length)
        texte = sous_chaine_un + car + sous_chaine_deux;
		$.set("editeur");
		$.set_valeur(texte);
		compteurMAJ("A");
		set_position_curseur((parseInt(curseur) + 1));
		$.set("curseur");
		$.set_texte((parseInt(curseur) + 1));
} // Fin fonction

/* ---------------------------------- */
// Mise à jour du compteur de caractères
// et Callbacks associés
function compteurMAJ(){
  $.set("editeur");
  var nombre = $.get_valeur().length;
  $.set("nombre");
  $.set_texte(nombre);

  // Aspect de la barre des actions en fonction de la saisie du texte
  // ainsi que les libellés...
  switch(nombre){
    // Aucun caractère
    case 0:
      $.set("A");
      $.masquer();
      $.set("B");
      $.masquer();
      $.set("libelle_car");
      $.set_texte(MSG_CAR);
    break;

    // Un caractère
    case 1:
      $.set("B");
      $.montrer_en_ligne();
      $.set("A");
      $.montrer_en_ligne();
      $.set("libelle_car");
      $.set_texte(MSG_CAR);
    break;

    // Sinon, plusieurs caractères
    default:
      $.set("A");
      $.montrer_en_ligne();
      $.set("B");
      $.montrer_en_ligne();
      $.set("libelle_car");
      $.set_texte(MSG_CARS);
  }
} // Fin fonction

/* ---------------------------------- */
function effacerEditeur(){
  $.set("editeur");
  $.set_valeur("");
  compteurMAJ("A");
} // Fin fonction

/* ---------------------------------- */
/* Amélioration de l'éditeur de texte */

// Obtenir la position du curseur
/* ---------------------------------- */
function get_position_curseur() {
  var positionCurseur = 0;
  var zone = document.getElementById("editeur");
  positionCurseur = zone.selectionStart;
  return positionCurseur;
} // Fin de fonction

// Placer le curseur de texte
/* ---------------------------------- */
function set_position_curseur(position=0) {
    var el = document.getElementById("editeur");
    el.selectionEnd = position;
    el.focus();
} // Fin de fonction

/* ------------------------------ */
function maj_curseur(){
    var pos_curseur = get_position_curseur();
    $.set("curseur");
    $.set_texte(pos_curseur);
} // Fin de fonction

// FIN EDITEUR
/* ----------------------------- */

/* ----------------------------- */
/* GESTIONNAIRE préférences      */
/* ----------------------------- */

function finPreferences(){
  adapteLibelles();
  revenir(1);
  afficherMessage(MSG_PREFERENCES);
  // Masquage auto après 1,5 sec.
  window.setTimeout(masquerMessage, 1500);
}

/* ---------------------------------- */
// Sélection de la voix de synthèse
function choisirVoix(){

  var indice_voix = document.getElementById("voix").selectedIndex;;
  var nom_voix = document.getElementById("voix").options[indice_voix].text;
  $.set("ma_voix");
  $.set_texte(indice_voix);
  $.set("nom_voix");
  $.set_texte(nom_voix);
}

/* ---------------------------------- */
// Met à jour l'affichage de l'éditeur en fonction de la préférence choisie
function prefEditeur(){
  var police = document.getElementById("police_editeur");
  var editeur = document.getElementById("editeur");
  police.checked === true ? editeur.className = "cursive" : editeur.className = "standard";
}


/* ------------------------------------------------ */
// Adapte l'item de menu en fonction des préférences
/* ------------------------------------------------ */
function adapteLibelles(){
  $.set("modalite_choisie");
  var modalite = $.get_texte();

  if(modalite === "dictée aménagée"){
    // On adapte l'item 1 dans le menu
    $.set("item1");
    $.set_html("<i class='material-icons'>playlist_add_check</i>&nbsp;Choisir…");
    // Idem pour le titre de la section 1
    q$.set("#section_item1 h1");
    q$.set_html("<i class='material-icons'>playlist_add_check</i>&nbsp;Choisir…");
  }else{
    $.set("item1");
    $.set_html("<i class='material-icons'>headset</i>&nbsp;Écouter…");
    q$.set("#section_item1 h1");
    q$.set_html("<i class='material-icons'>headset</i>&nbsp;Écouter…");
  }

}


/* ---------------------------------- */
// Gestion des voix de synthèse
function listeVoix(){
var s = document.getElementById("voix");
var interval = setInterval(function () {
    var voices = speechSynthesis.getVoices();
    if (voices.length) clearInterval(interval); else return;
    for (var i = 0; i < voices.length; i++) {
        var option = document.createElement("option");
        s.appendChild(option);
        option.value = i;
        option.textContent = voices[i].name;
    }
}, 10);
}


/* --------------------------------------------- */
/* COMPARER DEUX TEXTES POUR MONTRER LES ERREURS */
/* --------------------------------------------- */
function comparerTextes (attendu, saisi){
  var bilan = new Array();
  var message = ""; // feedback
  var bouton = "C"; // bouton par défaut
  var erreurs = 0; // compteur d'erreurs
  var type = "attention"; // type de message par défaut
  var resultat = ""; // chaine de la correction
  var retours = new Array();

  $.set("texte");
  var indice = $.get_valeur();

  // Texte complet...
  if(parseInt(indice) === 0){

    // Si le texte comporte des retours à la ligne, on les rend dans l'affichage
    var reg = new RegExp ( /\n/g );
    attendu = attendu.replace(reg," <br /> ");
    saisi = saisi.replace(reg," <br /> ");
  }

  // On découpe chaque chaine en mots
  var reg2 = new RegExp (/\s+/g);
  var mots_attendus = attendu.split(reg2);
  var mots_saisis = saisi.split(reg2);
  // On récupère  le nombre de mots par chaine
  var nombre_attendus = mots_attendus.length;
  var nombre_saisis = mots_saisis.length;
  // Premier niveau de comparaison : sur le nombre de mots
  var difference = nombre_attendus - nombre_saisis;

  // Si trop de mots ont été saisis...
  if (difference < 0){
    if (Math.abs(difference) === 1){
      message = MSG_CORRECTION_MOT_EN_TROP;
    }else{
      message = Math.abs(difference) + MSG_CORRECTION_MOTS_EN_TROP;
    }
    message += MSG_SIGNE_EN_TROP;
    type = "erreur";
    bouton = "C"; // reprendre...
    resultat = MSG_CORRECTION_INDISPONIBLE;

  // Sinon :  même nombre de mots
  }else if(difference === 0){
    // On suppose d'abord un succès...
    message = MSG_BRAVO;
    type = "succes";
    bouton = "G"; // revenir
    // On compare les mots un à un...
    for(var i=0;i<nombre_attendus;i++){
      if(mots_saisis[i]===mots_attendus[i]){
        resultat += mots_saisis[i] + " ";
      }else{
        // En cas d'erreur, on encadre le mot erroné pour indiquer l'erreur...
        resultat += "<s>" + mots_saisis[i] + "</s> ";
        // On incrémente le compteur d'erreurs
        erreurs++;
        bouton = "C"; // c-à-d reprendre
      }
    } // fin du FOR
    //console.log(resultat);
    resultat = resultat.replace(" @ ","<br />");
  } // fin du ELSE IF
  // Sinon : des mots ont omis ou certains ont été agglutinés
  else{
    var mot = MSG_MOT;
    difference > 1 ? mot = MSG_MOTS : mot = MSG_MOT;
    message = MSG_MANQUE + difference + " " + mot + MSG_MOTS_DECOUPES;
    message += MSG_SIGNE_COLLE;
    type = "erreur";
    bouton = "C"; // c-à-d reprendre
    resultat = MSG_CORRECTION_INDISPONIBLE;
  }

  if(erreurs){
    var terminaison = "";
    switch(erreurs){

      case 1:
        terminaison = terminaison;
      break;

      default:
        terminaison = "s";
    }
    message = MSG_TON_TEXTE + erreurs + MSG_ERREUR + terminaison + ".";
    type = "erreur";
    bouton = "C"; // reprendre
  }

  // On constitue puis retourne le tableau bilan
  bilan[0] = resultat;
  bilan[1] = message;
  bilan[2] = type;
  bilan[3] = bouton;
  return bilan;
} // Fin fonction


/* ----------------------------- */
/* AFFICHER LES ERREURS */
/* ---------------------------------- */
function afficherErreurs(num_section){
  $.set("editeur");
  var saisi = $.get_valeur();
  $.set("solution");
  var attendu = $.get_texte();
  $.set("texte");
  var indice = $.get_valeur();

  // Sous-titre par défaut...
  var sous_titre = MSG_TEXTE_COMPLET;
  // Si on travaille sur une phrase...
  if (indice > 0){
    attendu = extrairePhrase(attendu, indice);
    sous_titre = MSG_PHRASE + indice + " :";
  }
  var correction = document.querySelector("#section_item" + num_section + " p");
  var reponse = comparerTextes(attendu, saisi);

  masquerLesSections();
  afficherSection("section_item" + num_section);
  // Affichage du message
  afficherMessage(reponse[1],reponse[2]);
  // Affichage du texte avec repérage des erreurs
  correction.innerHTML = "<em>" + sous_titre + "</em><br /><br />" + reponse[0];

  // Affichage du bouton
  var bouton = reponse[3];
  switch(bouton){
    case "G":
      definitActionBouton("G",fg,true);
    break;

    default:
      definitActionBouton("C",fc,true);
  }
} // Fin fonction

/* ------------------------------ */
/* Afficher solution              */
/* ------------------------------ */

function afficherSolution(){
  $.set("solution");
  var attendu = $.get_texte();
  $.set("texte");
  var indice = $.get_valeur();
  var sous_titre = "<em>" + MSG_TEXTE_COMPLET + "</em><br /><br />";
  if (indice > 0){
    attendu = extrairePhrase(attendu, indice);
    var sous_titre = "<em>" + MSG_PHRASE + indice + "</em><br /><br />";
  }
  // On rend dans l'affichage les éventuels sauts de ligne...
  var reg = new RegExp ( /\n/g );
  attendu =	attendu.replace(reg,"<br />");
  $.set("solution_affichee");
  $.set_html(sous_titre + attendu);
} // Fin fonction

/* ------------------------------ */
/* DIRE LA PONCTUATION */
/* ------------------------------ */
function direPonctuation(texte){
    var signes = new Array(".","!","?",";",":",",","…","«","»","—","(",")");
    var prononciations = new Array("POINT","POINT D'EXCLAMATION", "POINT D'INTERROGATION",
    "POINT-VIRGULE", "DEUX POINTS", "VIRGULE", "POINTS DE SUSPENSION", "OUVREZ LES GUILLEMETS",
    "FERMEZ LES GUILLEMETS", "TIRET CADRATIN","OUVREZ LA PARENTHÈSE","FERMEZ LA PARENTHÈSE");
    for (var i=0; i<(signes.length); ++i){
      texte = replaceAll(texte, signes[i], signes[i] + " [" + prononciations[i] + "] " );
    }
    // Retours à la ligne
    texte = replaceAll(texte, "\n"," [RETOUR À LA LIGNE]. ");
  return texte;
} // Fin fonction


/* ------------------------------------ */
/* ECOUTER LE TEXTE EN VOIX DE SYNTHESE */
/* ------------------------------------ */
function ecouterDictee(){
  $.set("solution");
  var texte = $.get_texte();
  $.set("texte");
  var indice = $.get_valeur();
  if (indice > 0){
    texte = extrairePhrase(texte, indice);
  }
  var ponctuation = document.getElementById("ponctuation").checked;
  ponctuation === true ? texte = direPonctuation(texte):true;
  var dictee = new SpeechSynthesisUtterance(texte);
  var voices = speechSynthesis.getVoices();
  $.set("ma_voix");
  var ma_voix = $.get_texte();

  if (ma_voix.length === 0){
    dictee.lang = "fr-FR";
  }else{
    dictee.voice = voices[ma_voix];
  }

  $.set("mon_debit");
  var rate = $.get_texte();
  dictee.rate = rate;
  dictee.pitch = 1.2;

  // Mise en pause...
  document.getElementById("pause").addEventListener("click", function(){
    speechSynthesis.pause();
    document.getElementById("lire").addEventListener("click", function(){
      speechSynthesis.resume();
    },false);
  });
  document.getElementById("fin").addEventListener("click", function(){
      speechSynthesis.cancel();
    },false);

  speechSynthesis.speak(dictee);

  dictee.addEventListener("end", function(){
    definitActionBouton("E",fe,true);
  },false);

} // Fin fonction

/* ------------------------------------ */
/* ECOUTER LE TEXTE EN VOIX ENREGISTREE */
/* ------------------------------------ */

function ecouterDicteeAudio(){
  $.set("solution");
  var texte = $.get_texte();
  $.set("texte");
  var indice = $.get_valeur();
  if (indice > 0){
    texte = extrairePhrase(texte, indice);
  }

  // Mise en pause...
  document.getElementById("pause_audio").addEventListener("click", function(){
    document.getElementById("lecteur_audio").pause();
    document.getElementById("lire_audio").addEventListener("click", function(){
      document.getElementById("lecteur_audio").play();
    },false);
  },false);
  document.getElementById("fin_audio").addEventListener("click", function(){
      document.getElementById("lecteur_audio").load();
      definitActionBouton("E",fe,true);
    },false);

  document.getElementById("lecteur_audio").play();
  document.getElementById("lecteur_audio").addEventListener("ended", function(){

    definitActionBouton("E",fe,true);
  },false);

} // Fin fonction


/* --------------------------------------- */
/* Gestionnaire réglage du débit de la voix */
/* --------------------------------------- */

function changeDebit(){
  document.getElementById("mon_debit").textContent = document.querySelector("input[name=debit]").value;
} // Fin fonction

/* ----------------------------------------------------------------------- */
// Mettre à jour la zone du sélecteur de phrase en fonction de la modalité.
// Si la modalité est "entrainement" : on affiche le lecteur pour toute la dictée.
// Sinon on affiche le sélecteur de phrase...
// VERSION AVEC VOIX DE SYNTHESE
/* ----------------------------------------------------------------------- */

/* ---------------------------------- */
function afficherSelecteur(){
  $.set("modalite_choisie");

  var modalite = $.get_texte();
  var numero = obtenirParametre("numero");

  switch(modalite){
    // ENTRAINEMENT VOIX DE SYNTHESE
    case "entrainement (voix de synthèse)":
      $.set("selecteur_phrase");
      $.set_texte("Toutes les phrases");

      $.set("texte");
      $.set_valeur(0);

      $.set("phrase");
      $.set_texte("Texte complet");

      $.set("info_saisie");
      $.set_texte("Texte complet :");

      afficherSolution();
      effacerEditeur();

      $.set("voix_enregistree");
      $.masquer();

      $.set("dictam");
      $.masquer();

      $.set("voix_de_synthese");
      $.montrer();
    break;

    // ENTRAINEMENT VOIX ENREGISTREE
    case "entrainement":
      $.set("selecteur_phrase");
      $.set_texte("Toutes les phrases");

      $.set("texte");
      $.set_valeur(0);

      $.set("phrase");
      $.set_texte("Texte complet");

      $.set("info_saisie");
      $.set_texte("Texte complet :");
      afficherSolution();
      effacerEditeur();

      if (numero) {
        loadData("data/clip" + numero + ".json", chargerAudioDictee);
      }

      $.set("voix_de_synthese");
      $.masquer();

      $.set("dictam");
      $.masquer();

      $.set("voix_enregistree");
      $.montrer();
    break;

    // DECOUVERTE VOIX DE SYNTHESE
    case "découverte (voix de synthèse)":

      $.set("solution");
      var texte = $.get_texte();
      var nombre = extrairePhrase(texte, 0);
      var selecteur = "";
      for (var i=1; i<(nombre+1); i++){
        selecteur += " | <a href=\"#\" class=\"phrase\" id=\"" + i + "\">" + i + "</a>";
      }
      selecteur += " |";

      $.set("selecteur_phrase");
      $.set_html(selecteur);

      for (var i=1; i<(nombre+1); i++){
        document.getElementById(i).addEventListener("click", function(){

          $.set("phrase");
          $.set_texte("Phrase " + this.id);

          $.set("info_saisie");
          $.set_texte("Phrase " + this.id);

          $.set("texte");
          $.set_valeur(this.id);
          afficherSolution();
          effacerEditeur();
        },false);

       $.set("phrase");
       $.set_texte("Phrase 1");

       $.set("texte");
       $.set_valeur(1);
       afficherSolution();
      }// fin de la boucle FOR

      $.set("dictam");
      $.masquer();

      $.set("voix_enregistree");
      $.masquer();

      $.set("voix_de_synthese");
      $.montrer();
    break;

    // DICTEE AMENAGEE
    case "dictée aménagée":
      $.set("selecteur_phrase");
      $.set_html(MSG_TXT_CM);

      $.set("texte");
      $.set_valeur(0);

      $.set("phrase");
      $.set_texte("Dictée aménagée");

      $.set("info_saisie");
      $.set_texte("Dictée aménagée :");
      afficherSolution();
      effacerEditeur();

      if (numero) {
        loadData("data/dictam" + numero + ".json", chargerDicteeAmenagee);
      }

      $.set("voix_de_synthese");
      $.masquer();

      $.set("voix_enregistree");
      $.masquer();

      $.set("dictam");
      $.montrer();
    break;

    // DECOUVERTE VOIX ENREGISTREE = PAR DEFAUT
    case "découverte":
    default:
      $.set("solution");
      var texte = $.get_texte();
      var nombre = extrairePhrase(texte, 0);
      var selecteur = "";
      for (var i=1; i<(nombre+1); i++){
        selecteur += " | <a href=\"#\" class=\"phrase\" id=\"" + i + "\">" + i + "</a>";
      }
      selecteur += " |";

      $.set("selecteur_phrase");
      $.set_html(selecteur);

      for (var i=1; i<(nombre+1); i++){
        document.getElementById(i).addEventListener("click", function(){

          $.set("phrase");
          $.set_texte("Phrase " + this.id);

          $.set("info_saisie");
          $.set_texte("Phrase " + this.id);

          $.set("texte");
          $.set_valeur(this.id);
          afficherSolution();
          effacerEditeur();

          if (numero) {
            loadData("data/clip" + numero + ".json", chargerAudioDictee);
          }
        },false);

       $.set("phrase");
       $.set_texte("Phrase 1");

       $.set("texte");
       $.set_valeur(1);
       afficherSolution();
       if (numero){
         loadData("data/clip" + obtenirParametre("numero") + ".json", chargerAudioDictee);
       }  // fin de IF
      }// fin de la boucle FOR

      $.set("voix_de_synthese");
      $.masquer();

      $.set("voix_enregistree");
      $.montrer();

  } // Fin du Switch
} // Fin de fonction

/* ------------------------------- */
/* Découper le texte en phases... */
/* ---------------------------------- */

function extrairePhrase(texte, indice){
  texte = texte.replace(/[!]\s/gum, "!*");
  texte = texte.replace(/[?]\s/gum, "?*");
  texte = texte.replace(/[.]\s/gum, ".*");

  var phrases = texte.split("*");
  var nombre = phrases.length;
  phrases.unshift(nombre);

  return phrases[indice];
} // Fin de fonction


/* ----------------------------------------------------------- */
/* Pour échapper les caractères spéciaux dans une recherche... */
/* ---------------------------------- */
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
} // Fin de fonction

/* ---------------------------------------- */
/* Pour remplacer toutes les occurrences... */
/* ---------------------------------- */
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
} // Fin de fonction



/* -------------------------------  */
/* Gestion des événements multiples */
/* -------------------------------  */

function addListenerMulti(element, liste_events, fonction) {
  liste_events.split(' ').forEach(function(e){
    element.addEventListener(e, fonction, false);
  });
} // Fin de fonction

/* ------------------------------ */
// Afficher AIDE et LICENCE
/* ------------------------------ */
function afficherAide(){
  masquerLesSections();
  masquerBoutonsAction();
  //definitActionBouton("G",fg, true);
  $.set("section_aide_licence");
  $.montrer();
} // Fin de fonction

/* ----------------------------------------*/
/* Pour replier tous les items de l'AIDE   */
/* --------------------------------------- */
function replierContenusAide() {
    var niveaux = new Array("1", "2", "3");
    niveaux.forEach(function(niveau){
      $.set("contenu_aide_" + niveau);
      $.masquer();
      $.set("aide_" + niveau);
      $.set_classe("replie");
    });
} // Fin de fonction

/* ---------------------------------- */
/* Déplier/replier un item de l'AIDE  */
/* ---------------------------------- */
function deplierReplierContenuAide(niv) {
  var item = document.getElementById("contenu_aide_" + niv);
  var parent = document.getElementById("aide_" + niv);
  if (item.style.display === "none"){
    item.style.display = "block";
    parent.className = "deplie";
  }else{
    item.style.display = "none";
    parent.className = "replie";
  }
} // Fin de fonction

/* ------------------------------ */
// AFFICHER / MASQUER LES ARTICLES
/* ------------------------------ */
function masquerLesArticles(){
  var articles = document.querySelectorAll("article");
  articles.forEach(function(art){
    art.style.display = 'none';
  })
} // Fin de fonction

/* ------------------------------ */
// AFFICHER UN ARTICLE
/* ------------------------------ */

function afficherArticle(article){
  masquerLesArticles();
  $.set("article_"+article);
  $.montrer();
} // Fin de fonction


/* ---------------------------------------  */
/* Afficher le lien de PARTAGE de la dictée */
/* ---------------------------------------- */

function afficherLienPartage(){

    var url = window.location.href;
    if(url.indexOf("localhost")===7 || url.indexOf("chrome-extension") ===0){
      erreur(5);
    }else{
      var numero = obtenirParametre("numero");
      url = url.replace("#","");
      url += "?numero=" + numero;
      $.set("lien");
      $.set_texte(url);
      $.set("section_partage");
      $.montrer();
    }
} // Fin de fonction

/* ---------------------------------- */
// Afficher la section de PARTAGE
/* ---------------------------------- */
function afficherPartage(){
  masquerLesSections();
  masquerBoutonsAction();
  //definitActionBouton("J", fj, true);
  if (atonChargeUneDictee()){
    afficherLienPartage();
  }else{
    erreur(1);
  }
} // Fin de fonction


/* ----------------------------------------- */
/* Gestion des ERREURS                       */
/* ----------------------------------------- */
function erreur(numero){
  var message = "Erreur " + numero + " - ";
  switch(numero){
    case 1:
      message += MSG_NUMERO_DICTEE;
    break;

    case 2:
      message += MSG_FIC_INCOMPATIBLE;
      message += " 'dictee" + obtenirParametre("numero") +".json'.";
    break;

    case 3:
      message += MSG_AUCUN_TEXTE;
    break;

    case 4:
      message += MSG_ERREUR_DECOUPAGE;
    break;

    case 5:
      message += MSG_ERREUR_PARTAGE;
    break;

    case 6:
      message += MSG_ERREUR_SOMMAIRE;
    break;

    default:
      message = MSG_ERREUR_INCONNUE + numero;
  }
afficherMessage(message, "erreur");
} // Fin de fonction
