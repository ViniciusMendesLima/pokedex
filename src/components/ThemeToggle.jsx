import "./styles/themeToggle.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import darkTema from "../assets/dark.png";
import lightTema from "../assets/light.png";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
      const icon = theme === "light" ? darkTema : lightTema;
  return (
    <img
        onClick={toggleTheme}
        className={`tema ${theme}`}
        src={icon}
        alt="Tema"
      />
  )
}

export  {ThemeToggle}