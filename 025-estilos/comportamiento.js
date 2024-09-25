window.onload = function(){                                     // Solo ejecuto Javascript cuando el documento haya cargado
    
    ///////////////////////////// MENU DE NAVEGACION ////////////////////////////////////
    
    fetch("tablas.json")                                        // Cargo un json con información
    .then(function(response){                                   // Cauando cargue ese json
        return response.json()                                  // Convierto la respuesta a json (espero que lo que venga sea json)
    })
    .then(function(datos){                                      // Cuando el paso anterior haya sido completado
        let navegacion = document.querySelector("nav ul")       // Cargo el elemento de lista de la navegacion
        datos.forEach(function(elemento){                       // PAra cada uno de los elementos del conjunto de datos
            let elementomenu = document.createElement("li")     // Creo un elemento li de lista
            elementomenu.textContent = elemento.nombre          // A ese elemento le pongo el nombre de la tabla
            elementomenu.onclick = function(){                  // Y cuando haga click en ese elemento
                cargaTabla(this.textContent)                    // Cargo la tabla correspondiente a ese elemento
               
                var elementosmenu = document.querySelectorAll("nav ul li")
                elementosmenu.forEach(function(elemento){
                    elemento.classList.remove("seleccionado")
                })
                
                this.classList.add("seleccionado")
            }
            navegacion.appendChild(elementomenu)                // Añado el elemento al menu de navegación
        })
    })
    
    ///////////////////////////// MENU DE NAVEGACION ////////////////////////////////////
      
    ///////////////////////////// MODAL APARECE Y DESAPARECE ////////////////////////////////////

    document.getElementById("crear").onclick = function(){                  // Cuando hago click en crear nuevo elemento
        document.getElementById("contienemodal").classList.add("aparece")   // El contiene modal aparece con animacion
        document.getElementById("contienemodal").style.display = "block"    // Se pone visible
    }
    document.getElementById('modal').onclick =  function(event) {           // Cuando hago click en el modal
        event.stopPropagation();                                            // No ocurre nada y no propaga la acción al parent
    }
    document.getElementById("contienemodal").onclick = function(){          // Cuando hago click en el fondo
        document.getElementById("contienemodal").classList.remove("aparece")// LE quito la clase de la animacion
        document.getElementById("contienemodal").classList.add("desaparece")   // Le pongo la clase de aparecer
        setTimeout(function(){                                              // DEspues de un segundo
            document.getElementById("contienemodal").style.display = "none" // Le quito la visibilidad
        },1000)
          
    }

    ///////////////////////////// MODAL APARECE Y DESAPARECE ////////////////////////////////////
    
    ///////////////////////////// ESTILO MENU ////////////////////////////////////
    
    
    
    ///////////////////////////// ESTILO MENU ////////////////////////////////////
}


