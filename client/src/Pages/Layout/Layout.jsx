import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <header>
      <p>CATFINDER</p>
      Learn about cat breeds and their European breeders
    </header>
    <nav>
        <Link to="/">Breeds</Link>
        <Link to="/catcreator">Create a New Cat</Link>
        <Link to="/catlist">List of Cats</Link>
        <Link to="/breeders">Breeders</Link>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
