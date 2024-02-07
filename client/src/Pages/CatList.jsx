import { useState, useEffect } from "react";
import CatTableComponent from "../components/CatTableComponent";

const CatList = () => {

  const [cats, setCats] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filterTarget, setFilterTarget] = useState('name');
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const deleteCat = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cats/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result) setFetchTrigger(fetchTrigger + 1);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const getCats = async () => {
      let apiUrl = 'http://localhost:8080/api/cats';
      if (searchString) {
        if (filterTarget==='name') apiUrl = `http://localhost:8080/api/cats/findbyname/${searchString}`;
        else if (filterTarget==='desc') apiUrl = `http://localhost:8080/api/cats/findbydesc/${searchString}`;
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
  }, [filterTarget, searchString, fetchTrigger]);

  return (
    <CatTableComponent deleteCat={deleteCat} 
                      setFilterTarget={setFilterTarget}
                      setSearchString={setSearchString}
                      cats={cats} />
  );
};

export default CatList;
