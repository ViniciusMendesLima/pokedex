import { useContext } from "react";
import "./styles/pokemonList.css";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

export function PokemonList({ pokemon }) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <section>
        <div className="list">
          {pokemon.length === 0 ? (
            <p>Não a Pokemons</p>
          ) : (
            pokemon.map((p) => (
              <Link to={`/pokemon/${p.name}`} key={p.name} state={{ pokemon: p }}>
                <div style={{ "--bg-color": p.color }} className={`pokeHover pokemon ${theme}`}>
                  <h3>{p.name}</h3>
                  <div className="image">
                    <img src={p.image} alt={p.name} width={120} />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </>
  );
}
