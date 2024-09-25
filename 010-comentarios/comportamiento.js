window.onload = function(){
    // Cargo los clientes
    fetch("productos.json")
    .then(function(response){
        return response.json()
    })
    .then(function(datos){
        console.log(datos)
        // Primero leo las claves del primer registro
        let primerregistro = datos[0]
        console.log(primerregistro)
        // Una vez que tengo el primer registro, ahora solo quiero las claves
        let claves = Object.keys(primerregistro)
        console.log(claves)
        // Ahora repaso una a una las claves y las pongo como columnas de la tabla
        claves.forEach(function(clave){
            let cabecera = document.querySelector("table thead tr")
            let nuevacabecera = document.createElement("th")
            nuevacabecera.textContent = clave
            cabecera.appendChild(nuevacabecera)
        })
        // Ahora pongo el contenido dinámico
        let contenedordatos = document.querySelector("table tbody")
        datos.forEach(function(registro){
            let fila = document.createElement("tr")
            claves.forEach(function(clave){
                let nuevacelda = document.createElement("td")
                nuevacelda.textContent = registro[clave]
                fila.appendChild(nuevacelda)
            })
            contenedordatos.appendChild(fila)
        })
    })
}