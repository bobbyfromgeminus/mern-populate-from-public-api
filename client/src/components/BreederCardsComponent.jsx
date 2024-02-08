import React from 'react';

const BreederCardsComponent = (props) => {

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
            <div className="filtergroup">
                <label htmlFor="filter">filter breeders</label>
                <button id="filtername" className="filterbutton active" type="button" onClick={ ()=>changeTarget('name') }>by Name</button>
                <button id="filtercountry" className="filterbutton" type="button" onClick={ ()=>changeTarget('country') }>by Country</button>
                <input placeholder="type something" className="filter" type="text" name="filter" onChange={filterHandler} />
            </div>

            <div className="flexbox">
                {props.breeders.map((breeder, index) => (
                    <div className="breeder-card w-400px" key={index}>
                        <h2>{breeder.name}</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>country:</td>
                                    <td><b>{breeder.country}</b></td>
                                </tr>
                                <tr>
                                    <td>address:</td>
                                    <td>{breeder.address}</td>
                                </tr>
                                <tr>
                                    <td>phone:</td>
                                    <td>{breeder.phone}</td>
                                </tr>
                                <tr>
                                    <td>email:</td>
                                    <td><a href={`mailto: ${breeder.email}`}>click here!</a></td>
                                </tr>
                                <tr>
                                    <td>web:</td>
                                    <td><a href={breeder.web} target="_blank" rel="noreferrer">click here!</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BreederCardsComponent;