import React from 'react';
import { Link } from "react-router-dom";

const AllCatsComponent = (props) => {

    const filterHandler = (e) => {
        props.setSearchString(e.target.value);
    }

    const changeTarget = (target) => {
        props.setFilterTarget(target);
        if (target === 'name') {
            document.getElementById(`filtername`).classList.add('active');
            document.getElementById(`filterdesc`).classList.remove('active');
        } else {
            document.getElementById(`filterdesc`).classList.add('active');
            document.getElementById(`filtername`).classList.remove('active');
        }
    }

    return (
        <section>
            <div className="filtergroup">
                <label htmlFor="filter">filter breeds</label>
                <button id="filtername" className="filterbutton active" type="button" onClick={ ()=>changeTarget('name') }>by Name</button>
                <button id="filterdesc" className="filterbutton" type="button" onClick={ ()=>changeTarget('desc') }>by Desc</button>
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