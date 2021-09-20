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

