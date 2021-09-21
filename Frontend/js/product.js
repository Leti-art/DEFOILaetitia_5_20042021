//Fonction permettant d'afficher les produits dans le HTML || Page Produit
// récupération de l'article par l'id
const getArticleId =  function () {                                                
    return new URL(location.href).searchParams.get("id")     
 }

 //affichage du produit (objet) sélectionné par id

 const getArticle = function (articleId) {                                           
     return fetch(`http://localhost:3000/api/teddies/${articleId}`)                
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
     return `${(price/100)} €`;
 }
       // j'affiche mon produit en injectant les éléments
 function hydrateArticle(article) {                                                  
     document.getElementById("pictureProd").setAttribute("src", article.imageUrl);   
     document.getElementById("description-text").textContent= article.description;
     document.getElementById("nameItem").textContent= article.name;
     document.getElementById("price").textContent= displayPrice(article.price);    
     
         // afficher le choix des # couleurs
 
     for (let i = article.colors.length; i--;) {                                    
         const colors = article.colors[i];
         const option = document.createElement("option");
         option.setAttribute("value", colors);
         option.innerText = colors;
         document.querySelector("#colors").appendChild(option);                     
     }
 }
           // cumul du nb produit, total prix en localStorage
 const getPurchaseFromLocalStorage = () => {                                           
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
           // mis en localStorage des produits 
 const setPurchaseInLocalStorage = (article, purchase) => {                              
     article.colors = document.querySelector("#colors").value;
     purchase.nbProducts ++ ;
     purchase.priceTotal += article.price;
     purchase.products.push(article);
     localStorage.setItem("purchase", JSON.stringify(purchase));
 }
      // affichage du produit
 (async function () {
     const articleId = getArticleId();                                              
     const article = await getArticle(articleId);
     hydrateArticle(article); 
 
     // report du produit fini au panier
     const handleAddToPurchase = () => {                                               
         const purchase = getPurchaseFromLocalStorage();
         setPurchaseInLocalStorage(article, purchase);
         location.replace("./purchase.html");  
     };

     // déclancheur d'évènement sur le click, envoyer le panier
     const addToPurchase = document.querySelector("#sendPurchase");                      
     addToPurchase.addEventListener("click",handleAddToPurchase);
 })();


