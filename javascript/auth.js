let utilisateurs = [];

if (localStorage.getItem("utilisateurs")) {
    utilisateurs = JSON.parse(localStorage.getItem("utilisateurs"));
} else {
    utilisateurs = [];
}

const compteTest = {
    nom: "Myriam",
    email: "candles@myriam.com",
    tel: "0555123456",
    mdp: "123456"
};

let compteExiste = false;
for (let i = 0; i < utilisateurs.length; i++) {
    if (utilisateurs[i].email === compteTest.email) {
        compteExiste = true;
        break;
    }
}
if (!compteExiste) {
    utilisateurs.push(compteTest);
}
localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

function validerEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

function validerTel(tel) {
    const regexTel = /^[0-9]{10}$/;
    return regexTel.test(tel);
}

if (document.getElementById("formInscription")) {
    document.getElementById("formInscription").addEventListener("submit", function(e) {
        e.preventDefault();

        let valide = true;

        let nom = document.getElementById("nom").value;
        let email = document.getElementById("email").value;
        let tel = document.getElementById("tel").value;
        let mdp = document.getElementById("mdp").value;
        let mdp2 = document.getElementById("mdp2").value;

        if (nom === "") {
            document.getElementById("erreurNom").textContent = "Nom requis";
            valide = false;
        } else {
            document.getElementById("erreurNom").textContent = "";
        }

        if (validerEmail(email) === false) {
            document.getElementById("erreurEmail").textContent = "Email invalide (ex: nom@domaine.com)";
            valide = false;
        } else {
            let emailExiste = false;
            for (let i = 0; i < utilisateurs.length; i++) {
                if (utilisateurs[i].email === email) {
                    emailExiste = true;
                }
            }
            if (emailExiste === true) {
                document.getElementById("erreurEmail").textContent = "Email deja utilise";
                valide = false;
            } else {
                document.getElementById("erreurEmail").textContent = "";
            }
        }

        if (validerTel(tel) === false) {
            document.getElementById("erreurTel").textContent = "Tel invalide (10 chiffres exactement)";
            valide = false;
        } else {
            document.getElementById("erreurTel").textContent = "";
        }

        if (mdp.length < 6) {
            document.getElementById("erreurMdp").textContent = "6 caracteres minimum";
            valide = false;
        } else {
            document.getElementById("erreurMdp").textContent = "";
        }

        if (mdp !== mdp2) {
            document.getElementById("erreurMdp2").textContent = "Mots de passe differents";
            valide = false;
        } else {
            document.getElementById("erreurMdp2").textContent = "";
        }

        if (valide === true) {
            let nouvelUtilisateur = {
                nom: nom,
                email: email,
                tel: tel,
                mdp: mdp
            };
            utilisateurs.push(nouvelUtilisateur);
            localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
            alert("Inscription reussie !");
            window.location.href = "connexion.html";
        }
    });
}

if (document.getElementById("formConnexion")) {
    document.getElementById("formConnexion").addEventListener("submit", function(e) {
        e.preventDefault();

        let email = document.getElementById("email").value;
        let mdp = document.getElementById("mdp").value;

        let connecte = false;

        for (let i = 0; i < utilisateurs.length; i++) {
            if (utilisateurs[i].email === email && utilisateurs[i].mdp === mdp) {
                connecte = true;
            }
        }

        if (connecte === true) {
            localStorage.setItem("utilisateurConnecte", email);
            alert("Connexion reussie !");
            window.location.href = "../index.html";
        } else {
            alert("Email ou mot de passe incorrect");
        }
    });
}

function deconnecter() {
    localStorage.removeItem("utilisateurConnecte");
    alert("Deconnecte !");

    let path = window.location.pathname;
    if (path.includes("/content/")) {
        window.location.href = "../index.html";
    } else {
        window.location.href = "index.html";
    }
}

function verifierConnexion() {
    let utilisateur = localStorage.getItem("utilisateurConnecte");
    let lienDeconnexion = document.getElementById("liensDeconnexion");

    if (utilisateur && lienDeconnexion) {
        lienDeconnexion.style.display = "list-item";
    }
}

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

window.addEventListener("storage", function() {
    mettreAJourNbArticles();
});

verifierConnexion();
mettreAJourNbArticles();

function setActiveLink() {
    const currentUrl = window.location.pathname;
    const links = document.querySelectorAll('.liens a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        if (href === 'index.html' && currentUrl.endsWith('index.html')) {
            link.classList.add('active');
        } else if (href === 'produits.html' && currentUrl.endsWith('produits.html')) {
            link.classList.add('active');
        } else if (href === 'inscription.html' && currentUrl.endsWith('inscription.html')) {
            link.classList.add('active');
        } else if (href === 'connexion.html' && currentUrl.endsWith('connexion.html')) {
            link.classList.add('active');
        } else if (href === 'commande.html' && currentUrl.endsWith('commande.html')) {
            link.classList.add('active');
        } else if (href === '../index.html' && (currentUrl.endsWith('index.html') || currentUrl === '/' || currentUrl.endsWith('/'))) {
            link.classList.add('active');
        }
    });
}
setActiveLink();