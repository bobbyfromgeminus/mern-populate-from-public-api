import React from 'react';
import {  Link  } from "react-router-dom";

const CatListComponent = (props) => {

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan="6">
                        <input placeholder="search" className="filter" type="text" name="namefilter" onChange={props.searchFromName} />
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
                                <Link className="button" to={`/editcat/${cat._id}`} onClick={ () => props.setSelectedCat(cat) }>Edit</Link>
                                <button className="button" type="button" onClick={ () => props.deleteCat(cat._id) }>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CatListComponent;
