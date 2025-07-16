// import { usePokemonData } from "../services/usePokemonData";
// import { usePokemonType } from "../services/usePokemonType";


// export function selecType (type){
//     if (type === "Todos") {
//       PokemonData()
//     } else {
//       const normalizedType = type.toLowerCase();
//       PokemonType(`https://pokeapi.co/api/v2/type/${normalizedType}`);
//     }
//     function PokemonData(){
//     usePokemonData()
//   }

//   function PokemonType(url){
//     usePokemonType(url)
//   }
//   };

import { fetchPokemonData } from "../services/fetchPokemonData";
import { fetchPokemonByType } from "../services/fetchPokemonByType";

export async function selecType(type) {
  if (type === "Todos" || type === "") {
    return await fetchPokemonData();
  } else {
    const url = `https://pokeapi.co/api/v2/type/${type.toLowerCase()}`;
    return await fetchPokemonByType(url);
  }
}


  
  
