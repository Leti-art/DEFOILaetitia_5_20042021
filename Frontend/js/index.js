// fonction permettant de se lancer seul
(async function () {
    // async: pour attendre les réponses des promises
    const articles = await getArticles()    // constantes  attente des reponses
    // boucle pour créer chaque produit
    for (article of articles) {
        // affichage des produits
        displayArticle(article)
    }
})()

// fonction de requete et réponse
function getArticles() {
    // requete vers le lien et reponse
    return fetch("http://localhost:3000/api/teddies")

        .then(function (httpResponse) {                                              // promise 1
            return httpResponse.json()                                              // avoir données de la réponse en json
        })
        .then(function (articles) {                                                  // promise 2 grace au retour du 1
            return articles
        })
        .catch(function (error) {                                                    // s'il y a une erreur on renvoie error            
            alert(error)
        })
}

// fonction d'affichage des articles
function displayArticle(article) {
    const templateItem = document.getElementById("templateArticle")
    const cloneItem = document.importNode(templateItem.content, true)

    cloneItem.getElementById("picture").setAttribute("src", article.imageUrl),
        cloneItem.getElementById("nameItem").textContent = article.name,
        cloneItem.getElementById("price").textContent = displayPrice(article.price),
        cloneItem.getElementById("productLink").href += `?id=${article._id}`,

        document.getElementById("teddies").appendChild(cloneItem)                    // creation d'un enfant
}

function displayPrice(price) {                                                     // format d'affichage du prix/100 et deux 00 à la fin
    return `${(price / 100)} €`;
}