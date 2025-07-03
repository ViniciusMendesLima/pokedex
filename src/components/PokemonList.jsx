export function PokemonList({pokemon}) {
  return (
    <div>
      {pokemon.map(p => (
        <div key={p.name}>
          <h3>{p.name}</h3>
          <img src={p.image} alt={p.name} width={120}/>
        </div>
        
      ))}
    </div>
  )
}
