const orderId = getOrderId()                                      // On appelle la fonction ecrite plus bas destinée à récupérer le numéro de commande
displayOrderId(orderId)                                           // On appelle la fonction ecrite plus bas destinée à afficher le numero de commande 
removeAllCache()                                                  // On appelle la fonction ecrite plus bas destinée à supprimer le cache (les données du localstorage)
 

function getOrderId() {                                           // On cherche ici à récuperer l'id de commande (orderId) qui est dans l'url (après le "?") et qui se trouve en paramètre de la requête (ex : ?orderId=1234567890)
const queryString = window.location.search                        // On va récupèrer la partie de l'url qui contient les paramètres de la requête (après le "?")
const urlParams = new URLSearchParams(queryString)                // On va créer un objet URLSearchParams à partir de la chaîne de requête (queryString) pour pouvoir manipuler les paramètres de l'url plus facilement
return urlParams.get("orderId")                                   // Cette fonction va "retourner" (par l'intermediaire de "return") l'id qu'aura trouvé le URLSearchParams
}


function displayOrderId() {                                       // On va maintenant afficher l'id trouvé en html                   
    const orderIdElement = document.getElementById("orderId")     // On va chercher l'élément html qui a pour id "orderId" et on l'assigne à la variable orderIdElement
    orderIdElement.textContent = orderId                          // On y incorpore l'id de commande comme dans le html de tel sorte que : "<p>Votre commande n°1234567890</p>"
}
 
function removeAllCache() {                                       // On vide, supprime les données du local storage une fois la commande validée et le numéro de commande communiqué !
    const cache = window.localStorage                             //
    cache.clear()                                                 // On vide le local storage (le cache) en utilisant la méthode clear() de l'objet localStorage. 
}
