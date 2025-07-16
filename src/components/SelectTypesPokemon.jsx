import axios from "axios";
import { useEffect, useState } from "react";
const typesPokemons = "https://pokeapi.co/api/v2/type/";

const SelectTypesPokemon = ({onTypeSelected}) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("Todos");

  useEffect(() => {
    async function fetchTypes() {
      const res = await axios.get(typesPokemons)
      setTypes(res.data.results)
    }
    fetchTypes();
  }, []);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    if (onTypeSelected) {
      onTypeSelected(type);
    }
  };

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
