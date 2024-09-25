window.onload = function(){
    // Cargo los clientes
    fetch("clientes.json")
    .then(function(response){
        return response.json()
    })
    .then(function(datos){
        console.log(datos)
    })
}