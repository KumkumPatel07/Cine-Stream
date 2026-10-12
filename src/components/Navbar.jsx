import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Cine<span>Stream</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">❤️ Favorites</Link>
      </nav>
    </header>
  );
}

export default Navbar;