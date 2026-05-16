import React, { useState } from 'react';

function UsaHook(){
    const [nombre, setNombre] = useState("Juan");
    const [flag, setFlag] = useState(true);
    const [fragmento, setFragmento] = useState(true);

    /*
    const [genero, setGenero] = useState("Masculino");

    if (genero == "Femenino") {
        return (
            <h1>Herculeana</h1>
        );
    } else if (genero == "Masculino") {
        return ( 
            <h1>Herculeano</h1>
        );
    }*/

    const [contador, setContador] = useState(0);

    return (
        <div>

            <h1>{contador}</h1>

            <button onClick = {() => {setContador(contador+1)}}>
                Aumentar
            </button>

            <button onClick = {() => {setContador(contador-1)}}>
                Disminuir
            </button>
        </div>
    );


    
}

export default UsaHook;
