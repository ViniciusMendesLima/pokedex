import { ThemeProvider } from "./context/ThemeContext"
import { Home } from "./pages/Home"
import { PokemonDetail } from "./pages/PokemonDetail"
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  
  return (
<ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
