import { useState, useEffect } from 'react';
import axios from 'axios';

const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

export function usePokemonData() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState();

  const fetchPokemonData = async (url, resetList = false) => {
    setLoading(true);

    try {
      const res = await axios.get(url);
      const results = res.data.results;
      console.log(url);
      

      const detailedPokemon = await Promise.all(
        results.map(async (p) => {
          const response = await axios.get(p.url);
          console.log(p.name);
          
          
          return {
            name: p.name,
            image: response.data.sprites.other["official-artwork"].front_default,
          };
        })
      );

      setPokemon(prev =>
        resetList ? detailedPokemon : [...prev, ...detailedPokemon]
      );

      setNextPageUrl(res.data.next);
    } catch (err) {
      console.error("Erro ao buscar pokémons:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPokemonData(initialUrl, true);
  }, []);

  const fetchNextPage = () => {
    if (nextPageUrl) {
      fetchPokemonData(nextPageUrl);
    }
  };

  return { pokemon, loading, nextPageUrl, fetchNextPage };
}