// import { useState, useEffect } from "react";
// import axios from "axios";

// export function usePokemonData(type) {
//   const initialUrl =
//     type && type !== "Todos"
//       ? `https://pokeapi.co/api/v2/type/${type}` // Busca por tipo específico
//       : "https://pokeapi.co/api/v2/pokemon?limit=10"; // Busca geral
//   // console.log('Tudo:' , initialUrl);

//   const [pokemon, setPokemon] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [nextPageUrl, setNextPageUrl] = useState();
//   const [error, setError] = useState(null);

//   const fetchPokemonData = async (url, resetList = false) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get(url);

//       let pokemonList = [];

//       if (type && type !== "Todos") {
//         pokemonList = res.data.pokemon.map((item) => item.pokemon);
//       } else {
//         pokemonList = res.data.results;
//       }

//       const detailedPokemon = await Promise.all(
//         pokemonList.map(async (p) => {
//           const response = await axios.get(p.url);
//           let speciesRes = null;

//           // Extrai o nome base e remove tudo após o primeiro hífen
//           const baseName = p.name.replace(/-.*$/, '');
          
//           // Estratégias de fallback em ordem de prioridade
//           const speciesAttempts = [
//             () => axios.get(`https://pokeapi.co/api/v2/pokemon-species/${response.data.id}`),
//             () => axios.get(`https://pokeapi.co/api/v2/pokemon-species/${baseName}`),
//             () => axios.get(response.data.species.url) // Usa a URL de species diretamente do Pokémon
//           ];

//           // Tenta cada estratégia até encontrar uma que funcione
//           for (const attempt of speciesAttempts) {
//             try {
//               speciesRes = await attempt();
//               break; // Sai do loop se conseguir
//             } catch (e) {
//               continue; // Tenta a próxima estratégia
//             }
//           }

//           if (!speciesRes) {
//             console.warn(`⚠️ Species not found for: ${p.name} (ID: ${response.data.id})`);
//           }
//           return {
//             name: p.name,
//             image:
//               response.data.sprites.other["official-artwork"].front_default,
//             types: response.data.types.map((t) => t.type.name),
//             moves: response.data.moves.map((m) => m.move.name),
//             abilities: await Promise.all(
//               response.data.abilities.map(async (a) => {
//                 const abilityRes = await axios.get(a.ability.url);
//                 const portugueseDescription =
//                   abilityRes.data.effect_entries.find(
//                     (e) => e.language.name === "pt"
//                   );

//                 const englishDescription = abilityRes.data.effect_entries.find(
//                   (e) => e.language.name === "en"
//                 );

//                 return {
//                   name: a.ability.name,
//                   descritpion: portugueseDescription
//                     ? portugueseDescription.effect
//                     : englishDescription
//                     ? englishDescription.effect
//                     : "Descrição não disponivel",
//                 };
//               })
//             ),
//             color: speciesRes?.data?.color?.name || "unknown",
//           };
//         })
//       );

//       const filteredPokemon = detailedPokemon.filter((p) => p !== null);

//       setPokemon((prev) =>
//         resetList ? filteredPokemon : [...prev, ...filteredPokemon]
//       );

//       if (!type || type === "todos") {
//         setNextPageUrl(res.data.next);
//       }
//     } catch (err) {
//       console.error("Erro ao buscar pokémons:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (type === "Todos") {
//       fetchPokemonData("https://pokeapi.co/api/v2/pokemon?limit=10", true);
//     } else {
//       fetchPokemonData(initialUrl, true);
//     }
//     console.log("✅ Resetando lista - Tipo mudou:", type);
//   }, [type]);

//   const fetchNextPage = () => {
//     if (nextPageUrl) {
//       fetchPokemonData(nextPageUrl);
//     }
//   };

//   return { pokemon, loading, nextPageUrl, fetchNextPage };
// }
