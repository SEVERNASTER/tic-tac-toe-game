
const celdas = document.querySelectorAll('.celda')
let esTurnoJugador1 = true;
let simboloActual = 'X'
let simboloContrario = 'O'
let tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]
const colorX = '#E2453D'
const colorO = '#F89227'
let casillasGanadoras = []

celdas.forEach(celda => {
    celda.addEventListener('click', () => {
        if(celda.classList.contains('ocupado')) return;

        celda.classList.add('ocupado')
        const contenido = celda.querySelector('span')
        contenido.style.color = simboloActual === 'X' ? colorX : colorO;
        const estilos = getComputedStyle(celda)
        const fila = estilos.getPropertyValue('--fila')
        const columna = estilos.getPropertyValue('--columna')
        tablero[fila][columna] = simboloActual;
        

        if (filaTresEnRaya() || columnaTresEnRaya() || diagonalesTresEnRaya()) {
            console.log('tres en raya');
            console.log(casillasGanadoras);
            
            inhabilitarTodasLasCeldas()
        } else {
            console.log('no hay ganador');

        }


        contenido.textContent = simboloActual
        simboloContrario = simboloActual
        simboloActual = esTurnoJugador1 ? 'O' : 'X'
        esTurnoJugador1 = !esTurnoJugador1
    })
});

function filaTresEnRaya() {
    for (const fila of tablero) {
        const tresEnRaya = fila.every(celda => celda === simboloActual);
        if (tresEnRaya) {
            casillasGanadoras = fila;
            return true;
        }
    }
    return false;
}

function columnaTresEnRaya() {
    for (let i = 0; i < 3; i++) {
        let tresEnRaya = true;
        for (let j = 0; j < 3; j++) {
            if (tablero[j][i] != simboloActual) {
                tresEnRaya = false;
                break;
            }
        }
        if (tresEnRaya) return true;
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

    return d1 || d2;
}


function imprimirMatriz() {
    for (let fila of tablero) {
        console.log(fila.join(" | "));
    }
}

function inhabilitarTodasLasCeldas(){
    document.querySelectorAll('.celda').forEach(celda => celda.classList.add('ocupado'))
}

