import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CatListComponent from "./components/CatListComponent";
import AllCatsComponent from "./components/AllCatsComponent";
import LapFriendlyCatsComponent from "./components/LapFriendlyCatsComponent";
import CreateCatComponent from "./components/CreateCatComponent";
import EditCatComponent from "./components/EditCatComponent";

function App() {
  const [cats, setCats] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [fetchCounter, setFetchCounter] = useState(0);
  const [selectedCat, setSelectedCat] = useState({});
  const apiUrl = "http://localhost:8080/api/cats";

  const searchFromName = (e) => {
    setNameSearch(e.target.value);
  };

  const deleteCat = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result) setFetchCounter(fetchCounter + 1);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const createCat = async (cat) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cat),
      });
      const result = await response.json();
      if (result) {
        setFetchCounter(fetchCounter + 1);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const editCat = async (cat) => {
    try {
      const response = await fetch(`${apiUrl}/${cat._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cat),
      });

      const result = await response.json();
      if (result) setFetchCounter(fetchCounter + 1);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const getCats = async () => {
      let apiUrl = "http://localhost:8080/api/cats";
      if (nameSearch) {
        apiUrl = `http://localhost:8080/api/cats/searchbydesc/${nameSearch}`;
      }
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setCats(result);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    getCats();
  }, [nameSearch, fetchCounter]);

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">List of Cats</Link>
          <Link to="/createcat">Create a New Cat</Link>
          <Link to="/allcats">Show all cats</Link>
          <Link to="/lapfriendly">Show lap friendly cats only</Link>
        </nav>

        <main>
          <Routes>

            // Cat Table
            <Route  path="/" 
                    exact
                    element={ <CatListComponent cats={cats} 
                                                setSelectedCat={setSelectedCat}
                                                searchFromName={searchFromName} 
                                                createCat={createCat} editCat={editCat} deleteCat={deleteCat}/> } />

            // Cat cards - All Cats
            <Route  path="/allcats"
                    element={ <AllCatsComponent cats={cats} 
                                                searchFromName={searchFromName}/> } />
                                                
            // Cat cards - Lap Friendly Cats
            <Route  path="/lapfriendly" 
                    element={<LapFriendlyCatsComponent />} />

            // Create New Cat
            <Route  path="/createcat" 
                    element={<CreateCatComponent createCat={createCat} />} />

            // Edit a Cat
            <Route  path="/editcat/:id" 
                    element={<EditCatComponent  editCat={editCat}
                                                selectedCat={selectedCat} />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
