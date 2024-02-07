import React from 'react';
import { Link } from "react-router-dom";

const AllCatsComponent = (props) => {

    const filterHandler = (e) => {
        props.setSearchString(e.target.value);
    }

    return (
        <section>
            <div className="filtergroup">
                <label htmlFor="filter">filter breeds</label>
                <button className="filterbutton" type="button" onClick={ ()=>props.setFilterTarget('name') }>by Name</button>
                <button className="filterbutton" type="button" onClick={ ()=>props.setFilterTarget('desc') }>by Desc</button>
                <input placeholder="type something" className="filter" type="text" name="filter" onChange={filterHandler} />
            </div>

            <div className="flexbox">
                {props.cats.map((cat, index) => (
                    <Link className="flip-card" key={cat._id} to={`/catdatasheet/${cat._id}`} >
                        <div className="flip-card-inner">
                        <div className="flip-card-front" style={{backgroundImage: `url("${cat.img_url}")` }}></div>
                        <div className="flip-card-back">
                            <h2>{cat.name}</h2>
                            <h3>from {cat.origin}</h3>
                            <h4>lap friendly: {cat.lap}</h4>
                            <p>{cat.description}</p>
                        </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default AllCatsComponent;