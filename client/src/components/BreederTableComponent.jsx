import React from 'react';
import {  Link  } from "react-router-dom";

const BreederTableComponent = (props) => {

    const filterHandler = (e) => {
        props.setSearchString(e.target.value);
    }

    const changeTarget = (target) => {
        props.setFilterTarget(target);
        if (target === 'name') {
            document.getElementById(`filtername`).classList.add('active');
            document.getElementById(`filtercountry`).classList.remove('active');
        } else {
            document.getElementById(`filtercountry`).classList.add('active');
            document.getElementById(`filtername`).classList.remove('active');
        }
    }

    return (
        <section>
            <main>
            <h1>Breeders</h1>
            <table>
                <thead>
                    <tr>
                        <th colSpan="7">
                            <div className="filtergroup">
                                <label htmlFor="filter">filter breeders</label>
                                <button id="filtername" className="filterbutton active" type="button" onClick={ ()=>changeTarget('name') }>by Name</button>
                                <button id="filtercountry" className="filterbutton" type="button" onClick={ ()=>changeTarget('country') }>by Country</button>
                                <input placeholder="type something" className="filter" type="text" name="filter" onChange={filterHandler} />
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>name</th>
                        <th>country</th>
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
                            <td>{breeder.country}</td>
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
