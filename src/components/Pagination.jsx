import './styles/pagination.css'
export default function Pagination({gotoMorePokemon}) {
  return (
    <div className='pagination'>
        {gotoMorePokemon && <button onClick={gotoMorePokemon}>Mais pokemons</button>}
    </div>
  )
}
