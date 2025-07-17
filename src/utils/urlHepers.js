export function getInitialUrl(type) {
  return type && type !== "Todos"
    ? `https://pokeapi.co/api/v2/type/${type}`
    : "https://pokeapi.co/api/v2/pokemon?limit=10";
}

export function getPokemonListFromResponse(data, type) {
  return type && type !== "Todos"
    ? data.pokemon.map((item) => item.pokemon)
    : data.results;
}
