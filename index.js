// Connexion avec l'Api

const apiUrl = "http://localhost:3000/api/cameras";

var request = new XMLHttpRequest();
    request.onreadystatechange = function listeAppareilsPhotos() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
            const response = JSON.parse(this.responseText);
            
            console.log('Connexion établie')
        }
};
request.open('GET', apiUrl);
request.send();
    
// Récupération des données de l'Api




// Création des blocs images des caméras

//Création des balises




let box = document.getElementById("box") // Balise de rérérence pour index.html


let boxOfCam = document.createElement('div');

let boxOfPicture = document.createElement('div');
let pictureOfCam = document.createElement('img');

let boxNameAndPrice = document.createElement('div');
let nameOfCam = document.createElement('h2');
let priceOfCam = document.createElement('p')

let boxOfDescription = document.createElement('div');
let descriptionOfCam = document.createElement('p');
let buttonSelectCam = document.createElement('button')

// Attribution des classes

console.log( "tout va bien")

boxOfCam.setAttribute('class', 'box_of_cam');
boxOfPicture.setAttribute('class', 'box_of_picture');
pictureOfCam.setAttribute('src',"images/vcam_2.jpg");

boxNameAndPrice.setAttribute('class', 'box_name_and_price');
nameOfCam.setAttribute('class', 'name_of_cam');
priceOfCam.setAttribute('class', 'price_of_cam');

boxOfDescription.setAttribute('class', 'box_description');
descriptionOfCam.setAttribute('class', 'description');
buttonSelectCam.setAttribute('class', "btn_select_cam");
buttonSelectCam.setAttribute("href", "product.html?id=");

// Positionnement des balises

box.appendChild(boxOfCam);
boxOfCam.appendChild(boxOfPicture);
boxOfPicture.appendChild(pictureOfCam);
pictureOfCam.appendChild(boxNameAndPrice);
boxNameAndPrice.appendChild(nameOfCam);
nameOfCam.appendChild(priceOfCam);
priceOfCam.appendChild(boxOfDescription);
boxOfDescription.appendChild(descriptionOfCam);
descriptionOfCam.appendChild(buttonSelectCam)

// Contenu des balises

nameOfCam.textContent = 'appareil photo';
descriptionOfCam.textContent = " la description d'appareil photo";
buttonSelectCam.textContent = " Choisir";





