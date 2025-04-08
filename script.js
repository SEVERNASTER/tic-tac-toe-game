
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


        if (filaTresEnRaya() || columnaTresEnRaya() || diagonalesTresEnRaya()) {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
            inhabilitarTodasLasCeldas()
        }else if(intentos === 0) {
            mostrarEmpateLabel()
            console.log('empate');
            
        }


        contenido.textContent = simboloActual
        simboloContrario = simboloActual
        simboloActual = esTurnoJugador1 ? 'O' : 'X'
        esTurnoJugador1 = !esTurnoJugador1
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
    celdas.forEach(celda => {
        celda.classList.add('ganador')
        celda.querySelector('span').style.color = '#fff'
    })
}

function mostrarEmpateLabel(){
    tableroDOM.classList.add('mostrar-before')
    setTimeout(() => {
        tableroDOM.classList.add('empate')
        
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

