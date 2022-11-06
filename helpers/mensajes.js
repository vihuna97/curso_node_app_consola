const inquirer = require('inquirer');
require('colors');

const preguntas = {
    type: "list",
    name: "name",
    message: "Elige una tarea",
    choices: [{
        value: '1',
        name: `${'1.'.green} Crear tarea`
    },
    {
        value: '2',
        name: `${'2.'.green} Listar tareas`
    },
    {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
    },
    {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
    },
    {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`,
    },
    {
        value: '6',
        name: `${'6.'.green} Borrar tarea`,
    },
    {
        value: '0',
        name: `${'0.'.green} Salir`,

    }
    ]
};



const crearMenu = async () => {
    console.clear();
    console.log('=================');
    console.log('Seleccione una opción'.blue);
    console.log('=================\n');
    const { name } = await inquirer.prompt(preguntas);

    return name;

}

const pausa = async () => {
    console.log('\n')
    await inquirer.prompt({
        type: 'input',
        message: `Presione ${'ENTER'.green} para continuar`,
        name: 'input'
    })
}

const listadoTareasBorrar = async (listado = []) => {
    const listaTareas = listado.map((tarea, id) =>{
        const idx = `${id + 1}.`.green;
        return {
        value: tarea.id,
        name: `${idx} ${tarea.desc}`
    }});
    listaTareas.unshift({
        value: '0',
        name: `${'0'.green} ${'Salir del menú'.red}\n`
    })

    const {tarea} = await inquirer.prompt({
        type: "list",
        name: "tarea",
        message: "Elige una tarea para borrar ",
        choices: listaTareas,
    })
    return tarea;
}

const listadoCompletarTareas = async (listado = []) => {
    const listaTareas = listado.map((tarea, id) =>{
        const idx = `${id + 1}.`.green;
        return {
        value: tarea.id,
        name: `${idx} ${tarea.desc}`,
        checked: (tarea.completadoEn) ? true : false
    }});

    const {tarea} = await inquirer.prompt({
        type: "checkbox",
        name: "tarea",
        message: "Elige una tarea para borrar ",
        choices: listaTareas,
    })
    return tarea;
}

const mensajeConfirmacion = async(listado = {}, id = '') =>{
   const {confirmacion} = await inquirer.prompt({
        type: "confirm",
        name: "confirmacion",
        message: `Está seguro que quiere eliminar la tarea: ${listado[id].desc}` 
    });
    return confirmacion;
}

const pregunta = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'name',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Escribe una tarea';
                }
                return true;
            }
        }
    ]
    const { name } = await inquirer.prompt(question);
    return name;
}

module.exports = { crearMenu, pausa, pregunta, listadoTareasBorrar, mensajeConfirmacion, listadoCompletarTareas }