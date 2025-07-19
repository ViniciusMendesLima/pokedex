import { Link, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import "./styles/pokemonDetail.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import useScrollToTop from "../utils/scrollToTop";

const PokemonDetail = () => {
  const {
    state: { pokemon },
  } = useLocation();
  const { theme } = useContext(ThemeContext);
  useScrollToTop();
  
  return (
    <>
      <Header />
      <Link to="/">
        <button
          style={{ "--bg-color": pokemon.color }}
          className={`btn-back ${theme}`}
        >
          {" "}
          Voltar
        </button>
      </Link>
      <div className="container">
        <div
          style={{ "--bg-color": pokemon.color }}
          className={`detail pokemon ${theme}`}
        >
          <h1>
            Detalhes do <span>{pokemon.name}</span>
          </h1>
          <div className="pokemonData ">
            <div className="imagePokemon">
              <img src={pokemon.image} alt={pokemon.name} />
            </div>
            <div className="characteristics">
              <h2>Tipo </h2>
              <ul className={`displyLine ${theme}`}>
                {pokemon.types.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
              <h2>Movimentos</h2>
              <ul className={`displyLine ${theme} movesPokemon`}>
                {pokemon.moves.map((move) => (
                  <li key={move}>{move}</li>
                ))}
              </ul>
              <h2>Habilidades</h2>
              <ul className={`displyLine ${theme} abilitiesPokemon`}>
                {pokemon.abilities.map((ability) => (
                  <li key={ability.name}>
                    <h3>{ability.name}</h3>
                    <p>{ability.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { PokemonDetail };
