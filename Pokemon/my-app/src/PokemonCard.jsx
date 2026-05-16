import { useEffect, useState } from "react";

const PokemonCard = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Trae los primeros 20 pokemones
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await res.json();

        // Obtener detalles de cada Pokémon (para imagen)
        const details = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );

        setPokemons(details);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <p>Cargando pokemones...</p>;

  return (
    <div style={styles.container}>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} style={styles.card}>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    width: "120px",
  },
};

export default PokemonCard;
