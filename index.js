const APIURL = "http://localhost:3000/api/cameras/";

let idCam = "";

// Récupération des données de l'Api

getAllCameras = () =>{
	return new Promise((resolve) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
      if(this.readyState == XMLHttpRequest.DONE && this.status == 200 &&
         this.status < 400) {
				resolve(JSON.parse(this.responseText));
				console.log("Connecté");
	
			}else{
				console.log("En attente de connexion avec l'api");
			}
		}
		request.open("GET", APIURL + idCam);
		request.send();
	});
};

// Création index.html

	async function allCamList(){
		const cameras = await getAllCameras();

		let listOfCam = document.createElement("section")
		listOfCam.setAttribute("class", "liste_articles");
		
		let box = document.getElementById("box");
		box.appendChild(listOfCam);

		
		cameras.forEach((appareilPhoto) => { 

// Création des balises sémantiques de la liste
      	
    let appareilBox = document.createElement("section");
    let boxPhoto = document.createElement("div");
    let boxDescription = document.createElement("div");
    let produitLastBox = document.createElement("div");
    let boxImage = document.createElement("img");
    let boxNom = document.createElement("h4");
    let produitDescription = document.createElement("p")
    let boxPrix = document.createElement("p");
    let produitButton = document.createElement("button");
    let boxLien = document.createElement("a");

// Création des classes
        
    produitLastBox.setAttribute("class","produit_last_box");
    appareilBox.setAttribute("class", "appareil_box");
    boxPhoto.setAttribute("class", "box_photo");
    boxPrix.setAttribute("class", "prix");
    boxDescription.setAttribute("class", "appareil_box--bloc_description");
    produitDescription.setAttribute("class", "description_produit");
    boxImage.setAttribute("src", appareilPhoto.imageUrl); // Récupère l'Url de l'image
    boxImage.setAttribute("alt", "image de l'appareil photo"); 
    produitButton.setAttribute("class", "btn_index"),
    boxLien.setAttribute("href", "product.html?id=" + appareilPhoto._id); // Envoi vers produit.html du produit séléctionné
    boxLien.setAttribute("class","lien_btn");
    
    listOfCam.appendChild(appareilBox);
    appareilBox.appendChild(boxPhoto); 
    boxPhoto.appendChild(boxImage);
    appareilBox.appendChild(boxDescription) 
    appareilBox.appendChild(produitLastBox); 
    boxDescription.appendChild(boxNom);
    boxDescription.appendChild(produitDescription);
    produitLastBox.appendChild(boxPrix);
    produitLastBox.appendChild(produitButton);
    produitButton.appendChild(boxLien);

// Création du contenu

    boxNom.textContent = appareilPhoto.name;
    produitDescription.textContent = appareilPhoto.description;
    boxPrix.textContent = appareilPhoto.price / 100 + " €";
    boxLien.textContent = "Voir l'article";
  });
};

// Création produit.html

async function appareilDescriptif(){

// Supprimer "?id=" dans la requête

    idCam = location.search.substring(4);
    const camSelect = await getAllCameras();
    console.log("Page produit de"+ camSelect._id);

    let descriptif = document.getElementById("section");
  
// Création de la fiche descriptive de l'appareil

    document.getElementById("image_de_l'appareil").setAttribute("src",camSelect.imageUrl);
    document.getElementById("nom_de_l'appareil").innerHTML = camSelect.name;
    document.getElementById("description_de_l'appareil").innerHTML = camSelect.description;
    document.getElementById("prix_de_l'appareil").innerHTML = camSelect.price / 100 + " euros";


  camSelect.lenses.forEach((appareilPhoto)=>{
      let optionAppareil = document.createElement("option");
      document.getElementById("option_appareil").appendChild(optionAppareil).innerHTML = appareilPhoto;
  });
};

// Ajouter un produit au panier
  	
    let panierUtilisateur = JSON.parse(localStorage.getItem("panier utilisateur"));

// Affichage du nombre d'article dans le panier

  function nombreArticlePanier() {
    let indexPanier = document.getElementById("indexPanier");
    indexPanier.textContent = panierUtilisateur.length;
}

// Création local storage

