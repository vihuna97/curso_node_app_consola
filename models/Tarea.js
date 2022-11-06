const {v4: id} = require('uuid');


class Tarea{
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc){
        this.desc = desc;
        this.id = id();
        this.completadoEn = null;
    }
}

module.exports = Tarea;