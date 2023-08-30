import { objModalidadesDificultades } from "./dificultades_obj.js";
window.addEventListener('DOMContentLoaded',function(){
    const MODOS_HTML = document.querySelectorAll('.modos')
    const LOBBY_HTML = document.getElementById('lobby')
    const LOGO_HTML = document.getElementById('logo')
    let nombre_jugador_HTML = document.getElementById('nombre_jugador')
    let audio_modo = new Audio("sonidos/audios/woosh.mp3")
    let audio_dificultad = new Audio("sonidos/audios/ping.mp3")
    let audio_cerrar_dificultad = new Audio('sonidos/audios/swoosh_2.mp3')
    let audio_game_logo = new Audio('sonidos/audios/game_pad.mp3')
    let id_modo = ''
    
    
    MODOS_HTML.forEach(function(currentValue,index,item){
        
        currentValue.addEventListener('click',function(){
            audio_modo.play()
            id_modo = currentValue.id
            ventanaDificultad(id_modo)
        })
    });
    function ventanaDificultad(id_modo){
        
        if('modo_html' === id_modo){
            
            crearVentanaModalidades(id_modo)
            deshabilitarModo()
            
        }else if('modo_css' === id_modo){
            deshabilitarModo()
            crearVentanaModalidades(id_modo)
        }
    }
    function deshabilitarModo(){
        MODOS_HTML[0].classList.add('deshabilitar')
        MODOS_HTML[1].classList.add('deshabilitar')
    }

    

    function crearVentanaModalidades(id_modo){
        let ventana_modalidad_JS = document.createElement('div')
        let id_ventana = id_modo.substring(5)
        let cerrar_JS = document.createElement('p')
        ventana_modalidad_JS.classList.add('ventana_modo')
        ventana_modalidad_JS.id = id_ventana
        cerrar_JS.classList.add('cerrar_dificultad')
        cerrar_JS.textContent = 'X'
        cerrar_JS.id = 'cerrar'

        ventana_modalidad_JS.insertAdjacentElement("afterbegin",cerrar_JS)
        LOBBY_HTML.insertAdjacentElement('beforeend',ventana_modalidad_JS)
        
        if('modo_html' === id_modo){

            for(let propiedad in objModalidadesDificultades){
                if(propiedad === id_modo){
                    for(let dificultades in objModalidadesDificultades[id_modo]){
                        let elementos_dificultades_JS = document.createElement('div')
                        elementos_dificultades_JS.classList.add('modo_dificultad')
                        let id = objModalidadesDificultades[id_modo][dificultades].id
                        let text = id
                        elementos_dificultades_JS.id = id
                        elementos_dificultades_JS.textContent = text
                        ventana_modalidad_JS.insertAdjacentElement('afterbegin',elementos_dificultades_JS)
                        console.log(objModalidadesDificultades[id_modo][dificultades].id)
                    }
                    if(ventana_modalidad_JS !== null){
                        let modo_dificultad_HTML = document.querySelectorAll('.modo_dificultad')
                        if( modoSeleccionado !== null){
                            modoSeleccionado(modo_dificultad_HTML)

                        }
                    }
                    
                    
                }
            } 
        }else if('modo_css' === id_modo){
            for(let propiedad in objModalidadesDificultades){
                if(propiedad === id_modo){
                    for(let dificultades in objModalidadesDificultades[id_modo]){
                        let elementos_dificultades_JS = document.createElement('div')
                        elementos_dificultades_JS.classList.add('modo_dificultad')
                        let id = objModalidadesDificultades[id_modo][dificultades].id
                        let text = id
                        elementos_dificultades_JS.id = id
                        elementos_dificultades_JS.textContent = text
                        ventana_modalidad_JS.insertAdjacentElement('afterbegin',elementos_dificultades_JS)
                        console.log(objModalidadesDificultades[id_modo][dificultades].id)
                        
                    }
                    if(ventana_modalidad_JS !== null){
                        let modo_dificultad_HTML = document.querySelectorAll('.modo_dificultad')
                        if( modoSeleccionado !== null){
                            modoSeleccionado(modo_dificultad_HTML)

                        }
                    }
                    
                }
            } 
        }

        eliminarVentanaDificultad(cerrar_JS,id_ventana)
    }
    function eliminarVentanaDificultad(cerrar_JS, id_modo){
        let eliminar_ventada_modalidad_HTML = document.getElementById(id_modo)
        if(cerrar_JS.parentNode !== null){
            console.log("El elemento está en el DOM")
            cerrar_JS.addEventListener('click',function(){
                audio_cerrar_dificultad.play()
                eliminar_ventada_modalidad_HTML.remove()
                MODOS_HTML[0].classList.remove('deshabilitar')
                MODOS_HTML[1].classList.remove('deshabilitar')
            })
        }
    }
    function modoSeleccionado(modo_de_dificultad){
        console.log(modo_de_dificultad)
        modo_de_dificultad.forEach(function(currentValue,index,item){
            console.log("eeeeeeeeeeeeeee")
            currentValue.addEventListener('click',function(){
                audio_dificultad.play()
                let obtenerNombreValidado = validarNombreJugador()
                console.log(currentValue.id)
                redireccionarJugadorAlJuego(currentValue,obtenerNombreValidado)
            })
        })
    }

    LOGO_HTML.addEventListener("mouseenter",function(){
        LOGO_HTML.style.animation = "animateLogoTemblor 2s linear";
        audio_game_logo.play()  
        setTimeout(eliminarAnimation, 3000);
    })
    function eliminarAnimation(){
        LOGO_HTML.style.animation = "None"
    }
    function validarNombreJugador(){
        let nombre_jugador = nombre_jugador_HTML.value
        let nuevo_nombre = ""
        if(nombre_jugador.trim().length === 0){
            console.log("No puede estar vacio el nombre")
        }else{
            let nombreValidadoBandera = false
            for (let caracter = 0; caracter < nombre_jugador.length; caracter++) {
                let deletreo = nombre_jugador[caracter]

                if(deletreo === "<" || deletreo === ">" ||
                    deletreo === "." || deletreo === "," || 
                    deletreo === ";" || deletreo === "-" || 
                    deletreo === "+" || deletreo === "*"){
                    console.log("eliminar caracter: ",deletreo)
                    nombreValidadoBandera = false
                }else{
                    /* nuevo_nombre += deletreo */
                    nuevo_nombre += deletreo
                    nombreValidadoBandera = true
                }
            }
            if (nombreValidadoBandera === true){
                return nuevo_nombre
            }
        }
        
    }
    function redireccionarJugadorAlJuego(currentValue,obtenerNombreValidado){
        let modo_seleccionado = currentValue.textContent
        console.log(modo_seleccionado)
        if("facil" === modo_seleccionado || "normal" === modo_seleccionado ||
        "dificil" === modo_seleccionado || "avanzado" === modo_seleccionado){
            let nombreEncriptado = encodeURIComponent(obtenerNombreValidado)
            let repositorioInicial = 'Frontend-Test';
            window.location.href = repositorioInicial +'../templates/juego.html?nombre=' + nombreEncriptado +'?modo='+ modo_seleccionado
            console.log("El modo seleccionado es:",modo_seleccionado)
        }else{
            console.log("Error de sistema")
        }
        
    }
})

