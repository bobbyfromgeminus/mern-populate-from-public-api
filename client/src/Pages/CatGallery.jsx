import { useState, useEffect } from "react";
import CatCardsComponent from "../components/CatCardsComponent";

const CatGallery = () => {

  const [cats, setCats] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filterTarget, setFilterTarget] = useState('name');

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
  }, [filterTarget, searchString]);

  return (
    <CatCardsComponent setFilterTarget={setFilterTarget}
                      setSearchString={setSearchString}
                      cats={cats} />
  );
};

export default CatGallery;
