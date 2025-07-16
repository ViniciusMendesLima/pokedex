import { useState, useEffect } from "react";
import axios from "axios";

const initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=10";

export function usePokemonData(selectedType = null) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState();
  console.log('data: ', selectedType);
  
  const fetchPokemonData = async (url, resetList = false) => {
    setLoading(true);

    try {
      const res = await axios.get(url);
      const results = res.data.results;      

      const detailedPokemon = await Promise.all(
        results.map(async (p) => {
          const response = await axios.get(p.url);
          
          return {
            name: p.name,
            image:
              response.data.sprites.other["official-artwork"].front_default,
            types: response.data.types.map((t) => t.type.name),
            moves: response.data.moves.map((m) => m.move.name),
            abilities: await Promise.all(
              response.data.abilities.map(async (a) => {
                const abilityRes = await axios.get(a.ability.url);
                const portugueseDescription =
                  abilityRes.data.effect_entries.find(
                    (e) => e.language.name === "pt"
                  );

                const englishDescription = abilityRes.data.effect_entries.find(
                  (e) => e.language.name === "en"
                );

                return {
                  name: a.ability.name,
                  descritpion: portugueseDescription
                    ? portugueseDescription.effect
                    : englishDescription
                    ? englishDescription.effect
                    : "Descrição não disponivel",
                };
              })
            ),
          };
        })
      );

      setPokemon((prev) =>
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
