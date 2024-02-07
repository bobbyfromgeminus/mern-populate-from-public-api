import { useState, useEffect } from "react";
import BreederTableComponent from "../components/BreederTableComponent";

const BreederList = () => {

  const [breeders, setBreeders] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filterTarget, setFilterTarget] = useState('name');
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const deleteBreeder = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/breeders/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result) setFetchTrigger(fetchTrigger + 1);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const getBreeders = async () => {
      let apiUrl = 'http://localhost:8080/api/breeders';
      if (searchString) {
        if (filterTarget==='name') apiUrl = `http://localhost:8080/api/breeders/findbyname/${searchString}`;
        else if (filterTarget==='country') apiUrl = `http://localhost:8080/api/breeders/country/${searchString}`;
      }
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setBreeders(result);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    getBreeders();
  }, [filterTarget, searchString, fetchTrigger]);

  return (
    <BreederTableComponent deleteBreeder={deleteBreeder} 
                      setFilterTarget={setFilterTarget}
                      setSearchString={setSearchString}
                      breeders={breeders} />
  );
};

export default BreederList;
