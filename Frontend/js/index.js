//Fonction principale récupère et affiche les produits sur la page
(async function() {
    const oursons = await getOursons()
})


//Fonction qui permet de récupérer les produits dans l'API
function getOursons() {
    //On saisit l'URL de l'API, on utilise fetch
    return fetch("http://localhost:3000/api/teddies")
      //Les promesses
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(oursons) {
        return oursons
    })
   
    
    //si jamais il y a une erreur, on affiche error à l'utilisateur
    .catch(function(error){
        alert(error)
    })
}

//Fonction permettant d'afficher les produits dans le HTML
function displayOurson(oursons) {
    oursons.forEach(function(produit) {

// récupère les informations des produits depuis l'API pour les afficher ensuite

     titre.textContent = produit.name;
     description.textContent = produit.description;
     prix.textContent = "Prix: " + produit.price + " €";
     img = produit.imageUrl;
        
    })
    
}

