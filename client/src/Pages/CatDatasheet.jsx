import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CatDataComponent from "../components/CatDataComponent";

const CatDatasheet = () => {

  const { id } = useParams();

  const [selectedCat, setSelectedCat] = useState({});
  const [breeders, setBreeders] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      let apiUrl = `http://localhost:8080/api/cats/${id}`;
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setSelectedCat(result);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    const getBreeders = async () => {
      let apiBreedersUrl = `http://localhost:8080/api/breeders/breedid/${id}`;
      try {
        const respBreeders = await fetch(apiBreedersUrl);
        const resBreeders = await respBreeders.json();
        setBreeders(resBreeders);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    getCat();
    getBreeders()

  }, [setSelectedCat, setBreeders, id]);

  return (
    <CatDataComponent selectedCat={selectedCat} breeders={breeders} />
  );

};
  
export default CatDatasheet;