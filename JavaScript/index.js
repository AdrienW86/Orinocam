const APIURL = "http://localhost:3000/api/cameras/";

let idCam = "";

//Récupération des données de l'Api

getAllCameras = () =>{
	return new Promise((resolve,reject) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
      if(this.readyState == XMLHttpRequest.DONE && this.status == 200 &&
         this.status < 400) {
				resolve(JSON.parse(this.responseText));
				console.log("Connecté");	
			}else{
        
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
    console.log("le panier de l'utilisateur a été crée");
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

 
 