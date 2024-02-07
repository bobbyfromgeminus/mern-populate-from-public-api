import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import EditBreederComponent from "../components/EditBreederComponent";

const BreederEditor = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [selectedBreeder, setSelectedBreeder] = useState({});
  const [cats, setCats] = useState([]);

  const editBreeder = async (breeder) => {
    try {
      const response = await fetch(`http://localhost:8080/api/breeders/${breeder._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(breeder),
      });

      const result = await response.json();
      if (result) {
        navigate('/breederlist');
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const getBreeder = async () => {
      let apiUrl = `http://localhost:8080/api/breeders/${id}`;
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setSelectedBreeder(result);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    const getCats = async () => {
      let apiUrl = 'http://localhost:8080/api/cats';
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setCats(result);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    getBreeder();
    getCats();
  }, [setSelectedBreeder, setCats, id]);

  return (
    <EditBreederComponent editBreeder={editBreeder}
                      selectedBreeder={selectedBreeder} 
                      cats={cats} />
  );

};
  
export default BreederEditor;
  