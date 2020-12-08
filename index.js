const APIURL = "http://localhost:3000/api/cameras/";

let idCam = "";

// Récupération des données de l'Api

getCam = () =>{
	return new Promise((resolve) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
      if(this.readyState == XMLHttpRequest.DONE && this.status == 200 &&
         this.status < 400) {
				resolve(JSON.parse(this.responseText));
				console.log("Connecté");
	
			}else{
				console.log("Echec de connexion avec l'API");
			}
		}
		request.open("GET", APIURL + idCam);
		request.send();
	});
};

//Création index.html


	async function allCamList(){
		const appareils = await getCam();

	
		let listOfCam = document.createElement("section")
		listOfCam.setAttribute("class", "list-product");
		
		let box = document.getElementById("box");
		box.appendChild(listOfCam);

		//Pour chaque produit de l'API on créé l'encadré HTML du produit
		appareils.forEach((produit) =>
		{ 
      	//création des élements de la structure de la liste des produits en vente
      	//Une div conteneur/2 div(block gauche et droit)/une image/le nom(titre)/le prix(p)/le lien(a)
      	let produitBlock = document.createElement("div");
      	let produitLeft = document.createElement("div");
        let produitRight = document.createElement("div");
        let produitLastBox = document.createElement("div");
      	let produitImage = document.createElement("img");
        let produitNom = document.createElement("h4");
        let produitDescription = document.createElement("p")
        let produitPrix = document.createElement("p");
        let produitButton = document.createElement("button");
      	let produitLink = document.createElement("a");

        //Ajout des attributs au balise pour la création du style via le css
        
        produitLastBox.setAttribute("class","produit_last_box");
      	produitBlock.setAttribute("class", "list-product__block");
      	produitLeft.setAttribute("class", "list-product__block--left");
        produitRight.setAttribute("class", "list-product__block--right");
        produitDescription.setAttribute("class", "description_produit");
      	produitImage.setAttribute("src", produit.imageUrl);
      	produitImage.setAttribute("alt", "image du produit"); 
      	produitLink.setAttribute("href", "product.html?id=" + produit._id);

     	//Block conteneur en flex
      	//Block gauche comprend l'image du produit
     	//Bloc droit comprend le nom/prix/le lien du produit
     	listOfCam.appendChild(produitBlock);
     	produitBlock.appendChild(produitLeft);
     	produitLeft.appendChild(produitImage);
      produitBlock.appendChild(produitRight);
      produitBlock.appendChild(produitLastBox); 
     	produitRight.appendChild(produitNom);
      produitRight.appendChild(produitDescription);
      produitLastBox.appendChild(produitPrix);
      produitLastBox.appendChild(produitButton);
      produitButton.appendChild(produitLink)

      	//Déterminer le contenu des balises
        produitNom.textContent = produit.name;
        produitDescription.textContent = produit.description;
      	produitPrix.textContent = produit.price / 100 + " €";
      	produitLink.textContent = "Voir le produit";
      });
	};

// Création produit.html


async function detailProduit(){
  //Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
  idCam = location.search.substring(4);
  const camSelect = await getCam();
  console.log("Page produit de"+ camSelect._id);

  //Faire apparaitre la fiche produit initialement en display none
  let section = document.getElementById("section");
  section.style.display = "block";
  
  //Remplissage de la fiche produit
  document.getElementById("imgProduct").setAttribute("src",camSelect.imageUrl);
  document.getElementById("nameProduct").innerHTML = camSelect.name;
  document.getElementById("descriptionProduct").innerHTML = camSelect.description;
  document.getElementById("priceProduct").innerHTML = camSelect.price / 100 + " euros";

  
  //Selon le type de produit (ligne 3) création des options
  camSelect.lenses.forEach((produit)=>{
      let optionProduit = document.createElement("option");
      document.getElementById("optionSelect").appendChild(optionProduit).innerHTML = produit;
    });
  }
;

 //Fonction ajouter le produit au panier de l'utilisateur

addPanier = () =>{
  //Au clic de l'user pour mettre le produit dans le panier
  let inputBuy = document.getElementById("ajouterProduitPanier");
  inputBuy.addEventListener("click", async function() {
    const produits = await getCam();
  //Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
  panierUtilisateur.push(produits);
  localStorage.setItem("panier utilisateur", JSON.stringify(panierUtilisateur));
  console.log(" le produit a été ajouté au panier");
  alert("Produit ajouté au panier")
  window.location.reload()
});
};

// Création local storage


