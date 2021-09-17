//Fonction permettant d'afficher les produits dans le HTML || Page Produit

const getArticleId =  function () {                                                // récupération de l'article par l'id
    return new URL(location.href).searchParams.get("id")     
 }
 
 const getArticle = function (articleId) {                                           //affichage du produit (objet) sélectionné par id
     return fetch(`http://localhost:3000/api/teddies/${articleId}`)                // requête vers le lien et réponse
     .then(function(httpResponse) {                                                 
         return httpResponse.json()                                                  
     })
     .then(function(articles) {                                                      
         return articles              
     })
     .catch(function(error) {                                                                      
         alert(error)
     })
 }
 
 function displayPrice(price) {
     return `${(price/100).toFixed(2)} €`;
 }
 
 function displayArticle(article) {                                                  // j'affiche mon produit
     document.getElementById("pictureProd").setAttribute("src", article.imageUrl);   
     document.getElementById("description-text").textContent= article.description;
     document.getElementById("nameItem").textContent= article.name;
     document.getElementById("price").textContent= displayPrice(article.price);    
 
     for (let i = article.colors.length; i--;) {                                    // afficher le choix des # couleurs
         const colors = article.colors[i];
         const option = document.createElement("option");
         option.setAttribute("value", colors);
         option.innerText = colors;
         document.querySelector("#colors").appendChild(option);                     
     }
 }
 
 const getPurchaseFromLocalStorage = () => {                                           // cumul du nb produit, total prix en localStorage
     let purchase;
     if(localStorage.getItem("purchase")) {
        purchase = JSON.parse(localStorage.getItem("purchase"));
     } else {
        purchase = {
             nbProducts : 0,
             priceTotal: 0,
             products: [],
         };
     }
     return purchase;
 };
 
 const setPurchaseInLocalStorage = (article, purchase) => {                              // mis en localStorage des produits 
     article.colors = document.querySelector("#colors").value;
     purchase.nbProducts ++ ;
     purchase.priceTotal += article.price;
     purchase.products.push(article);
     localStorage.setItem("purchase", JSON.stringify(purchase));
 }
 
 (async function () {
     const articleId = getArticleId();                                               // affichage du produit
     const article = await getArticle(articleId);
     displayArticle(article); 
 
     const handleAddToPurchase = () => {                                               // report du produit fini au panier
         const purchase = getPurchaseFromLocalStorage();
         setPurchaseInLocalStorage(article, purchase);
         location.replace("./purchase.html");  
     };
 
     const addToPurchase = document.querySelector("#sendPurchase");                      // déclancheur d'évènement sur le click
     addToPurchase.addEventListener("click",handleAddToPurchase);
 })();


