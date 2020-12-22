 // Création panier.html

  // Vérification des données saisies par l'utilisateur dans le formulaire 
  
  verifSaisies = () =>{
    
      let verifNombre = /[0-9]/;
      let verifEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
      let verifSymbole = /[§!@#$%^&*(),.?":{}|<>]/;
  
  // Message de vérification
      let verifMessage = "";
  
  // Récupération des données
  
      let nom = document.getElementById("nom").value;
      let prenom = document.getElementById("prenom").value;
      let email = document.getElementById("email").value;
      let adresse = document.getElementById("adresse").value;
      let ville = document.getElementById("ville").value;
  
  // Test Formulaire
        
  // Pas de chiffres dans le prénon ou de symboles
    if(verifNombre.test(nom) == true || verifSymbole.test(nom) == true || nom == ""){
      verifMessage = verifMessage + "\n" + "Veuillez entrer un nom valide"
    }else{
      console.log("nom validé");
      
    };
  // Pas de chiffres dans le nom ou de symboles
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
  // Pas de symboles dans l'adresse
    if(verifSymbole.test(adresse) == true || adresse == ""){
      verifMessage = verifMessage + "\n" + "Veuillez entrer une adresse valide"
    }else{
      console.log("Adresse validée");
    };
  // Pas de symboles dans l'adresse ou de chiffres
    if(verifNombre.test(ville) == true || verifSymbole.test(ville) == true || ville == ""){
      verifMessage = verifMessage + "\n" + "Veuillez entrer une ville existante"
    }else{
      console.log("Localisation validée")
    };
  // Si le formulaire n'est pas correctement rempli, l'utilisateur reçoit une alerte
     if(verifMessage != ""){
        alert(" Veuillez remplir les champs suivants:" + "\n" + verifMessage);
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
