import { useEffect, useState } from "react";
import { PokemonList } from "../components/PokemonList";
import axios from "axios";
import Pagination from "../components/Pagination";

const initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [morePokemon, setMorePokemon] = useState();

  const fetchPokemonData = async (url, resetList = false) => {
    setLoading(true);

    try {
      const res = await axios.get(url);
      const results = res.data.results;

      const pokemonData = await Promise.all(
        results.map(async (p) => {
          const response = await axios.get(p.url);
          return {
            name: p.name,
            image:
              response.data.sprites.other["official-artwork"].front_default,
          };
        })
      );

      setPokemon((prev) =>
        resetList ? pokemonData : [...prev, ...pokemonData]
      );

      setMorePokemon(res.data.next);
    } catch (err) {
      console.error("Erro ao buscar pokèmons: ", err);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchPokemonData(initialUrl, true);
  }, []);

  const gotoMorePokemon = () => {
    if (morePokemon) {
      fetchPokemonData(morePokemon);
    }
  };
  if (loading && pokemon.length === 0) return "Loading...";
  return (
    <>
      <PokemonList pokemon={pokemon} />
      {morePokemon && <Pagination gotoMorePokemon={gotoMorePokemon} />}
    </>
  );
};

export { Home };
