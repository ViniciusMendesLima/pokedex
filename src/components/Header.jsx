import "./styles/header.css";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import darkTema from "../assets/dark.png";
import lightTema from "../assets/light.png";
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const icon = theme === "light" ? darkTema : lightTema;
  return (
    <header>
      <img className="logo" src={logo} alt="Logo Pokedex" />

      <img
        onClick={toggleTheme}
        className={`tema ${theme}`}
        src={icon}
        alt="T"
      />
    </header>
  );
};

export { Header };
