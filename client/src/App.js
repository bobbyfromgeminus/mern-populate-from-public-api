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
  const [searchString, setSearchString] = useState('');
  const [filterTarget, setFilterTarget] = useState('name');
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [selectedCat, setSelectedCat] = useState({});

  const apiUrls = {
    simple:     function() {
                  return `http://localhost:8080/api/cats`;
                },
    findByName: function(searchString) {
                  return `http://localhost:8080/api/cats/findbyname/${searchString}`;
                },
    findByDesc: function(searchString) {
                  return `http://localhost:8080/api/cats/findbydesc/${searchString}`;
                }
  }

  const deleteCat = async (id) => {
    try {
      const response = await fetch(`${apiUrls.simple()}/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result) setFetchTrigger(fetchTrigger + 1);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const createCat = async (cat) => {
    try {
      const response = await fetch(apiUrls.simple(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cat),
      });
      const result = await response.json();
      if (result) {
        setFetchTrigger(fetchTrigger + 1);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const editCat = async (cat) => {
    try {
      const response = await fetch(`${apiUrls.simple()}/${cat._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cat),
      });

      const result = await response.json();
      if (result) setFetchTrigger(fetchTrigger + 1);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const getCats = async () => {
      let apiUrl = apiUrls.simple();
      if (searchString) {
        if (filterTarget==='name') apiUrl = apiUrls.findByName(searchString);
        else if (filterTarget==='desc') apiUrl = apiUrls.findByDesc(searchString);
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
  }, [apiUrls, filterTarget, searchString, fetchTrigger]);

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
                                                setSearchString={setSearchString} 
                                                setFilterTarget={setFilterTarget}
                                                createCat={createCat} 
                                                editCat={editCat} 
                                                deleteCat={deleteCat}/> } />

            // Cat cards - All Cats
            <Route  path="/allcats"
                    element={ <AllCatsComponent cats={cats} 
                                                setSearchString={setSearchString} 
                                                setFilterTarget={setFilterTarget} /> } />
                                                
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
