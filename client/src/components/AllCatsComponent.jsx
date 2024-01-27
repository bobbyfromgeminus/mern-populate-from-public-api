import React from 'react';

const AllCatsComponent = (props) => {

    const filterHandler = (e) => {
        props.setSearchString(e.target.value);
    }

    return (
        <>
        <input placeholder="search" className="filter" type="text" name="filter" onChange={filterHandler} />
        <button className="button" type="button" onClick={ ()=>props.setFilterTarget('name') }>Filter by Name</button>
        <button className="button" type="button" onClick={ ()=>props.setFilterTarget('desc') }>Filter by Desc</button>
        <h1>Lap Friendly Cats</h1>
        <div className="flexbox">
            {props.cats.map((cat, index) => (
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

export default AllCatsComponent;