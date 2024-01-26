import { useState, useEffect } from "react";
import React from 'react';

const LapFriendlyCatsComponent = () => {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
          let apiUrl = "http://localhost:8080/api/cats?lap=1";
          try {
            const response = await fetch(apiUrl);
            const result = await response.json();
            setCats(result);
          } catch (error) {
            console.error("Error:", error.message);
          }
        };
        getCats();
    }, []);

    return (
        <>
        <h1>Lap Friendly Cats</h1>
        <div className="flexbox">
            {cats.map((cat, index) => (
              <div className="flip-card" key={cat._id}>
              <div className="flip-card-inner">
              <div className="flip-card-front" style={{backgroundImage: `url("${cat.img_url}")` }}></div>
              <div className="flip-card-back">
                  <h2>{cat.name}</h2>
                  <h3>from {cat.origin}</h3>
                  <h4>lap friendly: {cat.lap}</h4>
                  <p>Architect & Engineer</p>
                  <p>{cat.description}</p>
              </div>
              </div>
          </div>
            ))}
        </div>
        </>
    );
};

export default LapFriendlyCatsComponent;