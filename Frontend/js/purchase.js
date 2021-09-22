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

    let totalPrice = 0;
    for (let i = purchase.products.length; i--;) {       
        totalPrice += purchase.products[i].price;
    }
    document.querySelector("#totalPrice").innerText = displayPrice(totalPrice);
console.log(totalPrice);

};


// pour vider le Panier

clearPurchase.onclick = () => {
    localStorage.clear();
    document.location.reload();
};

// formulaire et vérification des données

function sendOrder() {
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const address = document.getElementById('address').value
    const codePostal = document.getElementById('codePostal').value
    const email = document.getElementById('email').value
    const city = document.getElementById('city').value

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const codePostalRegex = /[0-9]{5}(-[0-9]{4})?/

    if (!(
            firstName.length > 1 &&
            lastName.length > 1 &&
            emailRegex.test(email) &&
            address.length > 6 &&
            codePostalRegex.test(codePostal) &&
            city.length > 1
        )) {
        alert("Veuillez remplir les champs correctement avant de procéder au paiement ! ")
        return
    }
}

//partie formulaire et vérification des données entrées

function addEventListeners() {
    // Poursuivre sur le button
    document.getElementById('sendOrder').onclick = (e) => {
        e.preventDefault()
        sendOrder()
    }
}



//pour la création des données du client

const getValueFromInput = (input) =>    
    document.querySelector("#formulaire").value;

const buildContactData = () => {                                   
    const lastName = getValueFromInput("lastName");
    const firstName = getValueFromInput("firstName");
    const email = getValueFromInput("email");
    const address = getValueFromInput("address");
    const codePostal = getValueFromInput("codePostal");
    const city = getValueFromInput("city");


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
        } /*else {
            alert('Votre formulaire est mal rempli');      
        }*/
    };
    const btn = document.querySelector('#sendOrder');
    btn.addEventListener('click', sendOrder);
})();

