const fs = require("fs")
const process = require('process');
const path = require('path')


process.stdin.resume();
process.stdin.setEncoding("ascii");

/////////////////////////////////////////
// Variables

let input = "";
let input_array = "";

//////////////////////////////////////////
// Funciones

process.stdin.on("data", function (chunk) {
    
    //Input de entrada
    input = chunk;

    //Separamos los inputs en array
    input_array = input.split('\n')
    //Lo volvemos leible
    input_array = input_array.map( inputx => {
        return inputx.replace('\r', '')
    })
    input_array.pop();

    //Accionamos los comandos
    actionCommands(input_array);
    //console.log(input_array)    
    
});


process.stdin.on("end", function () {
        
});


//////////////////////////////////////////
// Funciones Propuestas

//Funcion para validar los comandos
const actionCommands = (input) =>{
    
    input.forEach(element => {
        
        if (element === 'pwd')
            console.log (process.cwd());
        else if (element === 'quit')
            process.exit(0)
        else if (element.includes('cd'))
           changeDirectory(element);
        else if (element.includes('mkdir'))
            createDirectory(element)
        else if (element === 'ls'){
            readListContent(element)
        }
        else
            console.log("Unrecognized Command")
    });
    
}


//Funcion que valida si los comando estan bien escritos
//En el caso de que algun comando este mal escrito
//Retorna true
const invalidCommands = (command) =>{

    //Validamos cd
    if (command.includes('cd')){
        if (command === 'cd'){
            console.log("Invalid Command")
            return true
        }else if (command.charAt(2) != ' '){
            console.log("Unrecognized Command")
            return true
        }
    } 
    //Validamos mkdir
    else if (command.includes('mkdir')){
        if (command === 'mkdir'){
            console.log("Invalid Command")
            return true
        }else if (command.charAt(5) != ' '){
            console.log("Unrecognized Command")
            return true
        }
    }

    return false
          
}

//Funcion Cambiar de directorios
const changeDirectory = command =>{
    
    //Validamos el comando cd
    if(!invalidCommands(command)){

         //Directorio Padre
         if(command.includes('../')){

            let directory = command.replace('cd ', '');
            let root = path.parse(process.cwd()).root

            //Si es igual a root
            if (root === process.cwd()){
                console.log("")
            }
            //No es igual a root
            else{
                try {
                    process.chdir(directory)
                    console.log(process.cwd())
                }
                catch (err){
                    console.log("Directory not found");
                }
            }
        
        }
        
        //Cambiar a directorio hijo
        else{

            let directory = command.replace('cd ', './');
            
            try {
                process.chdir(directory)
                console.log(process.cwd())
            }
            catch (err){
                console.log("Directory not found");
            }

        }

    }
    
} 


//Funcion Crear directorios
const createDirectory = command =>{
    
    if(!invalidCommands(command)){

        let newDir = command.replace('mkdir ', './')
    
        if (newDir.length > 100){
            console.log("Invalid command")
        }else{

            fs.mkdir(newDir, (err) => {
                if (err) {
                    console.log("Directory already exits.");
                }
            });
        }

    }


    
}


//Funcion Leer lista de archivos
const readListContent = command =>{

    let currentDir = process.cwd();
	    fs.readdir(currentDir, (err, files) => {
	        if (err)
	          console.log(err);
	        else {
	          files.forEach(file => console.log(file))
	        }
	      })
}



