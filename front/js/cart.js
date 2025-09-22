const cart = []                                                                     // On veut une liste total des articles ajouté dans le panier. A chaque fois qu'un utilisateur clic sur "Ajouter dans le panier", on l'ajoute ("push") dans le panier(cart). De telle sorte que le tableau cart va rassembler tous les items qu'il aura recu.

retrieveItemsFromStorage()                                                          // Concernant les articles pour lesquels on a cliqué sur "Ajouter dans le panier" on veut récupérer tous les objets qui ont été sauvegardés dans le localStorage puis les ajouter (push) dans le "cart"(panier) ci-dessus.
cart.forEach((item) => displayItem(item))                                           // Pour chaque élement/article (item) qui est dans le cart (panier) on va afficher en html un récapitulatif de tous les articles choisis (item) par l'utilisateur (cf.DisplayItem(item) plus bas)

// altTxt: "Photo d'un canapé jaune et noir, quattre places"      ==> Tout ça c'est "item"
// color: "Black/Yellow"
// id: "415b7cacb65d43b2b5c1ff70f3393ad1"
// imageUrl: "http://localhost:3000/images/kanap02.jpeg"
// name : "Kanap Cyllène"
// price: 4499
// quantity: 1

const orderButton = document.querySelector("#order")                                // On va chercher le bouton "Commander" (id="order") et on l'assigne à la variable orderButton. 
orderButton.addEventListener("click", (e) => submitForm(e))                         // On ajoute un écouteur d'événement "click" sur le bouton "Commander". Quand on clique sur le bouton, on appelle la fonction submitForm en lui passant l'événement (e) en paramètre.


function retrieveItemsFromStorage() {                                               // Concernant les articles pour lesquels on a cliqué sur "Ajouter dans le panier", on veut récupérer ces articles stokés dans le localStorage pour après les faire apparaitre dans le panier (cart.html).
    const numberOfItems = localStorage.length                                       // On veut savoir combien d'articles sont présents dans le localStorage. On utilise localStorage.length. On l'assigne à la variable numberOfItems.
    for (let i = 0; i < numberOfItems; i++) {                                       // On parcours et récupère tous les articles présents dans le localStorage grace à une boucle for.
        const item = localStorage.getItem(localStorage.key(i)) || ""                // On récupere maintenant au sein du localStorage l'objet choisi (i) par l'utilisateur par l'intermédiaire de sa clé (identifiant de l'objet (ou des objets))
        const itemObject = JSON.parse(item)                                         // On parse l'objet récupéré pour le transformer en objet javascript. On utilise JSON.parse pour transformer une chaîne de caractères en objet javascript.
        cart.push(itemObject)                                                       // On met l'objet récupéré dans le "cart" (panier) ci-dessus.
    } 
}



function displayItem(item) {                                                        // On veut afficher le récapitulatif d'articles présent dans le panier. 
    const article = makeArticle(item)                                               // On appelle la fonction makeArticle pour créer un "article" (balise html) qui va contenir l'objet sélectionné par l'utilisateur.
    const imageDiv = makeImageDiv(item)                                             // On crée une div pour l'image de l'article sélectionné par l'utilisateur et on l'assigne à la variable imageDiv. On appelle la fonction makeImageDiv pour créer la div.
    article.appendChild(imageDiv)                                                   // On ajoute la div de l'image  à l'article (balise html) en tant qu'enfant. 
    const cardItemContent = makeCartContent(item)                                   // On ajoute le descriptif/résumé de l'objet (nom de l'objet, la couleur choisie, son prix, la quantité choisie) sélectionné par l'utilisateur juste en dessous de l'image représentant ledit objet. On appelle la fonction makeCartContent pour se faire.
    article.appendChild(cardItemContent)                                            // Grace à appenChild, on ajoute le descriptif/résumé de l'objet (ou des objets) sélectionné par l'utilisateur à l'article (balise html) en tant qu'enfant.
    displayArticle(article)                                                         // On ajoute le "article" (balise html) en tant qu'enfant de l'id "#cart__items". On appelle la fonction displayArticle pour se faire.
    displayTotalQuantity()                                                          // On affiche le nombre total (la quantité) d'objets ajoutés dans le panier. On appelle la fonction displayTotalQuantity pour se faire.
    displayTotalPrice()                                                             // On affiche le prix total d'objets ajoutés dans le panier. On appelle la fonction displayTotalPrice pour se faire.
}



