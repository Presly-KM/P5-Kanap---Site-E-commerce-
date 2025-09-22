//@ts-nocheck
const queryString = window.location.search                                          // Window.location.search est une propriété qui renvoie la partie de l'URL qui suit le "?" et qui contient les paramètres de la requête.(Ex : ?id=a557292fe5814ea2b15c6ef4bd73ed83). Elle retourne la partie chaines de requête (Querystring) de l'URL qui commence par le "?" et qui contient les paramètres de la requête.
const urlParams = new URLSearchParams(queryString)                                  // URLSearchParams est une interface qui fournit des méthodes pour travailler avec les paramètres d'URL. Elle permet de récupérer les valeurs des paramètres de la requête en utilisant leur nom.
const id = urlParams.get("id")                                                      // On veut récupérer la valeur de l"id du produit (qui se trouve au sein du querystring) . La constante id va donc ici automatiquement afficher la valeur de l'id ciblée (les inscriptions après le "?") On utilise la méthode get de l'interface URLSearchParams pour récupérer la valeur de l'id ciblé.
if (id != null) {                                                                   // On crée ici une variable globale pour gérer le problème dans la fonction "saveorder" concernant le localStorage. si l'id existe... NOTE if à supprimer : ne garder que ligne 14 et 15 englober le fetch aussi
    let itemPrice = 0                                                               // On met ici le prix(Itemprice) à 0 par defaut afin qu'il soit modifié par le prix contenu dans l'api au sein de la fonction "handledata(couch)" a la ligne 33 selon la règle de priorité de la variable locale sur la variable globale et qu'ainsi la nouvelle valeur d'"ItemPrice" puisée dans le "price" venant de l'API (handleData) soit reutilisée dans "data" (de la fonction saveOrder) et puisse ainsi être désormais reconnu dans le localStorage (car la valeur du prix avant ce procédé n'etait pas reconnu par le LocalStorage)
}


fetch(`http://localhost:3000/api/products/${id}`)                                   // On fait une deuxième requête au serveur pour récupèrer les données propres à l'id du produit que l'on cible (sur lequel on a cliqué). La valeur de l'id est ici récupérée grâce à l'URLSearchParams. (cf.ligne 8à9)  
    .then((response) => response.json())                                            // On va chercher la réponse de l'API contenant les données propres à l'id ciblé et on la transforme en JSON. 
    .then((res) => handleData(res))                                                 // On récupère les données de l'API et on les envoie à la fonction handleData.  


function handleData(couch) {                                                        // On crée une fonction qui va nous permettre de gérer les données du produit. On lui passe en paramètre les données du produit (couch).
    const { altTxt, colors, description, imageUrl, name, price } = couch            // On récupère individuellement tous les objets qui sont stockées dans handledata                                                             
    itemPrice = price                                                               // On modifie la valeur de la variable globale "itemPrice" (cf.ligne 6) par la valeur du prix (price) qui est tirée de l'API. On fait cela pour que le localStorage puisse reconnaitre la valeur du prix et l'inclure dans le panier. cf. ligne 76
    makeImage(imageUrl, altTxt)                                                     // Après avoir récupéré indivuellment les données, on les passe dans les fonctions makeImage, makeTitle, makePrice, makeDescription et makeColors 
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}



function makeImage(imageUrl, altTxt) {                                              // On crée une fonction qui va nous permettre de créer une image (un <img>) 
    const image = document.createElement("img")                                     // On crée un élément <img> et on l'assigne à la variable image. On crée le "<img>...</img>"
    image.src = imageUrl                                                            // On y incorpore l'url de l'image comme dans le html de tel sorte que : "<img src="http://localhost:3000/images/kanap01.jpeg" alt="Photo d'un canapé bleu, deux places">"
    image.alt = altTxt                                                              // On y incorpore le texte alternatif de l'image 
    const parent = document.querySelector(".item__img")                             // On va chercher l'élément qui va encadrer la génération de l'image (le <div class="item__img">) et on l'assigne à la variable parent.
    if (parent != null) parent.appendChild(image)                                   // Si le parent existe, on ajoute l'image à l'élément parent en tant qu'enfant. 
}



function makeTitle(name) {                                                          // On ajoute le titre/nom de l'article/pièce 
    const h1 = document.querySelector("#title")                                     // On va chercher l'élément qui va encadrer la génération du titre (le <h1 id="title">) et on l'assigne à la variable h1.
    if (h1 != null) h1.textContent = name                                           // On y incorpore le nom du produit comme dans le html de tel sorte que : "<h1 id="title">Kanap Sinopé</h1>" 
}



