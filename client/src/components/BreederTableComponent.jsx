import React from 'react';
import {  Link  } from "react-router-dom";

const BreederTableComponent = (props) => {

    const filterHandler = (e) => {
        props.setSearchString(e.target.value);
    }

    return (
        <section>
            <main>
            <h1>Breeders</h1>
            <table>
                <thead>
                    <tr>
                        <th colSpan="6">
                            <div className="filtergroup">
                                <label htmlFor="filter">filter breeders</label>
                                <button className="filterbutton" type="button" onClick={ ()=>props.setFilterTarget('name') }>by Name</button>
                                <button className="filterbutton" type="button" onClick={ ()=>props.setFilterTarget('country') }>by Country</button>
                                <input placeholder="type something" className="filter" type="text" name="filter" onChange={filterHandler} />
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>name</th>
                        <th>address</th>
                        <th>phone</th>
                        <th>email</th>
                        <th>web</th>
                        <th>controllers</th>
                    </tr>
                </thead>
                <tbody>
                    {props.breeders.map((breeder, index) => (
                        <tr key={index} id={breeder._id}>
                            <td>{breeder.name}</td>
                            <td>{breeder.address}</td>
                            <td>{breeder.phone}</td>
                            <td>{breeder.email}</td>
                            <td>{breeder.web}</td>
                            <td>
                                <div>
                                    <Link className="button" to={`/breedereditor/${breeder._id}`}>Edit</Link>
                                    <button className="button" type="button" onClick={ () => props.deleteBreeder(breeder._id) }>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </main>
        </section>
    );
};

export default BreederTableComponent;
