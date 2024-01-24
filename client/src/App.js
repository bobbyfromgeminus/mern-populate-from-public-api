import { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [cats, setCats] = useState([]);
  const [searchString, setSearchString] = useState('');

  //const apiUrl = '/api/cats';
  const apiUrl = 'http://localhost:8080/api/cats';

  // paraméterezhető fetch segédfüggvény
  const fetchData = async (url, reqMethod, urlExt = '', data = null) => {
    const fetchUrl = url + urlExt;
    const options = {
      method: reqMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    };
    try {
      const response = await fetch(fetchUrl, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  useEffect(() => {
      const getCats = async () => {
        try {
          let urlExt = '';
          searchString==='' ? urlExt='' : urlExt='/searchbyname/'+searchString;
          const catResp = await fetchData(apiUrl+urlExt, 'GET')
          setCats(catResp);

        } catch (error) {
          console.error('Hiba történt:', error);
        }
      };
    
      getCats();
  }, [searchString]);


  const searchByName = (e) => {
    setSearchString(e.target.value);
  }


  return (
    <>
      <nav>
        nav
      </nav>

      <aside>
        lorem ipsum
      </aside>

      <header>
        <input type="text" placeholder='search a cat' onChange={searchByName}/>
      </header>
      
      <div className="App">
        {
          cats.map((cat, index) => (
            <div className="card" key={index} id={cat._id}>
                <div className='card-image' style={{ backgroundImage: `url(${cat.img_url})` }}></div>
                <div className='card-content'>
                  <h2>{cat.name}</h2>
                  <h3>origin: {cat.origin}</h3>
                  <p>{cat.description}</p>
                </div>
            </div>
          ))
        }

      </div>
    </>
  );
}

export default App;