// Création du panier au premier chargement si inexistant

  if(localStorage.getItem("panier utilisateur")){
	  console.log(panierUtilisateur);
  }else{
	  console.log("Création du panier");
  	let createPanier = [];
  	localStorage.setItem("panier utilisateur", JSON.stringify(createPanier));
  };

  ajoutPanier = () =>{
 
    let ajoutPanier = document.getElementById("ajouterProduitPanier");
    ajoutPanier.addEventListener("click", async function() {
    const produits = await getAllCameras();

// Récupération du panier dans le localStorage et ajout produits

    panierUtilisateur.push(produits);
    localStorage.setItem("panier utilisateur", JSON.stringify(panierUtilisateur));
    console.log("Le produit a été ajouté au panier");
    alert("Produit ajouté au panier")
    location.reload()
  });
};

// Création panier.html

//Ajout de l'article au panier de l'utilisateur

ajouter = () => {

  if(panierUtilisateur.length > 0){

// Si le panier contient un article on efface le message

    document.getElementById("pas_de_panier").remove(); 

//Création de la structure principale du tableau 

    let boxTableau = document.createElement("div");
    let tableauPanier = document.createElement("table");  
    let lignePanier = document.createElement("tr");
    let boxImagePanier = document.createElement("th");
    let nomPanier = document.createElement("th");
    let prixArticlePanier = document.createElement("th");
    let totalPanier = document.createElement("tr");
    let taxePanier = document.createElement("td");
    let colonneTotalPanier = document.createElement("th");
    let totalPrixPanier = document.createElement("td");
    
// Placement des élements

    let blocPanier = document.getElementById("panier_utilisateur");
    blocPanier.appendChild(boxTableau)
    boxTableau.appendChild(tableauPanier);
    tableauPanier.appendChild(lignePanier);
    lignePanier.appendChild(boxImagePanier);
    lignePanier.appendChild(nomPanier);
    lignePanier.appendChild(prixArticlePanier);
      
    boxImagePanier.textContent ="Image de l'article";
    nomPanier.textContent = "Nom de l'article";
    prixArticlePanier.textContent = "Prix de l'article";
   
//Incrémentation de l'id des lignes pour chaque produit

  for (let i = 0; i < panierUtilisateur.length; i++) {
         
    let ligneArticlePanier = document.createElement("tr");
    let ligneBoxImage = document.createElement("td");
    let ligneImage = document.createElement("img");
    let ligneNomArticle = document.createElement("td");
    let lignePrixArticle = document.createElement("td");
    let supprimerArticle = document.createElement("button");
    let petitBtnSupprimer = document.createElement("button");
    
    boxTableau.setAttribute("class", "box_tableau");
    ligneArticlePanier.setAttribute("id", "produit"+[i]);
    supprimerArticle.setAttribute("id", "remove"+[i]);
    supprimerArticle.setAttribute('class', "button_supprimer");
    supprimerArticle.textContent = "Supprimer";
    petitBtnSupprimer.setAttribute("class","petit_btn_supprimer");
    
    supprimerArticle.addEventListener("click", (event) => {this.annulerProduit(i);})

    // Création d'une icône de suppression pour les très petits écrans

    petitBtnSupprimer.addEventListener("click", (event) => {this.annulerProduit(i);}) 
     
    tableauPanier.appendChild(ligneArticlePanier);
    ligneArticlePanier.appendChild(ligneBoxImage);
    ligneBoxImage.appendChild(ligneImage);
    ligneArticlePanier.appendChild(ligneNomArticle);
    ligneArticlePanier.appendChild(lignePrixArticle);
    ligneArticlePanier.appendChild(supprimerArticle);
    ligneArticlePanier.appendChild(petitBtnSupprimer);
    
    ligneImage.setAttribute("class", "image_produit_panier")
    ligneImage.setAttribute("src",panierUtilisateur[i].imageUrl);
    ligneImage.setAttribute("alt", "image du produit dans le panier")
    ligneNomArticle.innerHTML = panierUtilisateur[i].name;
    lignePrixArticle.textContent = panierUtilisateur[i].price / 100 + " €";
    console.log(panierUtilisateur[i].name);
};

// Total

    tableauPanier.appendChild(totalPanier);
    totalPanier.appendChild(colonneTotalPanier);
    colonneTotalPanier.textContent = "Total";
    totalPanier.appendChild(taxePanier);
    taxePanier.textContent = " TTC";
    totalPanier.appendChild(totalPrixPanier);
    taxePanier.setAttribute("id", "tva");
    totalPrixPanier.setAttribute("id", "montant_total");

// Montant total

    let MontantTotal = 0;
    panierUtilisateur.forEach((panierUtilisateur)=>{
    MontantTotal += panierUtilisateur.price / 100;
});   
    console.log(MontantTotal);
    document.getElementById("montant_total").textContent = MontantTotal + " €";
  };
}

