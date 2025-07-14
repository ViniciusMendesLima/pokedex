import { useContext } from "react";
import "./styles/pokemonList.css";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
export function PokemonList({ pokemon }) {
  const { theme } = useContext(ThemeContext);
  
  return (
    <section>
      <div className="list">
        {pokemon.map((p) => (          
          <Link to={`/pokemon/${p.name}`} key={p.name} state={{pokemon:p}}>
            <div className={`pokeHover pokemon ${theme}`} >
              <h3>{p.name}</h3>
              <div className="image">
                <img src={p.image} alt={p.name} width={120} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
