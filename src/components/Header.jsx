import './styles/header.css'
import logo from '../assets/logo.png';
import darkTema from '../assets/dark.png'
const Header = () => {
  const darkTema2= 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/337.png'

  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/338.png
  return (
    <header>
        <img className='logo' src={logo} alt="Logo Pokedex" />
        <img className='tema' src={darkTema2} alt="Tema Escuro" 
        onError={(e)=>{
          e.target.onerror = null;
          e.target.src = darkTema;
        }} />

    </header>
  )
}

export {Header}