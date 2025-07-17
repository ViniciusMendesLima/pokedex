import axios from "axios";

export async function getDetailedPokemonList(pokemonList) {
  return await Promise.all(
    pokemonList.map(async (p) => {
      try {
        const response = await axios.get(p.url);

        let speciesRes;
        try {
          speciesRes = await axios.get(response.data.species.url);
        } catch {
          const baseName = p.name.split("-")[0];
          try {
            speciesRes = await axios.get(
              `https://pokeapi.co/api/v2/pokemon-species/${baseName}`
            );
          } catch {
            console.warn(`Species fallback failed for ${p.name}`);
          }
        }

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
}