///////////////////////////// CONTENIDO DE LA TABLA ////////////////////////////////////
    
    function cargaTabla(tabla){                                     // Función que carga el contenido de una tabla
        var globaltabla = tabla                                     // creo una variable global dentro de la funcion
        document.querySelector("table thead tr").innerHTML = ""     // Vacío la cabecera de la tabla
        document.querySelector("table tbody").innerHTML = ""        // Vacío el cuerpo de la tabla
        document.querySelector("section h3").innerHTML = tabla      // Le pongo nombre al titulo de la tabla
        var fecha = new Date()
        fetch(tabla+".json?fecha="+fecha.getTime())                 // Cargo un json con información
        .then(function(response){                                   // Cauando cargue ese json
            return response.json()                                  // Convierto la respuesta a json (espero que lo que venga sea json)
        })
        .then(function(datos){                                      // Cuando el paso anterior haya sido completado
            let primerregistro = datos[0]                           // Cargo el primer registro de los datos
            let claves = Object.keys(primerregistro)                // Me quedo solo con las columnas (las claves)
            let cabecera = document.querySelector("table thead tr") // Selecciono la cabecera de la tabla
            let modal = document.getElementById("modal")            // Selecciono el modal
            modal.innerHTML = ""                                    // Vacío el modal
            let camposenviar = []                                   // Creo un conjunto para ponerle los campos del formulario
            claves.forEach(function(clave){                         // Para cada una de las claves
                let nuevacabecera = document.createElement("th")    // Genero un nuevo table heading
                nuevacabecera.textContent = clave                   // el contenido en texto es el nombre de la clave
                cabecera.appendChild(nuevacabecera)                 // Añado un nuevo elemento a la cabecera
                let entrada = document.createElement("input")       // Creo una nueva entrada para el formulario
                camposenviar.push(entrada)                          // Añado el campo al conjunto de campos que he creado antes
                entrada.setAttribute("placeholder",clave)           // Le añado un atributo a ese campo
                modal.appendChild(entrada)                          // Añado el campo al modal
                
            })
            let columnaoperaciones = document.createElement("th")   // En la cabecera creo una columna vacia para operaciones
            cabecera.appendChild(columnaoperaciones)                // Añado la columna a la cabecera
            let botonenviar = document.createElement("button")      // Creo un boton de enviar el formulario
            botonenviar.textContent = "Enviar"                      // Le pongo texto al boton
            botonenviar.onclick = function(){                       // Cuando sobre el boton de enviar haga click¡      
                let datosenviar = {}                                // Creo un contenedor vacio
                camposenviar.forEach(function(elemento){            // Para cada uno de los campos
                    datosenviar[elemento.getAttribute("placeholder")] = elemento.value  // Añado el contenido del campo al contenedor
                })
                fetch("nuevoregistro.php?tabla="+globaltabla, {     // lLamo a crear un nuevo registro
                  method: 'POST', 
                  headers: {
                    'Content-Type': 'application/json', 
                  },
                  body: JSON.stringify(datosenviar)
                })
                .then(function(response){
                    return response.json()                          // Ahora mismo no hace nada
                })
                .then(function(datos){
                    document.getElementById("contienemodal").style.display = "none" // Escondo la ventana modal
                    setTimeout(function(){                          // Despues de un segundo para darle tiempo a PHP
                        cargaTabla(tabla)                           // Cargo de nuevo la tabla para ver modificaciones
                    },1000)
                    
                })
            }
            modal.appendChild(botonenviar)
            var identificador;                                      // Creo una variable id para cada fila
            let contenedordatos = document.querySelector("table tbody") // Selecciono ahora el CUERPO de la tabla
            datos.forEach(function(registro){                       // Para cada uno de los dato del json de entrada
                let fila = document.createElement("tr")             // Creo una nueva fila
                claves.forEach(function(clave){                     // Dentro de la fila, para cada una de las columnas
                    if(clave == "id"){identificador = registro[clave]}
                    let nuevacelda = document.createElement("td")   // Creo un nuevo elemento td
                    nuevacelda.textContent = registro[clave]        // Le pongo el texto que corresponde a esa columna
                    fila.appendChild(nuevacelda)                    // Añado la columna a la fila
                })
                let celdaoperaciones = document.createElement("td") // Creo una celda en cada fila
                celdaoperaciones.setAttribute("identificador",identificador)    // Le pongo id clave primaria
                celdaoperaciones.textContent = "🗑️"                  // Le pongo un emoji de papelera
                celdaoperaciones.onclick = function(){              // Cuand haga click en la papelera
                    let idlocal = this.getAttribute("identificador")// Atrapo el id
                    fetch("eliminaregistro.php?id="+idlocal+"&tabla="+globaltabla)  // LLamo a un php y le paso el id
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(datos){
                        setTimeout(function(){                      // Dentro de un segundo
                            cargaTabla(globaltabla)                 // Vuelvo a cargar la tabla para ver actualizaciones
                        },1000)
                    })
                }
                fila.appendChild(celdaoperaciones)                  // Añado la columna de la papelera a la tabla
                contenedordatos.appendChild(fila)                   // Y ahora añado la fila al cuerpo de la tabla
            })
        })
    }
    ///////////////////////////// CONTENIDO DE LA TABLA ////////////////////////////////////

