var text; //Variable para almacenar el texto qeu se encuentre en el archivo de entrada
var currentRow; //Variable para almacenar la fila del texto que se analiza en un momento
var currentCol; //Variable para almacenar la columna del texto que se analiza en un momento
var rows; //Variable para almacenar las filas del texto de entrada

//Funcion que toma el texto de entrada, lo separa en filas y palabras, y envia cada palabra a ser analizada
getText = () => {
    text = document.getElementById("textA").value; //Toma el texto que se encuentra dentro del TextArea
    rows = text.split('\n'); //Divide el texto en filas y las almacena
    for (let i = 0; i < rows.length; i++) { //Loop For para recorrer todas las palabras del texto, fila por fila
        words = rows[i].trim().split(' ');
        currentRow = i+1;   
        currentCol = 1;
        for (let j = 0; j < words.length; j++) {
            analize(words[j]);
            console.log(currentRow,currentCol-1);
            currentCol++;
        }
        console.log(sintactic());
    }
}
//Funcion que agrega un manejador de eventos al input file
file =() => {
    document.getElementById("inputFile").
    addEventListener("change", readFile, false);
}
//Funcion que se encarga de leer el arhcivo indicado por el usuario
readFile = (e)=> {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        text = e.target.result;
//        alert(text);
        document.getElementById("textA").value = text;
        cleanTable("tablaPatrones");
        cleanTable("tablaErrores");
    };
    reader.readAsText(file);
}