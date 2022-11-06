const fs = require('fs');


const path = './db/data.json';

const escribirArchivo = (data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}

const leerArchivo = () =>{
    if(!fs.existsSync(path)){
        return null;
    }
    const data = JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'})) ;
    return data;    
}


module.exports = {escribirArchivo, leerArchivo};