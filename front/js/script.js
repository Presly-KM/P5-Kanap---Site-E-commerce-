fetch("http://localhost:3000/api/products")                                        // On va chercher l'API (l'url) qui nous permet de récupérer les produits.
    .then((response) => response.json())                                           // On va chercher la réponse de l'API et on la transforme en JSON. On utilise la méthode "then" pour dire que lorsque l'on a une réponse, on fait quelque chose avec. 
    .then((data) => addProducts(data))                                             // On récupère les données de l'API et on les envoie à la fonction addProducts. 

// altTxt: "Photo d'un canapé bleu, deux places"
// colors: (3) ['Blue', 'White', 'Black'] 
// description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// imageUrl : "http://localhost:3000/images/kanap01.jpeg"
// name : "Kanap Sinopé"
// price : 1849
// _id : "107fb5b75607497b96722bda5b504926"


// Une fois qu'on est parvenu à récuperer les données on veut maintenant les afficher de maniere automatisée dans notre index.html 


function addProducts(couches) {                                                    // On crée une fonction addProducts qui va nous permettre d'ajouter les produits à la page. On lui passe en paramètre les données de l'API (couches).
    // const _id = couches[0]._id                                                   
    // const imageUrl = couches[0].imageUrl
    // const altTxt = couches[0].altTxt
    // const name = couches[0].name
    // const description = couches[0].description

    couches.forEach((couch) => {                                                   // Methode forEach qui ici signifie que pour chaque canapé on récupère les données qui lui sont associés au sein de "couches" --> (id, image, altTxt,name, description) =
        const { _id, imageUrl, altTxt, name, description } = couch                 // On utilise la destructuration pour récupérer les données de l'API. On crée une variable pour chaque donnée que l'on va utiliser. 
        const anchor = makeAnchor(_id)                                             // On appelle la fonction makeAnchor qui va nous permettre de créer un lien vers le produit. On lui passe en paramètre l'id du produit.
        const article = document.createElement("article")                          // On crée un élément <article> et on l'assigne à la variable article. On crée le "<article>...</article>"
        const image = makeImage(imageUrl, altTxt)                                  // On appelle la fonction makeImage qui va nous permettre de créer une image. On lui passe en paramètre l'url de l'image et le texte alternatif.
        const h3 = makeH3(name)                                                    // On appelle la fonction makeH3 qui va nous permettre de créer un titre. On lui passe en paramètre le nom du produit.
        const p = makeParagraph(description)                                       // On appelle la fonction makeParagraph qui va nous permettre de créer une description. On lui passe en paramètre la description du produit.

        appendElementsToArticle(article, [image, h3, p])                           // On appelle la fonction appendElementsToArticle qui va nous permettre d'ajouter les éléments à l'article(balise html). 
        appendArticleToAnchor(anchor, article)                                     // On appelle la fonction appendArticleToAnchor qui va nous permettre d'ajouter l'article(balisehtml) à l'ancre. On lui passe en paramètre l'ancre et l'article.
    })
}

function appendElementsToArticle(article, array) {                                 // On crée une fonction qui va nous permettre d'ajouter les éléments à l'article.  
    array.forEach((item) => {                                                      // Pour chaque élément (item) au sein du tableau(array)... /
        article.appendChild(item)                                                  // ...ajoute cet élément à l'article (balise html)
    })
    // article.appendChild(image)
    // article.appendChild(h3)
    // article.appendChild(p)
}

function makeAnchor(id) {                                                          // 1.On crée une fonction qui va nous permettre de créer un lien (un <a>) vers le produit qu'on cible (en cliquant dessus par exemple)                
    const anchor = document.createElement("a")                                     // On crée un élément <a> (un lien) et on l'assigne à la variable anchor. On crée le "<a>...</a>"
    anchor.href = "./product.html?id=" + id                                        // On y incorpore le lien vers le produit comme dans le html de tel sorte que : "<a href="./product.html?id=42">". On ajoute "id" à la fin pour qu'on soit redirigé vers un artcicle bien précis grace aux paramètres de l'url (UrlParams) fournis par "id" et qui se situent après le point d'interrogation (?). (Ex : ?id=a557292fe5814ea2b15c6ef4bd73ed83)
    return anchor
}

function appendArticleToAnchor(anchor, article) {                                  // 2. On va chercher l'élément qui va encadrer la génération de l'article
    const items = document.querySelector("#items")                                 // On va chercher l'élément qui va encadrer la génération de l'article (le <section id="items">) et on l'assigne à la variable items. On utilise le selecteur "#items" pour dire que l'on veut l'élément qui a pour id "items".
    if (items != null) {                                                           // On verifie que l'élément existe bien et si il n'existe pas...
        items.appendChild(anchor)                                                  // On ajoute l'élément <a> (anchor) à l'élément <section id="items"> (items) en tant qu'enfant. On utilise la méthode appendChild pour ajouter un élément enfant à un élément parent.
        anchor.appendChild(article)                                                // On ajoute l'élément <article> (article) à l'élément <a> (anchor) en tant qu'enfant. 
    }
}

function makeImage(imageUrl, altTxt) {                                             // On crée une fonction qui va nous permettre de créer une image (un <img>) et on lui passe en paramètre l'url de l'image et le texte alternatif.
    const image = document.createElement("img")                                    // On crée un élément <img> et on l'assigne à la variable image. On crée le "<img src="..." alt="...">"
    image.src = imageUrl                                                           // On y incorpore l'url de l'image comme dans le html de tel sorteque : "<img src="http://localhost:3000/images/kanap01.jpeg" alt="Photo d'un canapé bleu, deux places">"                                 
    image.alt = altTxt                                                             // On y incorpore le texte alternatif de l'image comme dans le html de tel sorteque : "<img src="..." alt="Photo d'un canapé bleu, deux places">"
    image.removeAttribute("title")                                                 // On supprime l'attribut title de l'image car il n'est pas nécessaire. On utilise la méthode removeAttribute pour supprimer un attribut d'un élément.
    image.removeAttribute("style")                                                 // On supprime l'attribut style de l'image car il n'est pas nécessaire. On utilise la méthode removeAttribute pour supprimer un attribut d'un élément.
    return image
}


function makeH3(name) {                                                            // On crée une fonction qui va nous permettre de créer un titre (un <h3>) et on lui passe en paramètre le nom du produit.
    const h3 = document.createElement("h3")                                        // On crée un élément <h3> et on l'assigne à la variable h3. On crée le "<h3>...</h3>"
    h3.textContent = name                                                          // On y incorpore le nom du produit comme dans le html de tel sorteque : "<h3>Kanap Sinopé</h3>"
    h3.classList.add("productName")                                                // La aussi on ajoute le productname pour rester fidele a ce qu'on voit dans le html
    return h3
}

function makeParagraph(description) {                                              // On crée une fonction qui va nous permettre de créer une description du produit concerné(un <p>) et on lui passe en paramètre la description du produit.
    const p = document.createElement("p")                                          // On crée un élément <p> et on l'assigne à la variable p. On crée le "<p>...</p>"
    p.textContent = description                                                    // On y incorpore la description du produit comme dans le html de tel sorteque : "<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
    p.classList.add("productDescription")                                          // La aussi on ajoute le productdescription pour rester fidele a ce qu'on voit dans le html
    return p 
}

