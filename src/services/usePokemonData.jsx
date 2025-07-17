import { useState, useEffect } from "react";
import axios from "axios";

export function usePokemonData(type) {
  const initialUrl =
    type && type !== "Todos"
      ? `https://pokeapi.co/api/v2/type/${type}`
      : "https://pokeapi.co/api/v2/pokemon?limit=10";

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [error, setError] = useState(null);

  const fetchPokemonData = async (url, resetList = false) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(url);

      let pokemonList =
        type && type !== "Todos"
          ? res.data.pokemon.map((item) => item.pokemon)
          : res.data.results;

      const detailedPokemon = await Promise.all(
        pokemonList.map(async (p) => {
          try {
            const response = await axios.get(p.url);

            // Estratégia para obter species data
            let speciesRes;
            try {
              speciesRes = await axios.get(response.data.species.url);
            } catch {
              // Fallback: tenta pelo nome base
              const baseName = p.name.split("-")[0];
              try {
                speciesRes = await axios.get(
                  `https://pokeapi.co/api/v2/pokemon-species/${baseName}`
                );
              } catch {
                console.warn(`Species fallback failed for ${p.name}`);
              }
            }

            // Processa habilidades
            const abilities = await Promise.all(
              response.data.abilities.map(async (a) => {
                try {
                  const abilityRes = await axios.get(a.ability.url);
                  const ptDesc =
                    abilityRes.data.effect_entries?.find(
                      (e) => e.language.name === "pt"
                    ) ||
                    abilityRes.data.flavor_text_entries?.find(
                      (e) => e.language.name === "pt"
                    );

                  const enDesc = abilityRes.data.effect_entries?.find(
                    (e) => e.language.name === "en"
                  );

                  return {
                    name: a.ability.name,
                    description: ptDesc
                      ? ptDesc.effect || ptDesc.flavor_text
                      : enDesc
                      ? enDesc.effect
                      : "Descrição não disponível",
                  };
                } catch {
                  return {
                    name: a.ability.name,
                    description: "Descrição não disponível",
                  };
                }
              })
            );

            return {
              name: p.name,
              id: response.data.id,
              image:
                response.data.sprites.other["official-artwork"].front_default,
              types: response.data.types.map((t) => t.type.name),
              moves: response.data.moves.map((m) => m.move.name),
              abilities,
              color: speciesRes?.data?.color?.name || "unknown",
            };
          } catch (err) {
            console.error(`Error processing ${p.name}:`, err);
            return null;
          }
        })
      );

      // console.log("➡️ Adicionando pokémons:", detailedPokemon.map(p => p?.name));

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
  };

  useEffect(() => {
    //  console.log("✅ Tipo alterado - Resetando lista. Tipo atual:", type);
    fetchPokemonData(
      type === "Todos"
        ? "https://pokeapi.co/api/v2/pokemon?limit=10"
        : initialUrl,
      true
    );
  }, [type]);

  const fetchNextPage = () => {
    if (loading || !nextPageUrl) return;
    console.log("➡️ Próxima página:", nextPageUrl);
    fetchPokemonData(nextPageUrl);
  };

  return { pokemon, loading, error, nextPageUrl, fetchNextPage };
}
