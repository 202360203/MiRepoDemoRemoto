import { useEffect, useState } from "react";
import { getPokemons } from "../services/pokeapi";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPokemons().then(res => setData(res.data.results));
  }, []);

  return (
    <div>
      <h2>Pokémon</h2>

      {data.map((p, index) => {
        const id = index + 1;

        return (
          <div key={p.name}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={p.name}
            />
            <p>{p.name}</p>
          </div>
        );
      })}
    </div>
  );
}
