export default function Pagination({gotoMorePokemon}) {
  return (
    <div>
        {gotoMorePokemon && <button onClick={gotoMorePokemon}>Mais pokemons</button>}
    </div>
  )
}
