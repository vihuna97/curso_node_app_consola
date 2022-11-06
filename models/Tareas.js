const Tarea = require('./Tarea');
require('colors');


class Tareas {
    _listado = {}

    constructor(tarea) {
        this._listado = {};
    }

    get listadoArr() {
        const Arr = [];
        Object.keys(this._listado).forEach(key => {
            Arr.push(this._listado[key]);
        });
        return Arr;
    }

    listadoCompleto = (tareas = []) =>{
        let n = 1;
        for (let i = 0; i < tareas.length; i++) {
            let numero = n.toString() + '.';
            
            const completada = tareas[i].completadoEn != null  ? 'Completada'.green : 'Pendiente'.red;  
            console.log(`${numero.green} ${tareas[i].desc} :: ${completada}`) ;
            n++;
        }
    }

    listadoCompletadoPendiente(completadas = true){
        let listaArr = [];
        if(completadas){
            listaArr = this.listadoArr.filter(tarea => tarea.completadoEn != null);
            listaArr.forEach((tarea, id) => {            
                    const idx = `${id + 1}.`.green;
                    console.log(`${idx} ${tarea.desc} :: ${'Completada'.green}`)
            }); 
        } else {
            listaArr = this.listadoArr.filter(tarea => tarea.completadoEn == null);
            listaArr.forEach((tarea, id) => {            
                const idx = `${id + 1}.`.green;
                console.log(`${idx} ${tarea.desc} :: ${'Pendiente'.red}`)
        }); 
        }
    }

    crearTarea = (desc = '') => {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id = '', confirm = false){
        if(this._listado[id] && confirm){
            delete this._listado[id];
            console.log("La tarea se eliminó satisfactoriamente");
        } else {
            console.log("No se borrará la tarea seleccionada");
        }
    }

    cargarTareasFromArr = (tareasArr = []) => {
        if(!tareasArr){
            console.log('No hay archivo');
            this._listado = {};
        } else {
            tareasArr.forEach(tarea => {
                this._listado[tarea.id] = tarea;
            })
        }
        
    }

    toggleTareas(ids = []){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }

        })

        this.listadoArr.forEach((tarea) =>{
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}


module.exports = Tareas;