function afficherPanier() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    
    let liste = document.getElementById("listePanier");
    let total = 0;
    
    if (!liste) return;
    
    liste.innerHTML = "";
    
    if (panier.length === 0) {
        document.getElementById("panierVide").style.display = "block";
        document.getElementById("contenuPanier").style.display = "none";
        return;
    }
    
    document.getElementById("panierVide").style.display = "none";
    document.getElementById("contenuPanier").style.display = "block";
    
    let produitsVus = [];
    
    for (let i = 0; i < panier.length; i++) {
        let p = panier[i];
        let trouve = false;
        
        for (let j = 0; j < produitsVus.length; j++) {
            if (produitsVus[j].id === p.id) {
                produitsVus[j].quantite++;
                trouve = true;
                break;
            }
        }
        
        if (!trouve) {
            produitsVus.push({
                id: p.id,
                nom: p.nom,
                prix: p.prix,
                quantite: 1
            });
        }
    }
    
    for (let i = 0; i < produitsVus.length; i++) {
        let p = produitsVus[i];
        let totalLigne = p.prix * p.quantite;
        total = total + totalLigne;
        
        let ligne = document.createElement("tr");
        ligne.innerHTML = `
            <td>${p.nom}</td>
            <td>${p.prix} DA</td>
            <td>${p.quantite}</td>
            <td>${totalLigne} DA</td>
            <td><button onclick="supprimerProduit(${p.id})" class="btnsupprimer">❌</button></td>
        `;
        liste.appendChild(ligne);
    }
    
    document.getElementById("totalPrix").textContent = total;
}

function supprimerProduit(id) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let nouveau = [];
    
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id !== id) {
            nouveau.push(panier[i]);
        }
    }
    
    localStorage.setItem("panier", JSON.stringify(nouveau));
    afficherPanier();
    if (typeof mettreAJourNbArticles === "function") {
        mettreAJourNbArticles();
    }
}

function viderPanier() {
    if (confirm("Vider tout le panier ?")) {
        localStorage.setItem("panier", JSON.stringify([]));
        afficherPanier();
        if (typeof mettreAJourNbArticles === "function") {
            mettreAJourNbArticles();
        }
    }
}

function validerCommande() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    
    if (panier.length === 0) {
        alert("Panier vide");
        return;
    }
    
    document.getElementById("messageconf").style.display = "flex";
    localStorage.setItem("panier", JSON.stringify([]));
    afficherPanier();
    if (typeof mettreAJourNbArticles === "function") {
        mettreAJourNbArticles();
    }
}

function fermerMessage() {
    document.getElementById("messageconf").style.display = "none";
}

if (document.getElementById("listePanier")) {
    afficherPanier();
}