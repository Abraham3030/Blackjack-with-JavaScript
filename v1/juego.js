(() => {
/**
 * 2C = Two  of Clubs (Tréboles)
 * 2D = Two of Diaminds (Diamantes) 
 * 2H = Two i Heartes (Corazones)
 * 2S = Two of Spades (Espadas)
 */
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K' ];

    let puntosJugador = 0,
        puntosComputadora = 0;

    /////////// Referencias del HTML /////////////
    // Creamos una constante para hacer referencia al boton pedir
    const btnPedir      = document.querySelector('#btnPedir'),
          btnDetener    = document.querySelector('#btnDetener'),
          btnNuevo      = document.querySelector('#btnNuevo');

    /* Creacion de las cartas, cuando el jugador pide una van saliendo las que 
    va creando la funcion pedirCarta*/
    /* Los puntos que se crean cuando el usuario pide una carta con el boton pedir
    se van a referenciar en la etiqueta small del HTML, con la funcion creada en 
    los eventos de btnPedir, puntosJugador = puntosJugador + valorCarta( carta ); */
    const divCartasJugador       = document.querySelector('#jugador-cartas'),
          divCartasComputadora   = document.querySelector('#computadora-cartas'),
          puntosHTML = document.querySelectorAll('small');
       
    // Esta funcion iniciliza el juego
    const inicializarJuego = () => {
        deck = crearDeck();
    }

    // Esta función crea una mazo de cartas aleatorias
    const crearDeck = () => {
        for(let i = 2; i <= 10; i ++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
        }
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        return _.shuffle( deck );;
    }
    
        
    // Esta fucnión me permite tomar una carta
    const pedirCarta =() => {
        if( deck.length === 0 ){
            throw 'No hay cartas en el deck'; // throw sirve para enviar una alerta
        }
        return deck.pop();
    }

    //pedirCarta();

    /*for( let i = 0; i <= 52; i ++){
        pedirCarta();
    }
    Comprobación de que si se ejecuta la funcion*/

    const valorCarta = ( carta ) => {

        //segundo codigo mejorado
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ?
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
        
        //primer codigo
        //const valor = carta.substring(0, carta.length - 1);
        //let puntos = 0;
        // 2 = 2, 10 = 10, 3 = 3
        //if( isNaN( valor ) ) {
            //console.log('No es un número');
            //puntos = ( valor === 'A') ? 11 : 10; // operador ternario para decir que si es una a retorne un 11 sino un 10
        //} else {
            //console.log('Es un numero');
            //puntos = valor * 1; // valor es un string entonces multiplicamos por 1 para comvertirlo a un numero
        //}
        //console.log({ valor });
        //console.log(puntos);

    }
    // primer codigo
    //valorCarta('9D');

    //segundo codigo mejorado
    //const valor = valorCarta('KD'); // ejemplo de como imprime el valor
    const valor = valorCarta( pedirCarta() );// ahora vamos a mandar llamar la funcion que pide la carta y retorna el valor de la carta
    //console.log({ valor });

    ////////////Turno Computadora//////////
    //Condiciones usar un ciclo do while para que por lo menos se ejecute una vez el turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        //Usaremos el mismo codido btnPedir
        do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${carta}.png`; // cartas de la carpeta 2D, etc
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        
        if( puntosMinimos > 21){
            break;
        }

        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        //ejecutar despues de pedir las cartas y mostrar la cartas de computadora
        setTimeout( () => {
            if( puntosComputadora === puntosMinimos){
                alert('Nadie gana :('); 
            }else if (puntosMinimos > 21 ){
                alert('Computadora Gana');
            }else if(puntosComputadora > 21){
                alert('Jugador Gana')
            } else{
                alert('Computadora Gana');
            }    
        }, 10);
    }

    ////////////// Eventos /////////////
    // el botn pedir recibe una instruccion y un callback
    btnPedir.addEventListener('click', function(){
        
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta( carta );
        //console.log(puntosJugador);
        /* La sumatoria que se realiza en pedirCarta almacenada en carta y luego 
        asignada a puntos jugador, se referencia con la variable puntosHTML en la
        etiqueta small en su posicion 0 osea jugador */
        puntosHTML[0].innerText = puntosJugador;
        /* Vamos a crear las imagenes de forma dinamica cuando se pida una carta */
        //<img class="carta" src="assets/cartas/cartas/3C.png">

        const imgCarta = document.createElement('img');
        // invocamos la carta de desde la carpeta
        imgCarta.src = `assets/cartas/cartas/${carta}.png`; // cartas de la carpeta 2D, etc
        // se pide del css
        imgCarta.classList.add('carta');
        // jugador invoca la carta relacionada con la funcion pedir
        divCartasJugador.append(imgCarta);

        if( puntosJugador > 21 ){
            console.warn('Lo siento prediste');
            btnPedir.disabled = true;
            turnoComputadora( puntosJugador );
        } else if(puntosJugador === 21){
            console.warn('21, genial');
            btnPedir.disabled = true;
            turnoComputadora( puntosJugador );
        }
    });

    btnDetener.addEventListener('click', function(){
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugador );

    });

    btnNuevo.addEventListener('click', () =>{
        
        iniciarJuego();
        //deck = [];
        //deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
        
        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });

})();