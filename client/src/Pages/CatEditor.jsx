import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import EditCatComponent from "../components/EditCatComponent";

const CatEditor = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [selectedCat, setSelectedCat] = useState({});

  const editCat = async (cat) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cats/${cat._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cat),
      });

      const result = await response.json();
      if (result) {
        navigate('/');
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

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
    getCat();
  }, [setSelectedCat, id]);

  return (
    <EditCatComponent editCat={editCat}
                      selectedCat={selectedCat} />
  );

};
  
export default CatEditor;
  