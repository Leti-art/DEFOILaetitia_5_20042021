//afficher les elements dans le HTML



const affichernom = document.querySelector("#titre");
const afficherdescription = document.querySelector("#description");
const afficherprix = document.querySelector("#prix");

const affichercouleur1 = document.querySelector("#couleur1");
const affichercouleur2 = document.querySelector("#couleur2");
const affichercouleur3 = document.querySelector("#couleur3");
const affichercouleur4 = document.querySelector("#couleur4");



const oursons = fetch("http://localhost:3000/api/teddies");

oursons
 .then(async (response) => {
     console.log(response);

     const listData = await response.json();

     console.log(listData[1]);

     
         
         const txtName = listData[1].name
         const txtDescription = listData[1].description
         const txtPrice = listData[1].price
     
         const txtCouleur1 = listData[1].colors[0]
         const txtCouleur2 = listData[1].colors[1]
         const txtCouleur3 = listData[1].colors[2]
         
         affichernom.innerHTML = txtName;
         afficherdescription.innerHTML = txtDescription;
         afficherprix.innerHTML = txtPrice + " €";
        
         affichercouleur1.innerHTML = txtCouleur1;
         affichercouleur2.innerHTML = txtCouleur2;
         affichercouleur3.innerHTML = txtCouleur3;

        
     
 })
 .catch((error) => console.log(error));


 