function makePrice(price) {                                                         // On ajoute le prix en html
    const span = document.querySelector("#price")                                   // On va chercher l'élément qui va encadrer la génération du prix (le <span id="price">) et on l'assigne à la variable span.
    if (span != null) span.textContent = price                                      // On y incorpore le prix du produit comme dans le html de tel sorte que : "<span id="price">490</span>"
}



function makeDescription(description) {                                             // On ajoute ici la description des pices
    const p = document.querySelector("#description")                                // On va chercher l'élément qui va encadrer la génération de la description (le <p id="description">) et on l'assigne à la variable p.
    if (p != null) p.textContent = description                                      // On y incorpore la description du produit comme dans le html de tel sorte que : "<p id="description">Un canapé 2 places en tissu gris clair</p>"
}



function makeColors(colors) {
    const select = document.querySelector("#colors")                                // On récupère l'id "colors" qui est situé au sein de l'attibut "select" dans le html   NB : En html, l'attribut "select" concerne les menus déroulants
    if (select != null) {                                                           // Si le select existe, on va lui ajouter les couleurs 
        colors.forEach((color) => {                                                 // Pour chaque couleur, 
            const option = document.createElement("option")                         // On crée un élément <option> et on l'assigne à la variable option. On crée le "<option value="...">...</option>"
            option.value = color                                                    // On y incorpore la valeur de la couleur comme dans le html de tel sorte que : "<option value="blue">Bleu</option>"
            option.textContent = color                                              // On y incorpore le texte de la couleur comme dans le html de tel sorte que : "<option value="blue">Bleu</option>"
            select.appendChild(option)                                              // Enfin, si select existe, on ajoute l'élément <option> à l'élément <select> en tant qu'enfant.
        })
    }
}



const button = document.querySelector("#addToCart")                                 // On met en place le bouton "Ajouter dans le panier"
if (button != null) {                                                               // On verifie que le bouton existe bien (pour eviter le message d'erreur "object is possibly null") et si il n'existe pas...
button.addEventListener("click", (e) => {                                           // A la place de "event" on met "handleClick" qui signifie : Quand on clique sur le bouton, applique directement la focntion "handleClick"                                                                           // On crée une fonction qui va nous permettre de gérer le clic sur le bouton "Ajouter dans le panier". On lui passe en paramètre l'événement du clic.
    const color = document.querySelector("#colors").value                      
    const quantity = document.querySelector("#quantity").value                      // On récupère la valeur de la couleur et de la quantité sélectionnée par l'utilisateur dans le menu déroulant et le champ de saisie. On utilise la propriété value pour récupérer la valeur sélectionnée.
                                                                               
    if (color == null || color === "" || quantity == null || quantity ==0) {                                                                 // Puis il va nous rediriger vers le panier  / Appel de la fonction "redirectToCart" créée ci-dessous 
        alert("Please select a color and a quantity")                               // Si la couleur n'est pas sélectionnée ou si la quantité est nulle, on affiche une alerte pour demander à l'utilisateur de sélectionner une couleur et une quantité.
    }
                                                                                 // On crée une clé unique pour chaque article en combinant l'id du produit et la couleur sélectionnée. Cela permet de stocker plusieurs articles similaires mais avec des couleurs différentes dans le localStorage. Or cela était impossible avant. On utilise la syntaxe `${}` pour interpoler les valeurs de id et color dans la chaîne de caractères. l'id est puisé dans la ligne 4 (const id = urlParams.get("id")) et la couleur est puisée dans la ligne 76 (const color = document.querySelector("#colors").value)
    const data = {                                                                  // On crée un objet data qui va contenir toutes les informations de l'article à stocker dans le localStorage. On utilise la syntaxe d'objet littéral pour créer l'objet.
        id: id,
        color: color,
        quantity: Number(quantity),                                                 // Quantity on en fait un Number. Pour eviter que dans la console les chiffres s'affichent en string. Exemple: "1" au lieu de 1.
        price: itemPrice,                                                           // Avant = "price: price" mais on rencontrait des problemes pour que le localStorage parvienne a lire la valeur du prix. On reorganise alors le code en haut de la page de telle manière que la valeur du prix soit reconnu par le localStorage. Itemprice vaut ici "price" qui est tiré de l'API. cf. ligne 25
    }
    localStorage.setItem(id, JSON.stringify(data))                                                             // LocalStorage prend ici l'identifiant (ou la clé) et la valeur à stocker. De telle manière que : localStorage.setItem("identifiant", "valeur").   JSON.stringify --> LocalStorage n'est pas capable de storer des objets, on est obligé de les sérialiser, autrement dit, de les transformer en string. 
    window.location.href = "cart.html"
})
}