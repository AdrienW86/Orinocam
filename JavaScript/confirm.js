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