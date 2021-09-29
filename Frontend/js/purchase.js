// affichage du total du panier 

const displayPurchase = (purchase) => {
    document.getElementById("productsNumber").innerText = purchase.nbProducts;
    document.getElementById("totalPrice").innerText = displayPrice(purchase.totalPrice);

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

        //on affiche les prix

        const productsEltPrice = document.querySelector(".unitPrice");
            for (let i = purchase.products.length; i--;) {
                const productPrice = purchase.products[i].price        
                let trElt = document.createElement("tr"); 
                trElt.innerText = displayPrice(productPrice);
                productsEltPrice.appendChild(trElt);

                console.log(productPrice);
            }

    let totalPrice = 0;
    for (let i = purchase.products.length; i--;) {       
        totalPrice += purchase.products[i].price;
    }
    document.querySelector("#totalPrice").innerText = displayPrice(totalPrice);
console.log(totalPrice);

};


// pour vider le Panier
const btnClearCart = document.querySelector('#clearPurchase');


// formulaire et vérification des données

const checkInputName = (input) => {                                // verifie <1 lettre et pas de chiffre
    if (input.length <=1 || input.match(/[0-9]/g)){               
        alert("Nom ou Prénom mal saisi."); 
        return false;       
    }
    return true;   
};

const checkInputEmail = (input) => {                               // verifie le format mail
    if (input.length <=1 || !input.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {           
        alert("Veuillez vérifier votre adresse E-mail.");
        return false;
    }
    return true;
};

const checkInputAddress = (input) => {                             // verifie <1 lettre
    if (input.length <=2) {
        alert("Veuillez vérifier votre adresse.");
        return false;
    }
    return true;
};

const checkInputCity = (input) => {
    if (input.length <=2) {
        alert("Veuillez vérifier votre adresse.");
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
    const city = getValueFromInput("city");

    if (
        !checkInputName(lastName) ||                               // controle que chaque variable avant envoi du formulaire 
        !checkInputName(firstName) ||
        !checkInputAddress(address) ||
        !checkInputCity(city) ||
        !checkInputEmail(email) 
    ) {
        return;                        
    }
    alert("Merci pour votre commande");
    return {                                           
        lastName: lastName,
        firstName: firstName,
        email: email,
        address: address,
        city: city
        
    };

};

//--- creation des objets articles

const buildProductsData = (purchase) => {                             
    const ids = [];
    for (let i = purchase.products.length; i--;) {
            ids.push(purchase.products[i]._id);
    }
        return ids;
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


const purchase = JSON.parse(localStorage.getItem("purchase"));
if (purchase && purchase.products.length){
    displayPurchase(purchase);
}else{
    displayEmptyPurchase();
} 

    
    
const btnSendOrder = document.querySelector('#sendOrder');
if (btnSendOrder){
btnSendOrder.addEventListener('click', function(){
    
    const data = buildObjectsForOrder(purchase);
    
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
        
        localStorage.setItem('order', JSON.stringify(order));
    
        location.replace('./order.html');
            return order;
        })
        .catch(function (error) {
            alert(error);
        });   
    }            
});

}


btnClearCart.addEventListener('click', () => {
    localStorage.clear();
    location.reload(); 
});
