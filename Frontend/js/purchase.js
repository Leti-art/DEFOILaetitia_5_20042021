// affichage du total du panier 

const displayPurchase = (purchase) => {
    document.getElementById("productsNumber").innerText = purchase.nbProducts;
    document.getElementById("total.Price").innerText = displayPrice(purchase.totalPrice);

    function displayPrice(price) {
        return `${(price/100).toFixed(2)} €`;
    }

    //on affiche les produits personnalisés

    const productsEltName = document.querySelector(".finalItem");   
        for (let i = purchase.products.length; i--;) {       
            const productName = purchase.products[i].name        
            let trElt = document.createElement("tr"); 
            trElt.innerText = `${productName} -  ${purchase.products[i].colors} :`;
            productsEltName.appendChild(trElt);
    console.log(productName);
        }

        //on affiche les tarifs

        const productsEltPrice = document.querySelector(".unitPrice");
            for (let i = purchase.products.length; i--;) {
                const productPrice = purchase.products[i].price        
                let trElt = document.createElement("tr"); 
                trElt.innerText = displayPrice(productPrice);
                productsEltPrice.appendChild(trElt);

                console.log(productPrice);
            }
        

};

// pour vider le Panier

clearPurchase.onclick = () => {
    localStorage.clear();
    document.location.reload();
};

//partie formulaire et vérification des données entrées

// vérification du format adresse mail

const checkInputEmail = (input) => {                               
    if (input.length <=1 || !input.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {           
        alert("Veuillez vérifier votre adresse E-mail !");
        return false;
    }
    return true;
};

// vérification nom + prénom + ville: verifie <1 lettre et pas de chiffre
const checkInputLastName = (input) => {                                
    if (input.length <=1 || input.match(/[0-9]/g)){               
        alert("Nom mal saisi."); 
        return false;       
    }
    return true;   
};

const checkInputFirstName = (input) => {                                
    if (input.length <=1 || input.match(/[0-9]/g)){               
        alert("Prénom mal saisi."); 
        return false;       
    }
    return true;   
};

const checkInputCity = (input) => {                                
    if (input.length <=1 || input.match(/[0-9]/g)){               
        alert("Veuillez saisir un nom de ville."); 
        return false;       
    }
    return true;   
};

// vérification de l'adresse: verifie <1 lettre
const checkInputAddress = (input) => {                             
    if (input.length <=2) {
        alert("Veuillez vérifier votre adresse.");
        return false;
    }
    return true;
};

// véirification du code postale et de la ville 
const checkInputCodePostal = (input) => {                                
    if (!input.match(/^([0-9]{5}) (.*)$/g)){               
        alert("Veuillez corriger votre Code postal.");
        return false;
    }
    return true;
};
