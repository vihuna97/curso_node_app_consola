const { escribirArchivo, leerArchivo } = require('./helpers/guardarArchivo');
const { crearMenu, pausa, pregunta, listadoTareasBorrar, mensajeConfirmacion, listadoCompletarTareas } = require('./helpers/mensajes');
const Tarea = require('./models/Tarea');
const Tareas = require('./models/Tareas');
const inquirer = require('inquirer').default;


const main = async () => {
  let response = '';
  const listado = new Tareas();
  const data = leerArchivo();

  listado.cargarTareasFromArr(data);

  do {
    response = await crearMenu();
    switch (response) {
      case '1':
        const tarea = await pregunta('Descripción:');
        listado.crearTarea(tarea);
        break;
      case '2':
        listado.listadoCompleto(listado.listadoArr);
        break;
      case '3':
        listado.listadoCompletadoPendiente(true);
        break;
      case '4':
        listado.listadoCompletadoPendiente(false);
        break;
        case '5':
          const listadoCheckbox = await listadoCompletarTareas(listado.listadoArr);
          listado.toggleTareas(listadoCheckbox);
        ;
        break;
        case '6':
        const tareaBorrar = await listadoTareasBorrar(listado.listadoArr);
        if(tareaBorrar !== '0'){
          const confirmacion = await mensajeConfirmacion(listado._listado, tareaBorrar);
          listado.borrarTarea(tareaBorrar, confirmacion);          
        }
        break;
    }
    escribirArchivo(listado.listadoArr);
    await pausa();

  } while (response != '0');


  ;
}


main();