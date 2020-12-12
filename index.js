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

//Création index.html

	async function allCamList(){
		const cameras = await getAllCameras();

		let listOfCam = document.createElement("section")
		listOfCam.setAttribute("class", "list-product");
		
		let box = document.getElementById("box");
		box.appendChild(listOfCam);

		//Pour chaque produit de l'API on créé l'encadré HTML du produit
		cameras.forEach((produit) =>
		{ 
      	//création des élements de la structure de la liste des produits en vente
      	//Une div conteneur/2 div(block gauche et droit)/une image/le nom(titre)/le prix(p)/le lien(a)
      	let appareilBox = document.createElement("section");
      	let boxPhoto = document.createElement("div");
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
      	appareilBox.setAttribute("class", "appareil_box");
        boxPhoto.setAttribute("class", "box_photo");
        produitPrix.setAttribute("class", "prix");
        produitRight.setAttribute("class", "appareil_box--bloc_description");
        produitDescription.setAttribute("class", "description_produit");
      	produitImage.setAttribute("src", produit.imageUrl);
      	produitImage.setAttribute("alt", "image du produit"); 
      	produitLink.setAttribute("href", "product.html?id=" + produit._id);

     	//Block conteneur en flex
      	//Block gauche comprend l'image du produit
     	//Bloc droit comprend le nom/prix/le lien du produit
     	listOfCam.appendChild(appareilBox);
     	appareilBox.appendChild(boxPhoto);
     	boxPhoto.appendChild(produitImage);
      appareilBox.appendChild(produitRight);
      appareilBox.appendChild(produitLastBox); 
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
  const camSelect = await getAllCameras();
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

//L'user a maintenant un panier
  	
let panierUtilisateur = JSON.parse(localStorage.getItem("panier utilisateur"));

//Affichage du nombre d'article dans le panier
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

addPanier = () =>{
  //Au clic de l'user pour mettre le produit dans le panier
  let inputBuy = document.getElementById("ajouterProduitPanier");
  inputBuy.addEventListener("click", async function() {
    const produits = await getAllCameras();
  //Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
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
// Si la longueur du panier est supérieure à 0, on efface le message et on crée un tableau
  if(panierUtilisateur.length > 0){
    document.getElementById("panierVide").remove();

    //Création de la structure principale du tableau  
    let facture = document.createElement("table");
    let ligneTableau = document.createElement("tr");
    let colonneImage = document.createElement("th");
    let colonneNom = document.createElement("th");
    let colonnePrixUnitaire = document.createElement("th");
    let colonneRemove = document.createElement("th");
    let ligneTotal = document.createElement("tr");
    let ligneTVA = document.createElement("td");
    let colonneRefTotal = document.createElement("th");
    let colonnePrixPaye = document.createElement("td");
    

    //Placement de la structure dans la page et du contenu des entetes
    let factureSection = document.getElementById("basket-resume");
    factureSection.appendChild(facture);
    facture.appendChild(ligneTableau);
    ligneTableau.appendChild(colonneImage);
    ligneTableau.appendChild(colonneNom);
    ligneTableau.appendChild(colonnePrixUnitaire);
    ligneTableau.appendChild(colonneRemove);
    
    colonneImage.textContent ="Image du produit";
    colonneNom.textContent = "Nom du produit";
    colonnePrixUnitaire.textContent = "Prix du produit";
    //Pour chaque produit du panier, on créé une ligne avec le nom, le prix
    
    //Init de l'incrémentation de l'id des lignes pour chaque produit
     for (let i = 0; i < panierUtilisateur.length; i++) {
         
      let ligneProduit = document.createElement("tr");
      let ligneBoxImage = document.createElement("td");
      let ligneImage = document.createElement("img");
      let nomProduit = document.createElement("td");
      let prixUnitProduit = document.createElement("td");
      let removeProduit = document.createElement("button");

      //Attribution des class pour le css
      ligneProduit.setAttribute("id", "produit"+[i]);
      removeProduit.setAttribute("id", "remove"+[i]);
      removeProduit.setAttribute('class', "button_supprimer");
      removeProduit.textContent = "Supprimer";
      //Pour chaque produit on créer un event sur l'icone de la corbeille pour annuler ce produit
      //bind permet de garder l'incrementation du i qui représente l'index tu panier au moment de la création de l'event
      //annulerProduit L233
     
      removeProduit.addEventListener("click", (event) => {this.annulerProduit(i);})
      //Insertion dans le HTML
      facture.appendChild(ligneProduit);
      ligneProduit.appendChild(ligneBoxImage);
      ligneBoxImage.appendChild(ligneImage);
      ligneProduit.appendChild(nomProduit);
      ligneProduit.appendChild(prixUnitProduit);
      ligneProduit.appendChild(removeProduit);

      //Contenu des lignes
      ligneImage.setAttribute("class", "image_produit_panier")
      ligneImage.setAttribute("src",panierUtilisateur[i].imageUrl);
      ligneImage.setAttribute("alt", "image du produit dans le panier")
      nomProduit.innerHTML = panierUtilisateur[i].name;
      prixUnitProduit.textContent = panierUtilisateur[i].price / 100 + " €";
      console.log(panierUtilisateur[i].name);
  };

    //Dernière ligne du tableau : Total
    facture.appendChild(ligneTotal);
    ligneTotal.appendChild(colonneRefTotal);
    colonneRefTotal.textContent = "Total à payer";
    ligneTotal.appendChild(ligneTVA);
    ligneTVA.textContent = " TTC";
    ligneTotal.appendChild(colonnePrixPaye);
    ligneTVA.setAttribute("id", "tva");
    colonnePrixPaye.setAttribute("id", "sommeTotal");

    //Calcule de l'addition total
    let totalPaye = 0;
    panierUtilisateur.forEach((panierUtilisateur)=>{
      totalPaye += panierUtilisateur.price / 100;
    });

    //Affichage du prix total à payer dans l'addition
    console.log(totalPaye);
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
    localStorage.setItem('panier utilisateur', JSON.stringify(panierUtilisateur));
    console.log("localStorage mis à jour");
    //relancer la création de l'addition
    window.location.reload();  
};



// Vérification des données saisies par l'utilisateur dans le formulaire 

 //vérifie les inputs du formulaire
 checkInput = () =>{
  //Controle Regex
  let checkNumber = /[0-9]/;
  let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
  let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

  //message fin de controle
  let checkMessage = "";

  //Récupération des inputs
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let adresse = document.getElementById("adresse").value;
  let ville = document.getElementById("ville").value;

//tests des différents input du formulaire
        //Test du nom => aucun chiffre ou charactère spécial permis
        if(checkNumber.test(nom) == true || checkSpecialCharacter.test(nom) == true || nom == ""){
        	checkMessage = "Vérifier/renseigner votre nom";
        }else{
        	console.log("Nom validé");
        };
        //Test du nom => aucun chiffre ou charactère spécial permis
        if(checkNumber.test(prenom) == true || checkSpecialCharacter.test(prenom) == true || prenom == ""){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre prénom";
        }else{
        	console.log("Prénom validé");
        };
        //Test du mail selon le regex de la source L256
        if(checkMail.test(email) == false){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre email";
        }else{
        	console.log("Adresse mail validée");
        };
        //Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux
        if(checkSpecialCharacter.test(adresse) == true || adresse == ""){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre adresse";
        }else{
        	console.log("Adresse validée");
        };
        //Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux
        if(checkSpecialCharacter.test(ville) == true && checkNumber.test(ville) == true || ville == ""){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre ville"
        }else{
        	console.log("Localisation validée")
        };
        //Si un des champs n'est pas bon => message d'alert avec la raison
        if(checkMessage != ""){
        	alert("Il est nécessaire de :" + "\n" + checkMessage);
        }
        //Si tout est ok construction de l'objet contact => a revoir
        else{
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
checkPanier = () =>{
  //Vérifier qu'il y ai au moins un produit dans le panier
  let etatPanier = JSON.parse(localStorage.getItem("panier utilisateur"));
  //Si le panier est vide ou null (suppression localStorage par)=>alerte
   if(etatPanier.length <1 || etatPanier == null) {
    console.log("Erreur :le localStorage ne contient pas de panier")
  alert("Votre panier est vide");
  return false;
  }else{
    console.log("Le panier n'est pas vide")
  return true;
  }
  };

//Envoi du formulaire

  	//Tableau et objet demandé par l'API pour la commande
  	let contact;
    let products = [];
    let formUrl = "http://localhost:3000/api/cameras/order";

  //Fonction requet post de l'API
  const envoiFormulaire = (sendForm, formUrl) => {
  	return new Promise((resolve)=>{
  		let request = new XMLHttpRequest();
  		request.onload = function() {
  			if(this.readyState == XMLHttpRequest.DONE && this.status == 201) 
  			{
          //Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans confirm.html
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

  //Au click sur le btn de validation du formulaire
  validForm = () =>{
    //Ecoute de l'event click du formulaire
    let envoyer = document.getElementById("form_user");
    envoyer.addEventListener("submit", (event) => {
      event.preventDefault()
      //Lancement des verifications du panier et du form => si Ok envoi
      if(checkPanier() == true && checkInput() != null){
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
     
     //Une fois la commande faite retour à l'état initial des tableaux/objet/localStorage
     contact = {};
     products = [];
     localStorage.clear();
 }else{
 	console.log("Erreur");
 };
});
};

/*Affichage des informations sur la page de confirmation
**********************************************/
retourOrder = () =>{
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

confirmRecap = () => {
  //Création de la structure du tableau récapitulatif
  let recapConfirm = document.createElement("table");
  let ligneConfirm = document.createElement("tr");
  let confirmPhoto = document.createElement("th");
  let confirmNom = document.createElement("th");
  let confirmPrixUnitaire = document.createElement("th");
  let ligneConfirmTotal = document.createElement("tr");
  let colonneConfirmTotal = document.createElement("th");
  let confirmPrixPaye = document.createElement("td");

  //Placement de la structure dans la page
  let confirmPanier = document.getElementById("confirmation-recap");
  confirmPanier.appendChild(recapConfirm);
  recapConfirm.appendChild(ligneConfirm);
  ligneConfirm.appendChild(confirmPhoto);
  ligneConfirm.appendChild(confirmNom);
  ligneConfirm.appendChild(confirmPrixUnitaire);

  //contenu des entetes
  confirmPhoto.textContent = "Article";
  confirmNom.textContent = "Nom";
  confirmPrixUnitaire.textContent = "Prix";

  //Incrémentation de l'id des lignes pour chaque produit
  let i = 0;
  let order = JSON.parse(sessionStorage.getItem("order"));

  order.products.forEach((orderArticle) => {
    //Création de la ligne
    let ligneConfirmArticle = document.createElement("tr");
    let photoConfirmArticle = document.createElement("img");
    let nomConfirmArticle = document.createElement("td");
    let prixUnitConfirmArticle = document.createElement("td");

    //Attribution des class pour le css
    ligneConfirmArticle.setAttribute("id", "article_acheté" + i);
    photoConfirmArticle.setAttribute("class", "photo_article_acheté");
    photoConfirmArticle.setAttribute("src", orderArticle.imageUrl);
    photoConfirmArticle.setAttribute("alt", "Photo de l'article acheté");

    //Insertion dans le HTML
    recapConfirm.appendChild(ligneConfirmArticle);
    ligneConfirmArticle.appendChild(photoConfirmArticle);
    ligneConfirmArticle.appendChild(nomConfirmArticle);
    ligneConfirmArticle.appendChild(prixUnitConfirmArticle);

    //Contenu des lignes

    nomConfirmArticle.textContent = orderArticle.name;
    prixUnitConfirmArticle.textContent = orderArticle.price / 100 + " €";
  });

  //Dernière ligne du tableau : Total
  recapConfirm.appendChild(ligneConfirmTotal);
  ligneConfirmTotal.appendChild(colonneConfirmTotal);
  ligneConfirmTotal.setAttribute("id", "ligneSomme");
  colonneConfirmTotal.textContent = "Total payé";
  ligneConfirmTotal.appendChild(confirmPrixPaye);

  confirmPrixPaye.setAttribute("id", "sommeConfirmTotal");
  confirmPrixPaye.setAttribute("colspan", "4");
  colonneConfirmTotal.setAttribute("id", "colonneConfirmTotal");
  colonneConfirmTotal.setAttribute("colspan", "2");

  //Calcule de l'addition total
  let sommeConfirmTotal = 0;
  order.products.forEach((orderArticle) => {
    sommeConfirmTotal += orderArticle.price / 100;
  });

  //Affichage du prix total à payer dans l'addition
  console.log(sommeConfirmTotal);
  document.getElementById("sommeConfirmTotal").textContent =
    sommeConfirmTotal + " €";
};
