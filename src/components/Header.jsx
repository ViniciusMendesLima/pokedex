import "./styles/header.css";
import logo from "../assets/logo.png";
import { ThemeToggle } from "./ThemeToggle";
const Header = () => {
  return (
    <header>
      <img className="logo" src={logo} alt="Logo Pokedex" />
      <ThemeToggle />
    </header>
  );
};

export { Header };