/*L'utilisateur à besoin d'un panier dans le localStorage de son navigateur
Vérifier si le panier existe dans le localStorage, sinon le créer et l'envoyer dans le localStorage au premier chargement du site quelque soit la page*/

if(localStorage.getItem("panier utilisateur")){
	console.log("Récupération du panier existant");
}else{
	console.log("Création du panier");
  	//Le panier est un tableau de produits
  	let createPanier = [];
  	localStorage.setItem("panier utilisateur", JSON.stringify(createPanier));
  };

  	//Tableau et objet demandé par l'API pour la commande
  	let contact;
  	let products = [];

	//L'user a maintenant un panier
  	
    let panierUtilisateur = JSON.parse(localStorage.getItem("panier utilisateur"));

// Création panier.html


ajouter = () =>{
  //Vérifie si un prduit est dans le panier
  if(JSON.parse(localStorage.getItem("panier utilisateur")).length > 0){
    //S'il n'est pas vide on supprime le message et on créé le tableau récapitulatif
    document.getElementById("panierVide").remove();

    //Création de la structure principale du tableau  
    let facture = document.createElement("table");
    let ligneTableau = document.createElement("tr");
    let colonneNom = document.createElement("th");
    let colonnePrixUnitaire = document.createElement("th");
    let colonneRemove = document.createElement("th");
    let ligneTotal = document.createElement("tr");
    let colonneRefTotal = document.createElement("th");
    let colonnePrixPaye = document.createElement("td");

    //Placement de la structure dans la page et du contenu des entetes
    let factureSection = document.getElementById("basket-resume");
    factureSection.appendChild(facture);
    facture.appendChild(ligneTableau);
    ligneTableau.appendChild(colonneNom);
    colonneNom.textContent = "Nom du produit";
    ligneTableau.appendChild(colonnePrixUnitaire);
    colonnePrixUnitaire.textContent = "Prix du produit";
    ligneTableau.appendChild(colonneRemove);
    colonneRemove.textContent = "Annuler un produit";
    

    //Pour chaque produit du panier, on créé une ligne avec le nom, le prix
    
    //Init de l'incrémentation de l'id des lignes pour chaque produit
    let i = 0;
    
    JSON.parse(localStorage.getItem("panier utilisateur")).forEach((produit)=>{
      //Création de la ligne
      let ligneProduit = document.createElement("tr");
      let nomProduit = document.createElement("td");
      let prixUnitProduit = document.createElement("td");
      let removeProduit = document.createElement("i");

      //Attribution des class pour le css
      ligneProduit.setAttribute("id", "produit"+i);
      removeProduit.setAttribute("id", "remove"+i);
      removeProduit.setAttribute('class', "fas fa-trash-alt annulerProduit");
      //Pour chaque produit on créer un event sur l'icone de la corbeille pour annuler ce produit
      //bind permet de garder l'incrementation du i qui représente l'index tu panier au moment de la création de l'event
      //annulerProduit L233
      removeProduit.addEventListener('click', annulerProduit.bind(i));
      i++;

      //Insertion dans le HTML
      facture.appendChild(ligneProduit);
      ligneProduit.appendChild(nomProduit);
      ligneProduit.appendChild(prixUnitProduit);
      ligneProduit.appendChild(removeProduit);

      //Contenu des lignes
      nomProduit.innerHTML = produit.name;
      prixUnitProduit.textContent = produit.price / 100 + " €";
  });

    //Dernière ligne du tableau : Total
    facture.appendChild(ligneTotal);
    ligneTotal.appendChild(colonneRefTotal);
    colonneRefTotal.textContent = "Total à payer"
    ligneTotal.appendChild(colonnePrixPaye);
    colonnePrixPaye.setAttribute("id", "sommeTotal")

    //Calcule de l'addition total
    let totalPaye = 0;
    JSON.parse(localStorage.getItem("panier utilisateur")).forEach((produit)=>{
      totalPaye += produit.price / 100;
    });

    //Affichage du prix total à payer dans l'addition
    console.log("" + totalPaye);
    document.getElementById("sommeTotal").textContent = totalPaye + " €";
};
}

//Supprimer un produit du panier
annulerProduit = (i) => {
  console.log("Enlever le produit à l'index " + i);
    //recupérer le array
    panierUtilisateur.splice(i, 1); 
    console.log(panierUtilisateur);
    //vide le localstorage
    localStorage.clear();
    console.log("localStorage supprimé");
    // mettre à jour le localStorage avec le nouveau panier
    localStorage.setItem('panier utilisateur', JSON.stringify( panierUtilisateur));
    console.log("localStorage mis à jour");
    //relancer la création de l'addition
    window.location.reload();  
};

