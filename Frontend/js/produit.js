//Fonction permettant d'afficher les produits dans le HTML || Page Produit

function displayOurson(oursons) {
    oursons.forEach(function(ourson) {
        //On récupère les éléments HTML grâce à leur ID

        let image = document.getElementsByClassName("ourson-img")
        let titre = document.getElementsByClassName("ourson-name")
        let description = document.getElementsByClassName("ourson-description")
        let prix = document.getElementsByClassName("ourson-prix")
        let select = document.getElementsByClassName("ourson-select")
        let panier = document.getElementsByClassName("ourson-panier")

        //il récupère donc les informations des produits depuis l'API pour les afficher ensuite

        image.src = ourson.imageUrl;
        titre.textContent = ourson.name;
        description.textContent = ourson.description;
        prix.textContent = "Prix: " + ourson.price + " €";

        for (let c = 0; c < ourson.colors.length; c++) {
            let select_option = document.createElement("option")
            select_option.text = ourson.colors[c]
            select_option.value = ourson.colors[c]
            select.add(select_option)
        }


    })
}


