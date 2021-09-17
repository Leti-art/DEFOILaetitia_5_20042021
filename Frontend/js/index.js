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
                    ${ourson.colors[0] ? `<option value="">${ourson.colors[0]}</option>` : null}
                    ${ourson.colors[1] ? `<option value="">${ourson.colors[1]}</option>` : null}
                    ${ourson.colors[2] ? `<option value="">${ourson.colors[2]}</option>` : null}
                    ${ourson.colors[3] ? `<option value="">${ourson.colors[3]}</option>` : null}
                    ${ourson.colors[4] ? `<option value="">${ourson.colors[4]}</option>` : null}
                    ${ourson.colors[5] ? `<option value="">${ourson.colors[5]}</option>` : null}
                    </select>
                    <a href="./produit.html"${ourson._id}" class="ourson-produit">Voir le produit</a>
                </div>
                                                                                                          
            </div>
            
            
            `

        )).join('')
        //finir par join pour éviter qu'ils se séparent par des virgules
    );

    
};

showOursons();