//Formulaire et vérif etat panier


//vérifie les inputs du formulaire
checkInput = () =>{
  //Controle Regex
  let checkString = /[a-zA-Z]/;
  let checkNumber = /[0-9]/;
  let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
  let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

  //message fin de controle
  let checkMessage = "";

  //Récupération des inputs
  let formNom = document.getElementById("formNom").value;
  let formPrenom = document.getElementById("formPrenom").value;
  let formMail = document.getElementById("formMail").value;
  let formAdresse = document.getElementById("formAdresse").value;
  let formVille = document.getElementById("formVille").value;


    //tests des différents input du formulaire
      //Test du nom => aucun chiffre ou charactère spécial permis
      if(checkNumber.test(formNom) == true || checkSpecialCharacter.test(formNom) == true || formNom == ""){
        checkMessage = "Indiquer votre nom";
      }else{
        console.log("Administration : Nom ok");
      };
      //Test du nom => aucun chiffre ou charactère spécial permis
      if(checkNumber.test(formPrenom) == true || checkSpecialCharacter.test(formPrenom) == true || formPrenom == ""){
        checkMessage = checkMessage + "\n" + "Indiquer votre prénom";
      }else{
        console.log("Administration : Prénom ok");
      };
      //Test du mail selon le regex de la source L256
      if(checkMail.test(formMail) == false){
        checkMessage = checkMessage + "\n" + "Indiquer votre email";
      }else{
        console.log("Adresse mail correct");
      };
      //Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux
      if(checkSpecialCharacter.test(formAdresse) == true || formAdresse == ""){
        checkMessage = checkMessage + "\n" + "Indiquer votre adresse";
      }else{
        console.log("Adresse correcte");
      };
      //Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux
      if(checkSpecialCharacter.test(formVille) == true && checkNumber.test(formVille) == true || formVille == ""){
        checkMessage = checkMessage + "\n" + "Indiquer votre ville"
      }else{
        console.log("Ville correcte")
      };
      //Si un des champs n'est pas bon => message d'alert avec la raison
      if(checkMessage != ""){
        alert("Il est nécessaire de :" + "\n" + checkMessage);
      }
      //Si tout est ok construction de l'objet contact => a revoir
      else{
        contact = {
          firstName : formNom,
          lastName : formPrenom,
          address : formAdresse,
          city : formVille,
          email : formMail
        };
        return contact;
      };
  };

//Vérification du panier
checkPanier = () =>{
//Vérifier qu'il y ai au moins un produit dans le panier
let etatPanier = JSON.parse(localStorage.getItem("panier utilisateur"));
//Si le panier est vide ou null (suppression localStorage par)=>alerte
if(etatPanier == null){
//Si l'utilisateur à supprimer son localStorage etatPanier sur la page basket.html et qu'il continue le process de commande
alert("Il y a eu un problème avec votre panier, une action non autorisée a été faite. Veuillez recharger la page pour la corriger");
return false
}else if(etatPanier.length < 1 || etatPanier == null){
console.log("Administration: ERROR =>le localStorage ne contient pas de panier")
alert("Votre panier est vide");
return false;
}else{
console.log("Administration : Le panier n'est pas vide")
  //Si le panier n'est pas vide on rempli le products envoyé à l'API
  JSON.parse(localStorage.getItem("panier utilisateur")).forEach((produit) =>{
    products.push(produit._id);
  });
  console.log("Administration : Ce tableau sera envoyé à l'API : " + products)
  return true;
}
};

//Envoi du formulaire


//Fonction requet post de l'API
envoiDonnees = (objetRequest) => {
  return new Promise((resolve)=>{
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(this.readyState == XMLHttpRequest.DONE && this.status == 201) 
      {
        //Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans confirm.html
        sessionStorage.setItem("order", this.responseText);

        //Chargement de la page de confirmation
        document.forms["panier"].action = './confirm.html';
        document.forms["panier"].submit();

        resolve(JSON.parse(this.responseText));
    }
};
request.open("POST", APIURL + "order");
request.setRequestHeader("Content-Type", "application/json");
request.send(objetRequest);
});
};

