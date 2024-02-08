import { useState, useEffect } from "react";
import BreederCardsComponent from "../components/BreederCardsComponent";

const BreederGallery = () => {

  const [breeders, setBreeders] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filterTarget, setFilterTarget] = useState('name');

  useEffect(() => {
    const getBreeders = async () => {
      let apiUrl = 'http://localhost:8080/api/breeders';
      if (searchString) {
        if (filterTarget==='name') apiUrl = `http://localhost:8080/api/breeders/findbyname/${searchString}`;
        else if (filterTarget==='country') apiUrl = `http://localhost:8080/api/breeders/findbycountry/${searchString}`;
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
  }, [filterTarget, searchString]);

  return (
    <BreederCardsComponent  setFilterTarget={setFilterTarget}
                            setSearchString={setSearchString}
                            breeders={breeders} />

  );
};

export default BreederGallery;
