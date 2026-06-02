const produits = [
    {
        id: 1,
        nom: "Vanille",
        categorie: "parfumee",
        prix: 800,
        image: "../images/bougie-vanille.png",
        description: "Senteur vanille douce et réconfortante"
    },
    {
        id: 2,
        nom: "Fraise",
        categorie: "parfumee",
        prix: 800,
        image: "../images/bougie-fraise.png",
        description: "Senteur fraise fruitée et gourmande"
    },
    {
        id: 3,
        nom: "Citron",
        categorie: "parfumee",
        prix: 800,
        image: "../images/bougie-citron.png",
        description: "Senteur citron fraîche et vive"
    },
    {
        id: 4,
        nom: "Lavande",
        categorie: "parfumee",
        prix: 800,
        image: "../images/bougie-lavande.png",
        description: "Senteur lavande apaisante et relaxante"
    },
    {
        id: 5,
        nom: "Myrtille",
        categorie: "parfumee",
        prix: 800,
        image: "../images/bougie-myrtille.png",
        description: "Senteur myrtille sucrée et boisée"
    },
    {
        id: 6,
        nom: "Ocean",
        categorie: "parfumee",
        prix: 800,
        image: "../images/bougie-ocean.png",
        description: "Senteur océan fraîche et marine"
    },
    {
        id: 7,
        nom: "Chocolat",
        categorie: "parfumee",
        prix: 800,
        image: "../images/bougie-chocolat.png",
        description: "Senteur chocolat gourmande et réconfortante"
    },
    {
        id: 8,
        nom: "Rose",
        categorie: "parfumee",
        prix: 800,
        image: "../images/bougie-rose.png",
        description: "Senteur rose florale et romantique"
    },
    {
        id: 9,
        nom: "Naturelle",
        categorie: "nonparfumee",
        prix: 600,
        image: "../images/bougie-naturelle.png",
        description: "Cire naturelle, sans parfum ajouté"
    },
    {
        id: 10,
        nom: "Crème",
        categorie: "nonparfumee",
        prix: 600,
        image: "../images/bougie-creme.png",
        description: "Teinte crème douce, senteur neutre"
    },
    {
        id: 11,
        nom: "Herbes",
        categorie: "nonparfumee",
        prix: 600,
        image: "../images/bougie-herbes.png",
        description: "Senteur herbes champêtres et naturelles"
    }
];

produits.sort(function(a, b) {
    return b.prix - a.prix;
});

function afficherProduits(liste, idConteneur) {
    const conteneur = document.getElementById(idConteneur);
    if (!conteneur) return;
    
    conteneur.innerHTML = "";
    
    for (let i = 0; i < liste.length; i++) {
        const p = liste[i];
        const carte = document.createElement("div");
        carte.className = "carteproduit";
        
        carte.innerHTML = `
            <img src="${p.image}" alt="${p.nom}">
            <h3>${p.nom}</h3>
            <p>${p.description}</p>
            <p class="prix">${p.prix} DA</p>
            <button onclick="ajouterAuPanier(${p.id})">Ajouter au panier</button>
        `;
        
        conteneur.appendChild(carte);
    }
}

function filtrer(categorie) {
    let resultat = [];
    
    if (categorie === "tous") {
        resultat = produits;
    } else if (categorie === "parfumee") {
        for (let i = 0; i < produits.length; i++) {
            if (produits[i].categorie === "parfumee") {
                resultat.push(produits[i]);
            }
        }
    } else if (categorie === "nonparfumee") {
        for (let i = 0; i < produits.length; i++) {
            if (produits[i].categorie === "nonparfumee") {
                resultat.push(produits[i]);
            }
        }
    }
    
    afficherProduits(resultat, "liste-produits");
}

function ajouterAuPanier(id) {
    let panier = [];
    if (localStorage.getItem("panier")) {
        panier = JSON.parse(localStorage.getItem("panier"));
    }
    
    let produitTrouve = null;
    for (let i = 0; i < produits.length; i++) {
        if (produits[i].id === id) {
            produitTrouve = produits[i];
            break;
        }
    }
    
    if (produitTrouve) {
        panier.push(produitTrouve);
        localStorage.setItem("panier", JSON.stringify(panier));
        if (typeof mettreAJourNbArticles === "function") {
            mettreAJourNbArticles();
        }
        alert("Produit ajouté au panier !");
    }
}

if (document.getElementById("liste-produits")) {
    afficherProduits(produits, "liste-produits");
}