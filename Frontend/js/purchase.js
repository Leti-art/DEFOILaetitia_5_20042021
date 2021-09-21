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

//partie formulaire et vérification des données entrées

function addEventListeners() {
    // Poursuivre sur le button
    document.getElementById('sendOrder').onclick = (e) => {
        e.preventDefault()
        sendOrder()
    }

    // Input de validation des champs (Prénom + Nom + mail + adresse + code postal + ville)
    watchValidity(document.getElementById('firstName'), (e) => e.target.value.length > 1)
    watchValidity(document.getElementById('lastName'), (e) => e.target.value.length > 1)
    watchValidity(document.getElementById('email'), (e) => {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return emailRegex.test(e.target.value)
    })
    watchValidity(document.getElementById('address'), (e) => e.target.value.length > 6)
    watchValidity(document.getElementById('codePostal'), (e) => {
        const codePostalRegex = /[0-9]{5}(-[0-9]{4})?/
        return codePostalRegex.test(e.target.value)
    })

    watchValidity(document.getElementById('city'), (e) => e.target.value.length > 1)
}


function watchValidity(elt, condition) { //valider ou non le champ de l'input en fonction de l'action de l'utilisateur. Champ validé si les caractères attendus de l'input sont correct sinon retourne une erreur si champ incorrect ou vide
    elt.oninput = (e) => {
        if (condition(e)) {
            validInputElt(e.target)
        } else {
            neutralInputElt(e.target)
        }
    }

    elt.onblur = (e) => {
        if (!condition(e)) {
            invalidInputElt(e.target)
        }
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
        } /*else {
            alert('Votre formulaire est mal rempli');      
        }*/
    };
    const btn = document.querySelector('#sendOrder');
    btn.addEventListener('click', sendOrder);
})();

