import { Header } from "../components/Header";
import { usePokemonData } from "../services/usePokemonData";

const PokemonDetail = () => {
  const pokemon = usePokemonData()
  console.log(pokemon);

  return (
    <>
      <Header />
      <div>PokemonDetail</div>
    </>
  );
};

export { PokemonDetail };
