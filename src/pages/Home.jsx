import { PokemonCard } from '../components/PokemonCard';
import  Pagination  from '../components/Pagination';
import { usePokemonData } from '../services/usePokemonData';
import { Header } from '../components/Header';
import { useContext, useState } from 'react';
import { SelectTypesPokemon } from '../components/SelectTypesPokemon';
import { ThemeContext } from '../context/ThemeContext';
import "./styles/home.css"

const Home = () => {
  const [selectedType, setSelectedType] = useState("Todos");
  const { pokemon, loading, error, nextPageUrl, fetchNextPage } = usePokemonData(selectedType);
  const { theme } = useContext(ThemeContext);

  

  if (loading && pokemon.length === 0) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>

  return (
    <>
      <Header />
      <SelectTypesPokemon onTypeSelected={setSelectedType} />
       {loading && pokemon.length > 0 && <p className={`loading ${theme}`}>Carregando novo tipo...</p>}
      <PokemonCard pokemon={pokemon} />
      {selectedType === "Todos" && nextPageUrl && (
        <Pagination gotoMorePokemon={fetchNextPage} />
      )}
    </>
  );
};

export { Home };
