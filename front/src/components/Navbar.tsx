
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Dish-Dash</h1>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;