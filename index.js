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

// Création du panier au premier chargement si inexistant

if(localStorage.getItem("panier utilisateur")){
	console.log("Récupération du panier existant");
}else{
	console.log("Création du panier");
  	let createPanier = [];
  	localStorage.setItem("panier utilisateur", JSON.stringify(createPanier));
  };

  	//Tableau et objet demandé par l'API pour la commande
  	let contact;
  	let products = [];

	//L'user a maintenant un panier
  	
    let panierUtilisateur = JSON.parse(localStorage.getItem("panier utilisateur"));

// Création panier.html

//Panier de l'utilisateur
let panier = JSON.parse(localStorage.getItem("panier"));

//Affichage du nombre d'article dans le panier
function nombreArticlePanier() {
  let indexPanier = document.getElementById("indexPanier");
  indexPanier.textContent = panierUtilisateur.length;
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


//-----PANIER----------//



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


