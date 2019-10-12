var text;
var currentWord;
var currentRow;
var currentCol;
var rows;

getText = () => {
    text = document.getElementById("textA").value;
    rows = text.split('\n');
    for (let i = 0; i < rows.length; i++) {
        words = rows[i].trim().split(' ');
        currentRow = i+1;
        currentCol = 1;
        for (let j = 0; j < words.length; j++) {
            analize(words[j]);
            console.log(currentRow,currentCol-1);
            currentCol++;
        }        
    }
}

file =() => {
    document.getElementById("inputFile").
    addEventListener("change", readFile, false);
}
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