import React from 'react';
import {  Link  } from "react-router-dom";

const CatTableComponent = (props) => {

    const filterHandler = (e) => {
        props.setSearchString(e.target.value);
    }

    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th colSpan="6">
                            <div className="filtergroup">
                                <label htmlFor="filter">filter breeds</label>
                                <button className="filterbutton" type="button" onClick={ ()=>props.setFilterTarget('name') }>by Name</button>
                                <button className="filterbutton" type="button" onClick={ ()=>props.setFilterTarget('desc') }>by Desc</button>
                                <input placeholder="type something" className="filter" type="text" name="filter" onChange={filterHandler} />
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>image</th>
                        <th>name</th>
                        <th>origin</th>
                        <th>lap friendly</th>
                        <th>description</th>
                        <th>controllers</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cats.map((cat, index) => (
                        <tr key={index} id={cat._id}>
                            <td>
                                <div style={{backgroundImage: `url("${cat.img_url}")` }}></div>
                            </td>
                            <td>{cat.name}</td>
                            <td>{cat.origin}</td>
                            <td>{cat.lap}</td>
                            <td>{cat.description}</td>
                            <td>
                                <div>
                                    <Link className="button" to={`/cateditor/${cat._id}`}>Edit</Link>
                                    <button className="button" type="button" onClick={ () => props.deleteCat(cat._id) }>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default CatTableComponent;
