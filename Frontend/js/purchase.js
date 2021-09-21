// affichage du total du panier 

const displayPurchase = (purchase) => {
    document.getElementById("productsNumber").innerText = purchase.nbProducts;
    document.getElementById("totalPrice").innerText = displayPrice(purchase.totalPrice);

    function displayPrice(price) {
        return `${(price/100)} €`;
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

//pour la création des données du client

const getValueFromInput = (input) =>    
    document.querySelector(`#${input}`).value;

const buildContactData = () => {                                   
    const lastName = getValueFromInput("lastName");
    const firstName = getValueFromInput("firstName");
    const email = getValueFromInput("email");
    const address = getValueFromInput("address");
    const codePostal = getValueFromInput("codePostal");
    const city = getValueFromInput("city");

// controle de chaque variable avant l'envoi du formulaire 

    if (
        !checkInputName(lastName) ||                              
        !checkInputName(firstName) ||
        !checkInputAddress(address) ||
        !checkInputCity(city) ||
        !checkInputEmail(email) ||
        !checkInputCodePostal(codePostal)
    ) {
        return false;                        
    }
        alert("Merci pour votre commande sur Orin'Ours !");
    return {                                           
        lastName: lastName,
        firstName: firstName,
        email: email,
        address: address,
        codePostal: codePostal,
        city: city
        
        
    };
};

//--- creation des objets articles

const buildProductsData = (purchase) => {                             
    const ours = [];
    for (let i = purchase.products.length; i--;) {
            ours.push(purchase.products[i]._id);
    }
        return ours;
}; 

// format du fetch post

const buildObjectsForOrder = (purchase) => {                          
    const contact = buildContactData();
    const products = buildProductsData(purchase);  
    return {
        contact: contact,
        products: products,
    }   
};

// si jamais le panier du client est vide
const displayEmptyPurchase = () => {                                  
    document.querySelector(".purchasePage").innerHTML = '<br/><div>Votre panier est vide.</div><br/>';
}

(() => {
    const purchase = JSON.parse(localStorage.getItem("purchase"));
    if (purchase && purchase.products.length){
        displayPurchase(purchase);
    }else{
        displayEmptyPurchase();
    } 

    const sendOrder = () => {
        const data = buildObjectsForOrder(purchase);
    console.log(data);
    // gestion des erreurs ; si contact =  true,  on execute le fetch
        if(!!data.contact){                                         
            fetch("http://localhost:3000/api/teddies/order", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data),              
            })
            .then(function (httpResponse) {
                return httpResponse.json();
            })
            .then(function (order) {
        console.log(order);
            localStorage.setItem('order', JSON.stringify(order));
            localStorage.removeItem('purchase');
            location.replace('/order.html');
                return order;
            })
            .catch(function (error) {
                alert(error);
            });   
        } else {
            alert('Votre formulaire est mal rempli');      
        }
    };
    const btn = document.querySelector('#sendOrder');
    btn.addEventListener('click', sendOrder);
})();