//Au click sur le btn de validation du formulaire
validForm = () =>{
  //Ecoute de l'event click du formulaire
  let btnForm = document.getElementById("envoiPost");
  btnForm.addEventListener("click", function(){
    //Lancement des verifications du panier et du form => si Ok envoi
    if(checkPanier() == true && checkInput() != null){
      console.log("Administration : L'envoi peut etre fait");
    //Création de l'objet à envoyer
    let objet = {
      contact,
      products
    };
    console.log("Administration : " + objet);
   //Conversion en JSON
   let objetRequest = JSON.stringify(objet);
   console.log("Administration : " + objetRequest);
   //Envoi de l'objet via la function
   envoiDonnees(objetRequest);

   //Une fois la commande faite retour à l'état initial des tableaux/objet/localStorage
   contact = {};
   products = [];
   localStorage.clear();
}else{
 console.log("Erreur");
};
});
};

//Affichage des informations sur la page de confirmation

resultOrder = () =>{
if(sessionStorage.getItem("order") != null){
  //Parse du session storage
  let order = JSON.parse(sessionStorage.getItem("order"));
  //Implatation de prénom et de id de commande dans le html sur la page de confirmation
  document.getElementById("lastName").innerHTML = order.contact.lastName
  document.getElementById("orderId").innerHTML = order.orderId
  
  //Suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
  sessionStorage.removeItem("order");
}else{
//avertissement et redirection vers l'accueil
alert("Erreur: Vous n'avez pas encore passé commande");
window.open("./index.html");
}
}

//Affichage du nombre d'article dans le panier
function nombreArticlePanier() {
  let indexPanier = document.getElementById("indexPanier");
  indexPanier.textContent = panierUtilisateur.length;
}


//-----PANIER----------//

//Panier de l'utilisateur
let panier = JSON.parse(localStorage.getItem("panier"));

//Affichage du nombre d'article dans le panier
function nombreIndexPanier() {
  let indexPanier = document.getElementById("indexPanier");
  indexPanier.textContent = panier.length;
}

function nombreProduitPanier() {
  let produitPanier = document.getElementById("produitPanier");
  produitPanier.textContent = panier.length;
}

//Vérification et initialisation du panier

if (localStorage.getItem("panier")) {
  console.log(panier);
} else {
  console.log("Le panier va être initalisé");
  let panierInit = [];
  localStorage.setItem("panier", JSON.stringify(panierInit));
}

//Ajout de l'article au panier de l'utilisateur

ajoutPanier = () => {
  let acheter = document.getElementById("ajout_panier");
  acheter.addEventListener("click", async function () {
    const ajout = await getCam();
    panier.push(ajout);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Le produit a été ajouté au panier");
    alert("Cet article a été ajouté dans votre panier");
    location.reload();
  });
};

//------Page Panier-------//