function displayTotalQuantity() {                                                   // On veut connaitre le nombre total (la quantité) d'articles ajoutés dans le panier. 
    const totalQuantity = document.querySelector("#totalQuantity")                  // On va chercher dans cart.html l'élément qui va encadrer l'affichage du nombre total d'articles ajoutés dans le panier (id="totalQuantity") et on l'assigne à la variable totalQuantity.
    const total = cart.reduce((total, item) => total + item.quantity, 0)            // Reduce est une fonction qui permet de transformer une array en une seule valeur (ici le total). On va additionner la quantité de chaque article (item.quantity) pour avoir le nombre total d'articles dans le panier. On initialise le total à 0.
    totalQuantity.textContent = total
}

function displayTotalPrice() {                                                                  // On veut connaitre le prix total des articles ajoutés dans le panier
    const totalPrice = document.querySelector("#totalPrice")                                    // On va chercher dans cart.html l'élément qui va encadrer l'affichage du prix total d'articles ajoutés dans le panier (id="totalPrice") et on l'assigne à la variable totalPrice.
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)           // On va multiplier le prix de l'article par la quantité choisie par l'utilisateur. On additionne le tout pour avoir le prix total.
    totalPrice.textContent = total                                                              // On affiche le prix total calculé.
}


function makeCartContent(item) {                                                                // On veut afficher le descriptif/résumé de l'article (ou des articles) sélectionné par l'utilisateur (nom de l'objet, la couleur choisie, son prix, la quantité choisie).
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)                                                         // On appelle la fonction makeSettings pour gérer les paramètres de l'article (ou des articles) sélectionné par l'utilisateur (modification de la quantité d'objets et suppression d'un objet du panier).

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}


function makeSettings(item) {                                                                   // On veut afficher puis gérer les paramètres permettant d'une part de modifier la quantité d'articles sélectionnés par l'utilisateur et d'autre part de supprimer un objet du panier.
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)                                                       // On appelle la fonction addQuantityToSettings pour gérer la quantité d'articles sélectionnés par l'utilisateur. On lui passe en paramètre les paramètres de l'objet (ou des objets) sélectionné par l'utilisateur.
    addDeletetoSettings(settings, item)                                                         // On appelle la fonction addDeletetoSettings pour gérer la suppression d'un article du panier. On lui passe en paramètre les paramètres de l'objet (ou des objets) sélectionné par l'utilisateur.
    return settings                                                                             // On retourne les paramètres (nouvelle quantité d'objet choisie ou supression d'objet) sélectionnés par l'utilisateur.
}

function addDeletetoSettings(settings, item) {                                                  // On ajoute/affiche l'option "supprimer" un article du panier.
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))                                       // On ajoute un écouteur d'événement "click" sur le bouton "Supprimer". Quand on clique sur le bouton, on appelle la fonction deleteItem en lui passant l'article sélectionné par l'utilisateur.
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item) {                                                                                             // Gestion de la suppression d'un article du panier
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)            // Pour supprimer un élément du panier on veut d'abord trouver de quel élément (article) il s'agit. On utilise alors la méthode findIndex à qui l'on donne l'ordre suivant : Trouve l'article dont l'id est égale à l'id de celui qu'on veut supprimer, puis trouve l'article dont la couleur est égale à la couleur (choisie) pour l'article (celui qu'on veut supprimer). On assigne le tout à la variable itemToDelete.
    cart.splice(itemToDelete, 1)                                                                                        // On utilise la méthode splice pour supprimer l'article du panier (cart) en lui passant l'index de l'article à supprimer et le nombre d'articles à supprimer (1).
    displayTotalPrice()                                                                                                 // On appelle la fonction displayTotalPrice pour mettre à jour le prix total d'articles ajoutés dans le panier suite a la supression.
    displayTotalQuantity()                                                                                              // On appelle la fonction displayTotalQuantity pour mettre à jour le nombre total (la quantité) d'articles ajoutés dans le panier suite à la supression.
    deleteDataFromCache(item)                                                                                           // On appelle la fonction deleteDataFromCache pour supprimer l'objet du localStorage. 
    deleteArticleFromPage(item)                                                                                         // On appelle la fonction deleteArticleFromPage pour supprimer l'objet du panier (html) .
}

