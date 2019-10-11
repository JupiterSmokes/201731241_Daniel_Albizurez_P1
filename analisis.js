//Objeto de forma matricial que contiene las transicines del lenguaje
var transitions = {
    0:{'l':1,'n':2, "op":4, "op2":5, '=':5, 'a':6, 's':7 ,'e':8},
    1:{'l':1, 'n':1, 'e':8, "tipo":"Identificador"},
    2:{'n':2, '.':3,'e':8, "tipo":"Numero"},
    3:{'n':2, 'e':8},
    4:{'e':8, "tipo":"Operador"},
    5:{'=':4, 'e':8,"tipo":"Operador"},
    6:{'e':8, "tipo":"Agrupacion"},
    7:{'e':8, "tipo":"Signo"},
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
var token;
analize = (word) => {
    var c;
    length = word.length;
    currentState = 0;
    for (var i=0; i<length;i++ ) {
        c = word.charCodeAt(i);
        currentCharGroup = charGroup(c);
/*        console.log(c);
        console.log(currentCharGroup);
        console.log(currentState)
*/        if(currentState !==8) {
            currentState = evaluate(currentState, currentCharGroup);
        } else{
            break;
        }
    }
    if (!acceptanceStates.includes(currentState)) {
        console.log(currentCharGroup + currentState)
        console.log("Error")
    } 
    else if(acceptanceStates.includes(currentState)) {
        var message = "Se ha hallado un: " + transitions[currentState]["tipo"];
        if (flotante) {
            message += " flotante";
            flotante = false;
        }
        console.log(message);
    }  
};
evaluate = (state,char) => {return transitions[state][char]};

charGroup = (char) =>  {
    if((char>=97 && char<=122)||(char>=65&&char<=90)){
        return 'l';
    } else if (char>=48 && char<=57) {
        return 'n';
    } else if (char==46) {
        flotante = true;
        return '.';
    } else if ((char>=42 && char<=43) || (char==45) || (char==47) || (char==37)) {
        return "op";
    } else if (char==60 || char==62) {
        return "op2";
    } else if (char==61) {
        return '=';
    } else if ((char>=40 && char <=40) || (char==123 || char == 125)) {
        return 'a'
    } else if (char == 34 || char == 59) {
        return 's';
    }
    else {
        return 'e';
    }
}; 