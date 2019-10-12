//Objeto de forma matricial que contiene las transicines del lenguaje
var transitions = {
    0:{'l':1,'n':2, "op":4, "op2":5, '=':5, 'a':6, 's':7 , '.':8,'e':8},
    //'l':1,'n':2, "op":4, "op2":5, '=':5, 'a':6, 's':7 ,'e':8
    1:{'l':1, 'n':1, "op":8, "op2":8, '=':8, 'a':8, 's':8, '.':8,'e':8, "tipo":"Identificador"},
    2:{'l':8, 'n':2, "op":8, "op2":8, '=':8, 'a':8, 's':8, '.':3,'e':8, "tipo":"Numero"},
    3:{'l':8, 'n':2, "op":8, "op2":8, '=':8, 'a':8, 's':8, '.':8,'e':8},
    4:{'l':8, 'n':8, "op":8, "op2":8, '=':8, 'a':8, 's':8, '.':8, 'e':8, "tipo":"Operador"},
    5:{'l':8, 'n':2, "op":8, "op2":8, '=':4, 'a':8, 's':8, '.':8, 'e':8,"tipo":"Operador"},
    6:{'l':8, 'n':2, "op":8, "op2":8, '=':8, 'a':8, 's':8, '.':8,'e':8, "tipo":"Agrupacion"},
    7:{'l':8, 'n':2, "op":8, "op2":8, '=':8, 'a':8, 's':8, '.':8,'e':8, "tipo":"Signo"},
    8:{"tipo":"Error"}
};
var flotante = false;
/*
 'l' -> Letra
 'n' -> Numero
 "op" -> Operador Sin (><=)
 "op2" -> <>
 'a' -> Simbolos de agrupacion
 's'-> Signo
 'e' -> Error
*/
//Quizas agregar estados para los simbolos de "signo" y "agrupacion"

//Arreglo que contiene los estados de aceptacion
var acceptanceStates= [1,2,4,5,6,7];
//Variable para almacenar el estado actual
var currentState;
//Variable para almacenar el conjunto al que pertenece el caracter analizado
var currentCharGroup;
//Variable que indica el estado inical para el analisis
var initialState = 0;

//Funcion que analiza una palabra, indicando a que tipo de token pertenece
analize = (word) => {
    var message; //Mensaje que sera desplegado al finalizar el analisis
    var c; //Caracter que se encuentra siendo analizado
    length = word.length; //Tamaño de la palabra que esta siendo analizada
    currentState = initialState; 
    for (var i=0; i<length;i++ ) {
        c = word.charCodeAt(i);
        currentCol++;
        currentCharGroup = charGroup(c);
/*        console.log(c);
        console.log(currentCharGroup);
        console.log(currentState)
*/        if(currentState !==8) { //Mientras no se encuentre en estado de error (8) evalua y cambia los estados
            currentState = evaluate(currentState, currentCharGroup);
        } else{
            break;
        }
    }
    if (!acceptanceStates.includes(currentState)) { //Si el estado actual (final) no es parte de los estado de aceptacion, registra un error
        console.log(currentCharGroup + currentState)
        message = "Error";
        fillTable("tablaErrores",2,[word, currentRow +":"+currentCol])
    } 
    else if(acceptanceStates.includes(currentState)) { //Si el estado actual es parte de los estados de aceptacion registra el tipo de token
        message = "Se ha hallado un: " + transitions[currentState]["tipo"];
        tipo = transitions[currentState]["tipo"];
        if (flotante) {
            message += " flotante";
            tipo += " flotante";
            flotante = false;
        }
        if (tipo == "Identificador"
        && (word == "variable" || word == "entero" || word == "decimal"
        || word == "booleano" || word == "cadena" || word == "si"
        || word == "sino" || word == "mientras" || word == "hacer")) {
            tipo = "Palabra Reservada";
        } else if (word == "VERDADERO" || word == "FALSO"){
            tipo = "Boolean";
        }
        fillTable("tablaPatrones",3,[word,tipo, currentRow +":"+currentCol])
    }
    console.log(message + " " + word);  
};
evaluate = (state,char) => {return transitions[state][char]}; //Recibe el estado actual y el caracter, para determinar el estado siguiente

charGroup = (char) =>  { //Determina el conjunto al que pertenece el caracter enviado
    if((char>=97 && char<=122)||(char>=65&&char<=90)){
        return 'l';
    } else if (char>=48 && char<=57) {
        return 'n';
    } else if (char==46 && currentState == 2) {
        flotante = true;
        return '.';
    } else if ((char>=42 && char<=43) || (char==45) || (char==47) || (char==37)) {
        return "op";
    } else if (char==60 || char==62) {
        return "op2";
    } else if (char==61) {
        return '=';
    } else if ((char>=40 && char <=41) || (char==123 || char == 125)) {
        return 'a'
    } else if (char == 34 || char == 59) {
        return 's';
    }
    else {
        return 'e';
    }
}; 

//Funcion encargada de rellenar las tablas de errores y tokens
fillTable = (tableName, cells, data) =>{
    var table = document.getElementById(tableName);
    var new_Row = table.insertRow(-1);
    for (let i = 0; i < cells; i++) {
        var cell = new_Row.insertCell(i)
        cell.innerHTML = data[i];
        
    }
}
//Vacia la tabla indicada
cleanTable = (tableName) => {
    var table = document.getElementById(tableName);
    var rows = table.rows;
    var number = rows.length;
        for (var i = 1; i < number; i++) {
            table.deleteRow(1);
        }
    }
//Intento de funcion para desplegar una palabra mientras es analizada
showWord = (word) => {
    document.getElementById("wordDisplay").innerHTML = word;
}