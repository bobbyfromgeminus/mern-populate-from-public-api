import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [cats, setCats] = useState([]);

  //const apiUrl = '/api/cats';
  const apiUrl = 'http://localhost:8080/api/cats';

  // paraméterezhető fetch segédfüggvény
  const fetchData = async (reqMethod, urlExt = '', data = null) => {
    const url = apiUrl + urlExt;
    const options = {
      method: reqMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  useEffect(() => {
      const getCats = async () => {
        try {
          const catResp = await fetchData('GET');
          setCats(catResp);

        } catch (error) {
          console.error('Hiba történt:', error);
        }
      };
    
      getCats();
  }, []);


  return (
    <div className="App">
      <table>
          <thead>
            <tr>
              <th>name</th>
              <th>origin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cats.map((cat, index) => (
              <tr key={index} id={cat._id}>
                  <td>{cat.name}</td>
                  <td>{cat.origin}</td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}

export default App;
