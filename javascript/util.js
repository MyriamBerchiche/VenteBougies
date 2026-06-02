function mettreAJourNbArticles() {
    let panier = [];
    if (localStorage.getItem("panier")) {
        panier = JSON.parse(localStorage.getItem("panier"));
    }
    let nb = panier.length;
    let tousLesSpan = document.querySelectorAll("#nbArticles");
    for (let i = 0; i < tousLesSpan.length; i++) {
        tousLesSpan[i].textContent = nb;
    }
}

mettreAJourNbArticles();

window.addEventListener("storage", function() {
    mettreAJourNbArticles();
});