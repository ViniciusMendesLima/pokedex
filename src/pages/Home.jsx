import { useEffect, useState } from "react";
import { PokemonList } from "../components/PokemonList";
import axios from "axios";
import Pagination from "../components/Pagination";

const initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(true);
  const [morePokemon, setMorePokemon] = useState();

  useEffect(() => {
    let cancel = false
    setLoading(true);

    axios.get(currentPageUrl).then(async (res) => {
      if (cancel) return;
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
      setPokemon((prev)=>
        currentPageUrl === initialUrl ? pokemonData : [...prev,...pokemonData]
      );
      setLoading(false);
      setMorePokemon(res.data.next)
    });
  }, [currentPageUrl]);

  function gotoMorePokemon(){
    setCurrentPageUrl(morePokemon)
  }
  if (loading) return "Loading...";
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination gotoMorePokemon = {gotoMorePokemon}/>
    </>
  );
};

export { Home };