panierCreation = () => {
  if (panier.length > 0) {
    document.getElementById("panierVide").remove();

    //Création de la structure du tableau récapitulatif
    let recap = document.createElement("table");
    let ligneTableau = document.createElement("tr");
    let recapPhoto = document.createElement("th");
    let recapNom = document.createElement("th");
    let recapPrixUnitaire = document.createElement("th");
    let recapRemove = document.createElement("th");
    let ligneTotal = document.createElement("tr");
    let colonneTotal = document.createElement("th");
    let recapPrixPaye = document.createElement("td");

    //Placement de la structure dans la page
    let recapPanier = document.getElementById("panier-recap");
    recapPanier.appendChild(recap);
    recap.appendChild(ligneTableau);
    ligneTableau.appendChild(recapPhoto);
    ligneTableau.appendChild(recapNom);
    ligneTableau.appendChild(recapPrixUnitaire);
    ligneTableau.appendChild(recapRemove);

    //contenu des entetes
    recapPhoto.textContent = "Article";
    recapNom.textContent = "Nom";
    recapPrixUnitaire.textContent = "Prix";
    recapRemove.textContent = "Annuler ?";

  
    
 //Boucle FOR pour affichage des articles dans le panier
     
    for (let i = 0; i<panier.length; i++) {
    
      //Création des lignes du tableau

      let ligneArticle = document.createElement("tr");
      let photoArticle = document.createElement("img");
      let nomArticle = document.createElement("td");
      let prixUnitArticle = document.createElement("td");
      let supprimerArticle = document.createElement("td");
      let removeArticle = document.createElement("i");

      //Attribution des class ou Id
      ligneArticle.setAttribute("id", "article" + [i]);
      photoArticle.setAttribute("class", "photo_article");
      photoArticle.setAttribute("src", panier[i].imageUrl);
      photoArticle.setAttribute("alt", "Photo de l'article commandé");
      removeArticle.setAttribute("id", "remove" + [i]);
      removeArticle.setAttribute("class", "fas fa-times-circle fa-1x");
      removeArticle.setAttribute("title", "Supprimer article ?");

      console.log(i);
      
      


//Supprimer un produit du panier
   removeArticle.addEventListener("click", (event) => {this.annulerArticle(i);})
   
        
      

      //Agencement de la structure HTML
      recap.appendChild(ligneArticle);
      ligneArticle.appendChild(photoArticle);
      ligneArticle.appendChild(nomArticle);
      ligneArticle.appendChild(prixUnitArticle);
      ligneArticle.appendChild(supprimerArticle);
      supprimerArticle.appendChild(removeArticle);

      //Contenu de chaque ligne

      nomArticle.textContent = panier[i].name;
      prixUnitArticle.textContent = panier[i].price / 100 + " €";
      console.log(panier[i].name);
      

    };


    //Dernière ligne du tableau : Total
    recap.appendChild(ligneTotal);
    ligneTotal.appendChild(colonneTotal);
    ligneTotal.setAttribute("id", "ligneSomme");
    colonneTotal.textContent = "Total à payer";
    ligneTotal.appendChild(recapPrixPaye);

    recapPrixPaye.setAttribute("id", "sommeTotal");
    recapPrixPaye.setAttribute("colspan", "4");
    colonneTotal.setAttribute("id", "colonneTotal");
    colonneTotal.setAttribute("colspan", "2");

    //Calcule de l'addition total
    let sommeTotal = 0;
    panier.forEach((panier) => {
      sommeTotal += panier.price / 100;
    });

    //Affichage du prix total à payer dans l'addition
    console.log(sommeTotal);
    document.getElementById("sommeTotal").textContent = sommeTotal + " €";
  }
};



annulerArticle = (i) => {
 panier.splice(i, 1);
  localStorage.clear();
  // Mise à jour du nouveau panier avec suppression de l'article
  localStorage.setItem("panier", JSON.stringify(panier));
  //Mise à jour de la page pour affichage de la suppression au client
  window.location.reload();
};  

//---------------------------FORMULAIRE----------------//

//vérifie les inputs du formulaire
checkInput = () => {
  //Controle Regex
  let checkNumber = /[0-9]/;
  let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

  //message fin de controle
  let checkMessage = "";

  //Récupération des inputs

  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let adresse = document.getElementById("adresse").value;
  let ville = document.getElementById("ville").value;

  //tests des différents input du formulaire
  //Test du nom
  if (
    checkNumber.test(nom) == true ||
    checkSpecialCharacter.test(nom) == true ||
    nom == ""
  ) {
    checkMessage = "Veuillez vérifier les informations concernant votre nom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Nom accepté");
  }
  //Test du prénom
  if (
    checkNumber.test(prenom) == true ||
    checkSpecialCharacter.test(prenom) == true ||
    prenom == ""
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre prénom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Prénom accepté");
  }
  //Test du mail
  if (checkMail.test(email) == false) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre email. Les caractères spéciaux ne sont pas autorisés";
  } else {
    console.log("Adresse mail acceptée");
  }
  //Test de l'adresse
  if (checkSpecialCharacter.test(adresse) == true || adresse == "") {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre adresse postale. Les caractères spéciaux ne sont pas autorisés";
  } else {
    console.log(" Adresse postale acceptée");
  }
  //Test de la ville
  if (
    (checkSpecialCharacter.test(ville) == true ||
      checkNumber.test(ville) == true) ||
    ville == ""
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre ville. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Ville acceptée");
  }
  //Si un des champs n'est pas conforme => message d'alert avec la raison
  if (checkMessage != "") {
    alert("Attention certaines données ne sont pas conformes :" + "\n" + checkMessage);
  }
  //Si le formulaire est validé => construction de l'objet contact
  else {
    contact = {
      lastName: nom,
      firstName: prenom,
      address: adresse,
      city: ville,
      email: email,
    };
    return contact;
  }
};

//Vérification du panier
checkPanier = () => {
  //Vérifier qu'il y ai au moins un produit dans le panier
  let etatPanier = JSON.parse(localStorage.getItem("panier"));
  //Si le panier est vide ou null
  if  (etatPanier.length < 1 || etatPanier == null) {
    alert("Votre panier est vide");
    return false;
  } else {
    console.log("Le panier n'est pas vide");
    return true;
  }
};