import { PokemonList } from '../components/PokemonList';
import  Pagination  from '../components/Pagination';
import { usePokemonData } from '../services/usePokemonData';
import { Header } from '../components/Header';

const Home = () => {
  const { pokemon, loading, nextPageUrl, fetchNextPage } = usePokemonData();

  if (loading && pokemon.length === 0) return <p>Carregando...</p>;

  return (
    <>
      <Header />
      <PokemonList pokemon={pokemon} />
      {nextPageUrl && <Pagination gotoMorePokemon={fetchNextPage} />}
    </>
  );
};

export { Home };
