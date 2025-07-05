import './styles/pagination.css'
export default function Pagination({gotoMorePokemon}) {
  return (
    <div className='pagination'>
        {gotoMorePokemon && <button className='btn-more' onClick={gotoMorePokemon}>Mais pokemons</button>}
    </div>
  )
}
