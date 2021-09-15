let oursons;
const results = document.getElementById("results");
let showProduit = document.getElementsByClassName("ourson-produit");

// Api request, fonction async

const fetchOursons = async () => {
    oursons = await fetch("http://localhost:3000/api/teddies")
    .then(res => res.json());

};

const showOursons = async () => {
    await fetchOursons();

    results.innerHTML = (
        
        oursons
        .filter(ourson => ourson.name.toLowerCase())
        .map(ourson => (
//on map pour afficher les produits, avec du HTML entre les strings inversés
            `
            <div class="ourson-item">
                <img class="ourson-img" src="${ourson.imageUrl}" />
                <h3 class="ourson-name">${ourson.name}</h3>
                <div class="ourson-info">
                    <h2 class="ourson-description">${ourson.description}</h2>
                    <h3 class="ourson-prix">Prix: ${ourson.price} €</h3>
                    <select class="ourson-select">
                    <option value="">Choississez une couleur</option>
                    <option value="0">${ourson.colors[0]}</option>
                    <option value="1">${ourson.colors[1]}</option>
                    <option value="2">${ourson.colors[2]}</option>
                    <option value="3">${ourson.colors[3]}</option>
                    </select>
                    <button class="ourson-produit">Voir le produit</button>
                    
                </div>
                                                                                                          
            </div>
            
            
            `

        )).join('')
        //finir par join pour éviter quil sépare par des virgules
    );

    showProduit.addEventListener('click', function() {
        showProduit.href = "pages/produit.html?id=' + ourson._id"
    })
};

showOursons();