// Supprimer un produit du panier

  annulerProduit = (i) => {
    console.log("Enlever le produit à l'index " + i);
    panierUtilisateur.splice(i, 1); 
    console.log(panierUtilisateur);
    localStorage.clear();
    console.log("localStorage supprimé");
    localStorage.setItem('panier utilisateur', JSON.stringify(panierUtilisateur));
    console.log("localStorage mis à jour");
    window.location.reload();  
};

// Vérification des données saisies par l'utilisateur dans le formulaire 

verifSaisies = () =>{
  //Controle Regex
    let verifNombre = /[0-9]/;
    let verifEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
    let verifSymbole = /[§!@#$%^&*(),.?":{}|<>]/;

//message fin de controle
    let verifMessage = "";

// Récupération des données

    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let adresse = document.getElementById("adresse").value;
    let ville = document.getElementById("ville").value;

// Test Formulaire
        
  if(verifNombre.test(nom) == true || verifSymbole.test(nom) == true || nom == ""){
    verifMessage = verifMessage + "\n" + "Veuillez entrer un nom valide"
  }else{
    console.log("nom validé");
    
  };
// Nom => aucun chiffre ou charactère spécial permis
  if(verifNombre.test(prenom) == true || verifSymbole.test(prenom) == true || prenom == ""){
  	verifMessage = verifMessage + "\n" + "Veuillez entrer un prénom valide"
  }else{
    console.log("Prénom validé");
        };
//  Email 
  if(verifEmail.test(email) == false){
    verifMessage = verifMessage + "\n" + "Veuillez entrer une adresse email valide"
  }else{
    console.log("Adresse mail validée");
  };
// Adresse
  if(verifNombre.test(adresse) == true || verifSymbole.test(adresse)|| adresse == ""){
    verifMessage = verifMessage + "\n" + "Veuillez entrer une adresse valide"
  }else{
    console.log("Adresse validée");
  };
// Ville 
  if(verifNombre.test(ville) == true || verifSymbole.test(ville) == true || ville == ""){
    verifMessage = verifMessage + "\n" + "Veuillez entrer une ville existante"
  }else{
    console.log("Localisation validée")
  };
      //Si un des champs n'est pas bon => message d'alert avec la raison
   if(verifMessage != ""){
  	alert("Il est nécessaire de :" + "\n" + verifMessage);
  }

  else {
    contact = {
    firstName : nom,
    lastName : prenom,
    address : adresse,
    city: ville,
    email : email,
  };

  return contact;
  };
};
   
//Vérification du panier

verifPanier = () =>{
  
// Le panier ne doit pas être vide

    let statusPanier = JSON.parse(localStorage.getItem("panier utilisateur"));
  if(statusPanier.length <1 || statusPanier == null) {
    console.log("Erreur: le localStorage ne contient pas de panier")
    alert("Votre panier est vide");
  return false;
  }else{
    console.log("Le panier est rempli")
  return true;
  }
};

//Envoi du formulaire

//Tableau et objet pour l'API

  	let contact;
    let products = [];
    let formUrl = "http://localhost:3000/api/cameras/order";

// Requête post vers l'API

    const envoiFormulaire = (sendForm, formUrl) => {
  return new Promise((resolve)=>{
  	let request = new XMLHttpRequest();
  	request.onload = function() {
  if(this.readyState == XMLHttpRequest.DONE && this.status == 201) {

//Sauvegarde du retour de l'API dans la session Storage pour affichage dans confirm.html

    sessionStorage.setItem("order", this.responseText);

//Chargement de la page de confirmation
    window.location = "./confirm.html";
        
    resolve(JSON.parse(this.responseText));
    console.log(sendForm);
  }else{ 
           
      }
  };
  request.open("POST", formUrl);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(sendForm);
  console.log(sendForm);
  });
};

// Envoi du Formulaire 

  envoiFormulaireApi = () =>{

    let envoyer = document.getElementById("form_user");
    envoyer.addEventListener("submit", (event) => {
    event.preventDefault()

// Envoi du formulaire après vérification

  if(verifPanier() == true && verifSaisies() != null){
    console.log("Vérification réussie");
    panierUtilisateur.forEach((article) => {
    products.push(article._id);
  });
    console.log(" le tableau sera envoyé à l'API : " + products);
        
//Création de l'objet à envoyer

    let commande = {
        contact,
      	products,
      };

    let sendForm = JSON.stringify(commande);

  envoiFormulaire(sendForm,formUrl);
      console.log(commande);
     
// Une fois la commande passée, on vide le Local Storage

    contact = {};
    products = [];
    localStorage.clear();
 }else{
 	console.log("Erreur");
 };
});
};

//Affichage des informations sur la page de confirmation

confirmation = () =>{
	if(sessionStorage.getItem("order") != null){
    
    let order = JSON.parse(sessionStorage.getItem("order"));
    
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("orderId").innerHTML = order.orderId;
    
    console.log(order);
    sessionStorage.removeItem("order");
  }else{
 
  alert("Merci pour votre commande");
  window.location("./index.html");
  }
};

//------Tableau de recap de la commande dans la page de confirmation------//

tableauFacture = () => {
  //Création de la structure du tableau récapitulatif
    let tableauFacture = document.createElement("table");
    let lignTableauFacture = document.createElement("tr");
    let tableauFacturePhoto = document.createElement("th");
    let tableauFactureId = document.createElement("th");
    let tableauFacturePrix = document.createElement("th");
    let lignetableauTotal = document.createElement("tr");
    let colonnetableauTotal = document.createElement("th");
    let ligneTVA = document.createElement("td");
    let tableauTotal = document.createElement("td");

//Placement de la structure dans la page

    let confirmPanier = document.getElementById("tableau_facture");
    confirmPanier.appendChild(tableauFacture);
    tableauFacture.appendChild(lignTableauFacture);
    lignTableauFacture.appendChild(tableauFacturePhoto);
    lignTableauFacture.appendChild(tableauFactureId);
    lignTableauFacture.appendChild(tableauFacturePrix);
  
// Contenu des balises
    tableauFacturePhoto.textContent = "Article";
    tableauFactureId.textContent = "Nom";
    tableauFacturePrix.textContent = "Prix";

// Incrémentation de l'id des lignes pour chaque produit

    let i = 0;
    let order = JSON.parse(sessionStorage.getItem("order"));
    order.products.forEach((orderArticle) => {

// Création de la ligne

    let ligneAchat = document.createElement("tr");
    let blocPhotoAchat = document.createElement("td");
    let photoAchat = document.createElement("img");
    let nomAchat = document.createElement("td");
    let prixAchat = document.createElement("td");

// Attribution des class 

    ligneAchat.setAttribute("id", "article_acheté" + i);
    blocPhotoAchat.setAttribute("class","bloc_photo_article_acheté")
    photoAchat.setAttribute("class", "photo_article_acheté");
    photoAchat.setAttribute("src", orderArticle.imageUrl);
    photoAchat.setAttribute("alt", "Photo de l'article acheté");

// Insertion dans le HTML

    tableauFacture.appendChild(ligneAchat);
    ligneAchat.appendChild(blocPhotoAchat);
    ligneAchat.appendChild(nomAchat);
    ligneAchat.appendChild(prixAchat);
    blocPhotoAchat.appendChild(photoAchat);

// Contenu des lignes

    nomAchat.textContent = orderArticle.name;
    prixAchat.textContent = orderArticle.price / 100 + " €";
  });

//Dernière ligne du tableau : Total

    tableauFacture.appendChild(lignetableauTotal);
    lignetableauTotal.appendChild(colonnetableauTotal);
    lignetableauTotal.appendChild(ligneTVA)
    lignetableauTotal.appendChild(tableauTotal);
    lignetableauTotal.setAttribute("id", "ligne_total");
    ligneTVA.textContent ="T.T.C";
    colonnetableauTotal.textContent = "Total payé";
    tableauTotal.setAttribute("id", "total");
    colonnetableauTotal.setAttribute("id", "colonne_total");

// Addition Final
    let totalFacture = 0;
    order.products.forEach((orderArticle) => {
    totalFacture += orderArticle.price / 100;
  });

// Affichage du prix total à payer dans l'addition

    console.log(totalFacture);
    document.getElementById("total").textContent =
    totalFacture + " €";
};
