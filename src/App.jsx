import { PokemonList } from "./components/PokemonList"
import { ThemeProvider } from "./context/ThemeContext"
import { Home } from "./pages/Home"
import { PokemonDetail } from "./pages/PokemonDetail"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  
  return (
<ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
