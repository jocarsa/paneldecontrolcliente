window.onload = function(){                                     // Solo ejecuto Javascript cuando el documento haya cargado
    
    ///////////////////////////// MENU DE NAVEGACION ////////////////////////////////////
    
    fetch("tablas.json")                                     // Cargo un json con información
    .then(function(response){                                   // Cauando cargue ese json
        return response.json()                                  // Convierto la respuesta a json (espero que lo que venga sea json)
    })
    .then(function(datos){                                      // Cuando el paso anterior haya sido completado
        let navegacion = document.querySelector("nav ul")
        datos.forEach(function(elemento){
            let elementomenu = document.createElement("li")
            elementomenu.textContent = elemento.nombre
            elementomenu.onclick = function(){
                console.log("Has hecho click en un elemento del menu")
                console.log("Voy a cargar el json: "+this.textContent)
                cargaTabla(this.textContent)
            }
            navegacion.appendChild(elementomenu)
        })
    })
    
    ///////////////////////////// MENU DE NAVEGACION ////////////////////////////////////
      
    ///////////////////////////// MODAL APARECE Y DESAPARECE ////////////////////////////////////

    document.getElementById("crear").onclick = function(){
        document.getElementById("contienemodal").classList.add("aparece")
        document.getElementById("contienemodal").style.display = "block"  
    }
    document.getElementById('modal').onclick =  function(event) {
        event.stopPropagation(); 
    }
    document.getElementById("contienemodal").onclick = function(){
        document.getElementById("contienemodal").classList.remove("aparece")
        document.getElementById("contienemodal").classList.add("desaparece")
        setTimeout(function(){
            document.getElementById("contienemodal").style.display = "none"
        },1000)
          
    }

    ///////////////////////////// MODAL APARECE Y DESAPARECE ////////////////////////////////////
}


///////////////////////////// CONTENIDO DE LA TABLA ////////////////////////////////////
    
    function cargaTabla(tabla){
        document.querySelector("table thead tr").innerHTML = ""
        document.querySelector("table tbody").innerHTML = ""
        document.querySelector("section h3").innerHTML = tabla
        fetch(tabla+".json")                                     // Cargo un json con información
        .then(function(response){                                   // Cauando cargue ese json
            return response.json()                                  // Convierto la respuesta a json (espero que lo que venga sea json)
        })
        .then(function(datos){                                      // Cuando el paso anterior haya sido completado
            let primerregistro = datos[0]                           // Cargo el primer registro de los datos
            let claves = Object.keys(primerregistro)                // Me quedo solo con las columnas (las claves)
            let cabecera = document.querySelector("table thead tr") // Selecciono la cabecera de la tabla
            let modal = document.getElementById("modal")
            modal.innerHTML = ""
            claves.forEach(function(clave){                         // Para cada una de las claves
                let nuevacabecera = document.createElement("th")    // Genero un nuevo table heading
                nuevacabecera.textContent = clave                   // el contenido en texto es el nombre de la clave
                cabecera.appendChild(nuevacabecera)                 // Añado un nuevo elemento a la cabecera
                let entrada = document.createElement("input")
                entrada.setAttribute("placeholder",clave)
                modal.appendChild(entrada)
                
            })
            let botonenviar = document.createElement("button")
            botonenviar.textContent = "Enviar"
            botonenviar.onclick = function(){
                console.log("Enviamos los datos")
            }
            modal.appendChild(botonenviar)
            
            let contenedordatos = document.querySelector("table tbody") // Selecciono ahora el CUERPO de la tabla
            datos.forEach(function(registro){                       // Para cada uno de los dato del json de entrada
                let fila = document.createElement("tr")             // Creo una nueva fila
                claves.forEach(function(clave){                     // Dentro de la fila, para cada una de las columnas
                    let nuevacelda = document.createElement("td")   // Creo un nuevo elemento td
                    nuevacelda.textContent = registro[clave]        // Le pongo el texto que corresponde a esa columna
                    fila.appendChild(nuevacelda)                    // Añado la columna a la fila
                })
                contenedordatos.appendChild(fila)                   // Y ahora añado la fila al cuerpo de la tabla
            })
        })
    }
    ///////////////////////////// CONTENIDO DE LA TABLA ////////////////////////////////////

