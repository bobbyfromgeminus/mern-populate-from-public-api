import CreateBreederComponent from "../components/CreateBreederComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BreederCreator = () => {

    const navigate = useNavigate();

    const [cats, setCats] = useState([]);

    const createBreeder = async (breeder) => {
        try {
          const response = await fetch(`http://localhost:8080/api/breeders`, {
            method: "POST",
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
      getCats();
    }, [setCats]);

    return (
      <CreateBreederComponent createBreeder={createBreeder} cats={cats} />
    );
  };
  
  export default BreederCreator;
  