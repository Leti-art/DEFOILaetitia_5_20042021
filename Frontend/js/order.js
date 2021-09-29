//on affiche les Coordonnéesdu client venant du formulaire 
const order = JSON.parse(localStorage.getItem("order"));
document.getElementById("orderNumber").innerText = order.orderId;
document.getElementById("indentLastName").innerText = order.contact.lastName;
document.getElementById("indentFirstName").innerText = order.contact.firstName;
document.getElementById("indentAddress").innerText = order.contact.address;
document.getElementById("indentCity").innerText = order.contact.city;
document.getElementById("indentEmail").innerText = order.contact.email;

//on affiche le nombre de produits total commandé

document.getElementById("indentProductsNumber").innerText = order.products.length;

// on affiche la date de la commande
const date = new Date();
const french = { weekday: "long", year: "numeric", month: "long", day: "2-digit" };
document.getElementById("today").innerText = (date.toLocaleDateString("fr-CA", french));

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
    return `${(price / 100).toFixed(2)} €`;
}

//Fonction pour obtenir un Id de commande
function getOrderId(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderId", orderId);
    // au clic du bouton, on arrive sur la page de confirmation
    window.location.href = './order.html?orderId=' + orderId;
}

//Fonction pour gérer la soumission du formulaire
async function handleSubmit(event) {
    //Récupération des données saisie dans le formulaire
    event.preventDefault();
    try {
        const data = new FormData(event.target);
        const lastName = data.get('lastName');
        const firstName = data.get('firstName');
        const adress = data.get('adress');
        const codePostal = data.get('codePostal');
        const city = data.get('city');
        const email = data.get('email');


        //Envoyer le panier et le contact
        if (purchaseRecovery && purchaseRecovery.length > 0) {
            //créer le contact
            const contact = new Contact(firstName, lastName, adress, city, codePostal, email);
            // On récupère les id des produits se trouvant dans le panier
            const productIdList = [];
            purchaseRecovery.forEach(product => productIdList.push(product.id));
            //créer la commande avec le contact et le panier
            const order = new Order(contact, productIdList);
            let response = await sendCommandToServer(order);
            getOrderId(response);
        }
    } catch (e) {
        console.log(e);
    }
}

//Fonction pour l'envoi de la commande en method POST vers le serveur
async function sendCommandToServer(order) {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    }
    const response = await fetch("http://localhost:3000/api/teddies/order", config)
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return await response.json();
}