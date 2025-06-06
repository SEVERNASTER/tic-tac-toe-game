
const celdas = document.querySelectorAll('.celda')
let esTurnoJugador1 = true;
let simboloActual = 'X'
let simboloContrario = 'O'
let tablero = [['', '', ''], ['', '', ''], ['', '', '']]
let tableroHTML = [[], [], []]
const colorX = '#E2453D'
const colorO = '#F89227'
let celdasGanadoras = []
let intentos = 9
let tableroDOM = document.getElementById('tablero')
const pantallaDeInicio = document.getElementById('pantallaDeInicio')
const patallaJuego = document.getElementById('patallaJuego')
const nombresJugadores = document.getElementById('nombresJugadores')
const turnoJugadorHTML = document.getElementById('turnoJugador')
let jugador1 = '';
let jugador2 = '';




acomodarCeldas()
function acomodarCeldas() {
    let aux = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            tableroHTML[i][j] = celdas[aux++];
        }
    }

}




celdas.forEach(celda => {
    celda.addEventListener('click', () => {
        if (celda.classList.contains('ocupado')) return;


        celda.classList.add('ocupado')
        const contenido = celda.querySelector('span')
        contenido.style.color = simboloActual === 'X' ? colorX : colorO;
        const estilos = getComputedStyle(celda)
        const fila = estilos.getPropertyValue('--fila')
        const columna = estilos.getPropertyValue('--columna')
        tablero[fila][columna] = simboloActual;
        intentos--;

        contenido.textContent = simboloActual

        if (filaTresEnRaya() || columnaTresEnRaya() || diagonalesTresEnRaya()) {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
            inhabilitarTodasLasCeldas()
            return
        } else if (intentos === 0) {
            mostrarEmpateLabel()
        }


        simboloContrario = simboloActual
        simboloActual = esTurnoJugador1 ? 'O' : 'X'
        esTurnoJugador1 = !esTurnoJugador1
        turnoJugadorHTML.textContent = esTurnoJugador1 ? `${jugador1} (X)` : `${jugador2} (O)`
        turnoJugadorHTML.style.color = esTurnoJugador1 ? '#E2453D' : '#F89227'
    })
});

function filaTresEnRaya() {
    for (let i in tablero) {
        const fila = tablero[i]
        const filaHTML = tableroHTML[i]

        const tresEnRaya = fila.every(celda => celda === simboloActual);
        if (tresEnRaya) {
            marcarCeldasGanadoras(filaHTML)
            return true;
        }
    }
    return false;
}

function columnaTresEnRaya() {
    let columnaHTML = [];
    for (let i = 0; i < 3; i++) {
        let tresEnRaya = true;

        for (let j = 0; j < 3; j++) {
            columnaHTML.push(tableroHTML[j][i])

            if (tablero[j][i] != simboloActual) {
                tresEnRaya = false;
                columnaHTML = [];
                break;
            }
        }
        if (tresEnRaya) {
            marcarCeldasGanadoras(columnaHTML);
            return true
        }
    }
    return false;
}

function diagonalesTresEnRaya() {
    const d1 = tablero[0][0] === simboloActual &&
        tablero[1][1] === simboloActual &&
        tablero[2][2] === simboloActual;

    const d2 = tablero[0][2] === simboloActual &&
        tablero[1][1] === simboloActual &&
        tablero[2][0] === simboloActual;

    let diagonalHTML = []

    if (d1) {
        diagonalHTML = [
            tableroHTML[0][0],
            tableroHTML[1][1],
            tableroHTML[2][2]
        ]
        marcarCeldasGanadoras(diagonalHTML)
    }

    if (d2) {
        diagonalHTML = [
            tableroHTML[0][2],
            tableroHTML[1][1],
            tableroHTML[2][0]
        ]
        marcarCeldasGanadoras(diagonalHTML)
    }


    return d1 || d2;
}

function marcarCeldasGanadoras(celdas) {
    celdasGanadoras = celdas
    celdas.forEach(celda => {
        celda.classList.add('ganador')
        celda.querySelector('span').style.color = '#fff'
    })
}

function desmarcarCeldasGanadoras(){
    celdasGanadoras.forEach(celda => {
        celda.classList.remove('ganador')
        celda.querySelector('span').style.color = esTurnoJugador1 ? colorX : colorO
    })
}

function mostrarEmpateLabel() {
    tableroDOM.classList.add('mostrar-before')
    setTimeout(() => {
        tableroDOM.classList.add('empate')
    }, 50);
}

function ocultarEmpateLabel(){
    tableroDOM.classList.remove('empate')
    setTimeout(() => {
        tableroDOM.classList.remove('mostrar-before')
    }, 50);
}


function imprimirMatriz() {
    for (let fila of tablero) {
        console.log(fila.join(" | "));
    }
}

function inhabilitarTodasLasCeldas() {
    document.querySelectorAll('.celda').forEach(celda => celda.classList.add('ocupado'))
}

function habilitarTodasLasCasillas(){
    document.querySelectorAll('.celda').forEach(celda => celda.classList.remove('ocupado'))
}


nombresJugadores.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target));
    const { jugador1: nombreJugador1, jugador2: nombreJugador2 } = data

    jugador1 = nombreJugador1
    jugador2 = nombreJugador2

    document.getElementById('nombreJugador1').textContent = nombreJugador1
    document.getElementById('nombreJugador2').textContent = nombreJugador2

    turnoJugadorHTML.textContent = `${nombreJugador1} (${simboloActual})`
    turnoJugadorHTML.style.color = '#E2453D'

    girarPantallaInicioJuego()

    setTimeout(() => {
        document.getElementById('jugador1').value = ''
        document.getElementById('jugador2').value = ''
    }, 1000);

    console.log(data);


})

function girarPantallaInicioJuego(){
    pantallaDeInicio.classList.toggle('girar')
    patallaJuego.classList.toggle('girar')

}

document.getElementById('reiniciarBtn').addEventListener('click', () => {
    reiniciarVariables()
})

function reiniciarVariables(){
    desmarcarCeldasGanadoras()
    esTurnoJugador1 = !esTurnoJugador1
    simboloContrario = simboloActual
    simboloActual = esTurnoJugador1 ? 'X' : 'O'
    tablero = [['', '', ''], ['', '', ''], ['', '', '']]
    celdasGanadoras = []
    intentos = 9
    celdas.forEach(celda => celda.querySelector('span').textContent = '')
    turnoJugadorHTML.style.color = esTurnoJugador1 ? '#E2453D' : '#F89227'
    turnoJugadorHTML.textContent = esTurnoJugador1 ?  `${jugador1} (X)` : `${jugador2} (O)`
    ocultarEmpateLabel()
    habilitarTodasLasCasillas()
}

document.getElementById('deNuevoBtn').addEventListener('click', () => {
    desmarcarCeldasGanadoras()
    esTurnoJugador1 = true
    simboloActual = 'X'
    simboloContrario = 'O'
    tablero = [['', '', ''], ['', '', ''], ['', '', '']]
    celdasGanadoras = []
    intentos = 9
    celdas.forEach(celda => celda.querySelector('span').textContent = '')
    turnoJugadorHTML.style.color = '#E2453D'
    turnoJugadorHTML.textContent = `${jugador1} (X)`
    ocultarEmpateLabel()
    habilitarTodasLasCasillas()
    jugador1 = ''
    jugador2 = ''
    girarPantallaInicioJuego()
})






