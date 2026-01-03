import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-links">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/qr">Código QR</NavLink></li>
          <li><NavLink to="/acerca">Acerca de</NavLink></li>

        </ul>

        <div className="lang">
          <span>¡De 🇦🇷 para el mundo! 🌎</span>
        </div>
      </nav>
    </header>
  );
}