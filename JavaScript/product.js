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
    