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
        <Link to="/breeders">Breeders</Link>
    </nav>
    
    <Outlet />
    
    <div className="editor-nav">
      <i className="fas fa-edit"></i>
      <div>
        <h2>Editor</h2>
        <Link to="/catlist"><i className="fas fa-list"></i> List of Breeds</Link>
        <Link to="/catcreator"><i className="fas fa-plus-circle"></i> Create a New Breed</Link>
        <Link to="/breederlist"><i className="fas fa-list"></i> List of Breeders</Link>
        <Link to="/breedercreator"><i className="fas fa-plus-circle"></i> Create a New Breeder</Link>
      </div>
    </div>

  </div>
);

export default Layout;
