import axios from "axios";
import { useEffect, useState } from "react";
import { usePokemonData } from "../services/usePokemonData";
const typesPokemons = "https://pokeapi.co/api/v2/type/";

const SelectTypesPokemon = ({onTypeSelected}) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const fetchPokemonType = async (url) => {
    const res = await axios.get(url);
    setTypes(res.data.results);
  };

  useEffect(() => {
    fetchPokemonType(typesPokemons);
  }, []);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    if (onTypeSelected) {
      onTypeSelected(type);
    }
  };

  usePokemonData(selectedType);
  

  return (
    <>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="Todos">Todos</option>
        {types.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>
    </>
  );
};

export { SelectTypesPokemon };
