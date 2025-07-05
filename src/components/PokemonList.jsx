import { useContext } from "react";
import "./styles/pokemonList.css";
import { ThemeContext } from "../context/ThemeContext";
export function PokemonList({ pokemon }) {
  const { theme, } = useContext(ThemeContext);
  
  return (

      
      <section>
        <div className="list">
          {pokemon.map((p) => (
            <div className={`pokemon ${theme}`} key={p.name}>
              <h3>{p.name}</h3>
              <div className="image">
                <img src={p.image} alt={p.name} width={120} />
              </div>
            </div>
          ))}
        </div>
      </section>

  );
}
