function afficher() {
// GET JSON : Obtenir les données du serveur JSON
    $.getJSON('https://64024cc7302b5d671c37f4b9.mockapi.io/users')
        .done(function (users) {
            for (user of users) {
                $("body").append(`
                <p id='user${user.id}'>${user.id}, ${user.username}, ${user.email}</p>
            `)
            }
        });
}

$("form").submit(function (){
    //POST : Envoyer des données au serveur JSON
    $.ajax('https://64024cc7302b5d671c37f4b9.mockapi.io/users', {
        data : JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val() }),
        contentType : 'application/json',
        type : 'POST'
    });
});

function modifier(){
    //Modifier l'utilisateur avec le id choisi.
    //Référence : https://github.com/mockapi-io/docs/wiki/Code-examples
    fetch('https://64024cc7302b5d671c37f4b9.mockapi.io/users/'+$("#id").val(), {
        method: 'PUT', // or PATCH
        headers: {'content-type':'application/json'},
        body: JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val() })
    }).then(function (){
        //Mette à jour l'affichage de façon dynamique, sans recharger la page
        $("#user"+$("#id").val()).text($("#id").val() + ", " + $("#username").val() + ", " + $("#email").val());
    })
}

function supprimer(){
    //Supprimer le user avec le id choisi à l'aide de la commande ajax fetch et la methode delete du serveur.
    //Référence : https://github.com/mockapi-io/docs/wiki/Code-examples
    fetch('https://64024cc7302b5d671c37f4b9.mockapi.io/users/'+$("#id").val(), {
        method: 'DELETE',
    }).then(function (){
        $("#user"+$("#id").val()).remove();
    });
}

afficher();