import "./styles/pokemonList.css";
export function PokemonList({ pokemon }) {
  return (
    <section>
      <div className="list">
        {pokemon.map((p) => (
          <div className="pokemon" key={p.name}>
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
