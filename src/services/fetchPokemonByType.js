export async function fetchPokemonByType(typeUrl) {
  const res = await fetch(typeUrl);
  const data = await res.json();
  return data.pokemon.map((p) => p.pokemon); // retorna array de pokémons
}
