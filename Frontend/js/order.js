//on affiche les Coordonnéesdu client venant du formulaire 
const order = JSON.parse(localStorage.getItem("order"));                              
    document.getElementById("orderNumber").innerText = order.orderId; 
    document.getElementById("indentLastName").innerText = order.contact.lastName;
    document.getElementById("indentFirstName").innerText = order.contact.firstName;
    document.getElementById("indentAddress").innerText= order.contact.address;
    document.getElementById("indentCodePostal").innerText = order.contact.codePostal;
    document.getElementById("indentCity").innerText = order.contact.city;
    document.getElementById("indentEmail").innerText = order.contact.email;

    //on affiche le nombre de produits total commandé

    document.getElementById("indentProductsNumber").innerText = order.products.length;

    // on affiche la date de la commande
    const date = new Date();
    const french ={weekday: "long", year: "numeric", month: "long", day: "2-digit"};
    document.getElementById("today").innerText=(date.toLocaleDateString("fr-CA", french));

    // on affiche le nom des produits

    const productsIndentEltName = document.querySelector(".finalIndentItem");               
    for (let i = order.products.length; i--;) {       
        const productIndentName = order.products[i].name        
        let trElt = document.createElement("tr"); 
        trElt.innerText = `${productIndentName}`;
        productsIndentEltName.appendChild(trElt);
    console.log(productIndentName);
    }

    // on affiche le prix unitaire

    const productsIndentEltPrice = document.querySelector(".unitIndentPrice");             
    for (let i = order.products.length; i--;) {       
        const productIndentPrice = order.products[i].price;        
        let trElt = document.createElement("tr"); 
        trElt.innerText = displayPrice(productIndentPrice);
        productsIndentEltPrice.appendChild(trElt);
        console.log(productIndentPrice);
    }

    //on affiche le montant total à régler

    let indentTotalPrice = 0;
    for (let i = order.products.length; i--;) {       
        indentTotalPrice += order.products[i].price;
    }
    document.querySelector("#indentTotalPrice").innerText = displayPrice(indentTotalPrice);
console.log(indentTotalPrice);


function displayPrice(price) {        
    return `${(price/100)} €`;
}


