import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";


export default function Header() {
  return (
    <header className="header">
      <nav className="nav">

        <NavLink to="/" className="logo">
          <img src={logo} alt="Acort.AR" />
        </NavLink>
        
        <ul className="nav-links">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/qr">Código QR</NavLink></li>
          <li><NavLink to="/acerca">Acerca de</NavLink></li>

        </ul>
      </nav>
    </header>
  );
}