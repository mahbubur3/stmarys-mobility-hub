import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>St Mary's Mobility Hub</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/options">Transit Options</Link></li>
        <li><Link to="/fare">Fare Calculator</Link></li>
        <li><Link to="/finder">Route Finder</Link></li>
        <li><Link to="/updates">Live Updates</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;