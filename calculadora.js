'use strict';
// create variables to read DOM
const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const operadorPendente = () => operador !== undefined;
const removerUtimoNum = () => display.textContent = display.textContent.slice(0, -1);
const inserirNusmeros = (evento) => atualizarDisplay(evento.target.textContent);
const limparDisplay = () => display.textContent='';


let novoNumero = true;
let operador;
let numeroAnterior;



// function that calculates numbers in DOM
const calcular = () =>{
    if(operadorPendente()){
        novoNumero=true;
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        if(operador ==='+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }
        else if(operador === '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }
        else if(operador === '*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        
        }
        else if(operador === '/'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }


    }
}

// update display at calculator when typed
const atualizarDisplay = (texto)=>{
    if(novoNumero){
      display.textContent = texto.toLocaleString('br');
      novoNumero = false;
    }else{
        display.textContent += texto.toLocaleString('br');
    }
   
}


const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular();
        novoNumero=true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
   
}

const ativarIgual = () =>{
    calcular();
    operador = undefined;
}

const limparCalculo = () =>{
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}


const inverterSinal = () =>{
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);

}



const inserirDecimal = () =>{
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
//object to acess by keyboard
const mapateclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorAdicionar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal'
    
}

// to type in the keyboard
const mapearteclado = (evento) =>{

const tecla = evento.key;
const teclaPermitida = () => Object.keys(mapateclado).indexOf(tecla) !== -1;
if(teclaPermitida())
  document.getElementById(mapateclado[tecla]).click();


}
// events
operadores.forEach(operador => operador.addEventListener('click',selecionarOperador));
numeros.forEach(numero => numero.addEventListener('click',inserirNusmeros));
document.getElementById('limparDisplay').addEventListener('click',limparDisplay);
document.getElementById('backspace').addEventListener('click',removerUtimoNum);
document.getElementById('igual').addEventListener('click',ativarIgual);
document.getElementById('limparCalculo').addEventListener('click',limparCalculo);
document.getElementById('decimal').addEventListener('click',inserirDecimal);
document.getElementById('inverter').addEventListener('click',inverterSinal);
document.addEventListener('keydown', mapearteclado)