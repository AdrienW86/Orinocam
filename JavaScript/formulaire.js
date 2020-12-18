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
console.log("requête post effectuée")
//Sauvegarde du retour de l'API dans la session Storage pour affichage dans confirm.html

sessionStorage.setItem("order", this.responseText);

//Chargement de la page de confirmation
window.location = "./confirm.html";
console.log("l'utilisateur a été redirigé")
resolve(JSON.parse(this.responseText));
console.log(sendForm);
}else{ 
    alert(" l'envoi du formulaire a echoué") 
    console.log("l'envoi du formulaire a échoué")  
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
console.log("Message de remerciements affiché")

}else{

alert("Merci pour votre commande");
window.location("./index.html");

};
}