function deleteArticleFromPage(item) {                                                                                  // On veut supprimer l'article du panier (html) .  
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)         // On va chercher l'article à supprimer en utilisant le selecteur "article[data-id=" + item.id + "][data-color=" + item.color + "]" pour cibler l'article (balise html) à supprimer grace à son id et la couleur choisie par l'utilisateur.
    articleToDelete.remove()                                                                                            // On supprime l'article du panier (html) en utilisant la méthode remove() pour supprimer un élément du DOM.
}

function addQuantityToSettings(settings, item) {                                                                        // On crée la fonction chargée d'ajouter et afficher l'option de modification de la quantité d'articles sélectionnés par l'utilisateur.
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")                                                   // On crée une div pour la quantité d'articles sélectionnés par l'utilisateur et on lui ajoute la classe "cart__item__content__settings__quantity" pour pouvoir la cibler plus facilement.
    const p = document.createElement("p")
    p.textContent = "Qté : "                                                                                            // On crée un paragraphe "p" pour afficher le texte "Qté : " avant le champ de saisie de la quantité.
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"                                                                                               // On crée un champ de saisie de type "number" pour permettre à l'utilisateur de modifier la quantité d'articles sélectionnés.                           
    input.classList.add("itemQuantity")                                                                                 // On ajoute la classe "itemQuantity" au champ de saisie de la quantité pour pouvoir le cibler plus facilement.
    input.name = "itemQuantity"                                                                                         // On ajoute le nom "itemQuantity" au champ de saisie de la quantité pour pouvoir le cibler plus facilement.    
    input.min = "1"
    input.max = "100"
    input.value = item.quantity                                                                                         // On assigne la valeur de l'input à la quantité de l'article (ou des articles) sélectionné par l'utilisateur. On utilise item.quantity pour récupérer la quantité de l'article sélectionné par l'utilisateur.
    input.addEventListener("input", () => updatePriceandQuantity(item.id, item.color, input.value, item))               // On ajoute un écouteur d'événement "input" sur le champ de saisie de la quantité. Quand on modifie la quantité, on appelle la fonction updatePriceandQuantity en lui passant l'id de l'article sélectionné par l'utilisateur, la nouvelle valeur de la quantité et l'article sélectionné par l'utilisateur.

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function updatePriceandQuantity(id, color, newValue, item) {                                                            // Il s'agit de mettre à jour/modifier de manière simultanée le total du prix/quantité d'articles ajouté dans le panier par l'utilisateur en même temps qu'il manipule les inputs dédiés à la quantité d'articles souhaités.                                                     
    const itemToUpdate = cart.find((item) => item.id === id && item.color === color);                                   // On va chercher l'article à mettre à jour, c'est à dire l'article ayant une id égale à l'id de l'article dont la quantité vient d'être modifié par l'utilisateur. On assigne le tout à la variable itemToUpdate. Autrement dit : Quand tu vois un changement sur le input va chercher dans le cart l'item qui a cet id.
    itemToUpdate.quantity = Number(newValue)                                                                            // Une fois que l'article à mettre à jour (donc celui qui vient d'etre modifié/manipulé) est trouvé, sa quantité devient désormais la nouvelle valeur entrée par l'utilisateur (forcément convertit en nombre grace à "Number")
    item.quantity = itemToUpdate.quantity                                                                               // La nouvelle valeur (de quantité) entrée par l'utilisateur sur un article donné, devient la quantité de cet article. 
    displayTotalQuantity()                                                                                              // On appelle la fonction displayTotalQuantity pour mettre à jour (recalculer) le nombre total (la quantité) d'articles ajoutés dans le panier suite aux modifications de l'input. 
    displayTotalPrice()                                                                                                 // On appelle la fonction displayTotalPrice pour mettre à jour (recalculer) le prix total d'articles ajoutés dans le panier suite aux modifications de l'input. 
    saveNewDataToCache(item)                                                                                            // On appelle la fonction saveNewDataToCache pour sauvegarder la modification de la quantité dans le localStorage.
}

function deleteDataFromCache(item) {                                                                                    // Gestion de la supression de l'article du localStorage.
    const key = `${item.id}-${item.color}`                                                                              // La suppression d'un article dans le localstorage se fera par l'identification préalable d'une clé composée de l'id et la couleur de l'article sélectionné par l'utilisateur.
    localStorage.removeItem(key)                                                                                        // On supprime l'article du localStorage en utilisant la méthode removeItem pour supprimer un élément du localStorage.
}

function saveNewDataToCache(item) {                                                                                     // Gestion de l'ajout/sauvegarde de nouvelles données dans le localStorage 
    const dataToSave = JSON.stringify(item)                                                                             // On transforme l'article sélectionné par l'utilisateur en chaîne de caractères pour le stocker dans le localStorage. 
    const key = `${item.id}-${item.color}`                                                                              // L'ajout de nouvelles informations (modifications etc.) dans le localstorage se fera par l'identification préalable d'une clé composée de l'id puis de la couleur de l'article sélectionné par l'utilisateur. 
    localStorage.setItem(key, dataToSave)
}

function makeDescription(item) {                                                                                        // Creation de la fonction servant à afficher en html le descriptif/résumé de l'article ajouté dans le panier par l'utilisateur (nom de l'objet, la couleur choisie, son prix).
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

function displayArticle(article) {                                                                                      // Creation de la fonction servant à placer "article" (balise html) en tant qu'enfant de l'id "#cart__items".                    
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {                                                                                            // Creation de la fonction makeArticle pour créer un "article" (balise html) qui va contenir l'objet sélectionné par l'utilisateur.
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item) {                                                                                           // Creation de la fonction makeImageDiv pour créer une div, au sein du récapitulatif du panier, qui va contenir l'image de l'article sélectionné par l'utilisateur.
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

function submitForm(e) {                                                                                      // Gestion de la soumission du formulaire (validation des données saisies par l'utilisateur).
    e.preventDefault()                                                                                        // On empêche le comportement par défaut du formulaire (rechargement de la page) en utilisant la méthode preventDefault() sur l'événement (e).
    if (cart.length === 0) {                                                                                  // On vérifie si le panier est vide. Si c'est le cas, on affiche un message d'alerte et on arrête l'exécution de la fonction.
        alert("Please select items to buy")
        return
    }
    
    if (isFormInvalid()) return                                                                               // Si formulaire est invalide alors tu me le retourne (tu ne vas pas plus loin)
    if (isEmailInvalid()) return                                                                              // Si l'email est invalide alors tu me le retourne (tu ne vas pas plus loin)

    const body = makeRequestBody()                                                                            // On appelle la fonction makeRequestBody pour créer le corps de la requête à envoyer à l'API. On lui passe en paramètre le corps de la requête (body) contenant les informations de contact et les produits sélectionnés par l'utilisateur.                                                              
    fetch("http://localhost:3000/api/products/order", {                                                        
        method: "POST",                                                                                       // On utilise la méthode POST pour envoyer des données (ici le body contenant les informations de contact et les produits sélectionnés par l'utilisateur) à l'API.      
        body: JSON.stringify(body),                                                                           // On va stringifyer le body du dessus (const body = makeRequestbody)
        headers: {                                                                                            // On définit les en-têtes de la requête (headers) pour indiquer que le corps de la requête est au format JSON.
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())                                                                            // On utilise la méthode then pour traiter la réponse de l'API. On transforme la réponse en JSON.
        .then((data) => {                                                                                     // Une fois qu'on a récupéré la réponse
            const orderId = data.orderId                                                                      // 
            window.location.href = "\confirmation.html" + "?orderId=" + orderId                               // ...on redirige l'utilisateur vers la page de confirmation de commande en lui passant l'orderId en paramètre dans l'URL. 
        })
        .catch ((err) => console.error(err))                                                                  // console.error ecrit un message dans la console en rouge avce une croix zu début (histoire que l'erreur saute aux yeux)
}
 
function isEmailInvalid() {                                                                                   // Gestion de la validation de l'email (vérification que l'email est valide).
    const email = document.querySelector("#email").value
    const regex = /^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/                                          // On utilise une expression régulière pour vérifier que l'email est valide. L'expression régulière vérifie que l'email contient un nom d'utilisateur, un symbole @, un nom de domaine et une extension de domaine. 
    if (regex.test(email) === false) {
        alert("Please enter valid email")
        return true
    }
    return false
}

function isFormInvalid() {                                                                                    // Gestion de la validation du formulaire (vérification que tous les champs sont remplis).
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")                                                             // On recupere tous les inputs du formulaire
    inputs.forEach((input) => {                                                                               // Pour chaque input...
        if (input.value === "") {                                                                             // ...si la value est "null" dans l'une d'elles...
            alert("Please fill all the fields")                                                               // ...message d'alerte.
            preventDefault()                                                                                  // ...on empêche le comportement par défaut du formulaire (rechargement de la page + soumission du formulaire). 
            return true                                                                                       // + return true qui signifie "Effectivement, la condition s'applique à savoir que l'input est vide et dois donc enclencher le message d'alerte ainsi que le preventDefault" 
        }
        return false                                                                                          // Sinon return false : non la condition ne s'applique pas !
    })
}

function makeRequestBody() {                                                                                  // Gestion de la création du corps de la requête (body) à envoyer à l'API contenant les informations de contact et les produits sélectionnés par l'utilisateur.
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value                                                           // On récupère la valeur de chaque input 
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {                                                                                           
        contact: {                                                                                            // On crée un objet contact contenant les informations de contact de l'utilisateur (firstName, lastName, address, city, email).
            firstName: firstName,                                                                               
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIdsFromCache()                                                                           // On appelle la fonction getIdsFromCache pour récupérer les ids des produits présents dans le localStorage.
    }
    return body                                                                                               // On retourne le corps de la requête (body) contenant les informations de contact et les produits sélectionnés par l'utilisateur.
}


function getIdsFromCache() {                                                                                  // On veut récupérer les ids (les identifiants) des produits présents dans le localStorage pour les envoyer à l'API lors de la soumission du formulaire. On va donc créer une fonction qui va nous permettre de récupérer les ids des produits présents dans le localStorage.
    const numberOfProducts = localStorage.length                                                            
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {                                                              // On parcours le localStorage pour récupérer les ids des produits présents dans le localStorage.
        const key = localStorage.key(i)
        const id = key.split("-")[0]                                                                          // Nous voulons juste le coté gauche de l'id et non la mention de la couleur qui se trouve du coté drroit. Nous faisons donc un split au niveau du trait d'union.
        ids.push(id)                                                                                          // On va prendre l'id récupéré dans la ligne de code du dessus (cont id) pour l'ajouter (push) dans const ids (contenant un tableau vide comme on peut le voir)
    }
    return ids
}
