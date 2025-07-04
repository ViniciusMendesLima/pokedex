import { PokemonList } from '../components/PokemonList';
import  Pagination  from '../components/Pagination';
import { usePokemonData } from '../hooks/usePokemonData';

const Home = () => {
  const { pokemon, loading, nextPageUrl, fetchNextPage } = usePokemonData();

  if (loading && pokemon.length === 0) return <p>Carregando...</p>;

  return (
    <>
      <PokemonList pokemon={pokemon} />
      {nextPageUrl && <Pagination gotoMorePokemon={fetchNextPage} />}
    </>
  );
};

export { Home };
