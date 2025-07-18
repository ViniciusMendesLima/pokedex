import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getDetailedPokemonList } from "../utils/pokemonDetails";
import { getInitialUrl, getPokemonListFromResponse } from "../utils/urlHepers";

export function usePokemonData(type) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [error, setError] = useState(null);

  const fetchPokemonData = useCallback(async (url, resetList = false) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(url);
      const pokemonList = getPokemonListFromResponse(res.data, type);
      const detailedPokemon = await getDetailedPokemonList(pokemonList);

      setPokemon((prev) =>
        resetList
          ? detailedPokemon.filter((p) => p !== null)
          : [...prev, ...detailedPokemon.filter((p) => p !== null)]
      );

      if (!type || type === "Todos") {
        setNextPageUrl(res.data.next);
      }
    } catch (err) {
      console.error("Erro ao buscar pokémons:", err);
      setError("Falha ao carregar os dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      const url = getInitialUrl(type);
      await fetchPokemonData(url, true);
    };

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [type, fetchPokemonData]);

  const fetchNextPage = () => {
    if (loading || !nextPageUrl) return;
    fetchPokemonData(nextPageUrl);
  };

  return { pokemon, loading, error, nextPageUrl, fetchNextPage };
}

export default usePokemonData;