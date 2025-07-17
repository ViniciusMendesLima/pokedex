import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { usePokemonData } from "../services/usePokemonData";
const typesPokemons = "https://pokeapi.co/api/v2/type/";
import "./styles/selectTypesPokemons.css";
import { ThemeContext } from "../context/ThemeContext";

const SelectTypesPokemon = ({ onTypeSelected }) => {
  const { theme } = useContext(ThemeContext);

  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("Todos");

  useEffect(() => {
    async function fetchTypes() {
      try {
        const res = await axios.get(typesPokemons);
        setTypes(
          res.data.results.filter(
            (t) => t.name !== "shadow" && t.name !== "unknown"
          )
        );
      } catch (error) {
        console.error("Erro ao buscar tipos:", error);
      }
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
  usePokemonData(selectedType);

  return (
    <>
      <select
        className={`type-selector ${theme}`}
        value={selectedType}
        onChange={handleTypeChange}
      >
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
