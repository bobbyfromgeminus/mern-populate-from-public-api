import CreateCatComponent from "../components/CreateCatComponent";
import { useNavigate } from "react-router-dom";

const CatCreator = () => {

    const navigate = useNavigate();

    const createCat = async (cat) => {
        try {
          const response = await fetch(`http://localhost:8080/api/cats`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cat),
          });
          const result = await response.json();
          if (result) {
            navigate('/catlist');
          }
        } catch (error) {
          console.error("Error:", error.message);
        }
    };

    return (
      <CreateCatComponent createCat={createCat} />
    );
  };
  
  export default CatCreator;
  