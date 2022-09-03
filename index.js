import 'dotenv/config'

import {inquirerMenu, leerInput, listarLugares, pausa} from './helpers/inquirer';
import { Busquedas } from './models/busquedas';

// console.log(process.env);

const main = async() => {
    
    const busquedas = new Busquedas;
    let opt;

    do {
        opt = await inquirerMenu();
        // console.log(opt);

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                // Buscar el lugar o los lugares
                const lugares = await busquedas.ciudad(termino);
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if ( id === '0' ) continue;
                
                const lugarSel = lugares.find(l => l.id === id);
                // Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre);
                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)

                // Mostrar los resultados
                console.clear();
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre.green);
                console.log('Lat: ', lugarSel.lat  );
                console.log('Lng: ', lugarSel.lng);
                console.log('Temperatura: ', clima.temp,'C˚'.red);
                console.log('Minima: ', clima.min,'C˚'.red);
                console.log('Maxima: ', clima.max,'C˚'.red);
                console.log('Como esta el clima: ', clima.desc.green);
            break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${ i + 1}`.green
                    console.log(`${idx} ${lugar}`);
                });
        }

        if ( opt !== 0 ) await pausa();

    } while (opt !== 0);
    
}



main();