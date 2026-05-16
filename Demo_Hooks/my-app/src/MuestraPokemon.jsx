import { useEffect, useState } from "react";

function MuestraPokemon(){
    const [pokemon, setPokemon] = useState("Pikachu");

    useEffect(
        () => {
            fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
            .then(res => res.json())
            .then(data => setPokemon(data));
        }, []
    );
    
    return pokemon ? <h1>{pokemon.name}</h1>:<h1>Cargando...</h1>
};

export default MuestraPokemon;