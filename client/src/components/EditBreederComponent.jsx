import React from "react";
import {  Link  } from "react-router-dom";
import { useState } from "react";

const EditBreederComponent = (props) => {

    const [breedID, setBreedID] = useState(props.selectedBreeder.breed_id);

    const getValue = (id) => {
        return (document.getElementById(id).value);
    }

    const updateBreeder = () =>{
        const updatedBreeder = {
            _id: getValue('_id'),
            name: getValue('name'),
            address: getValue('address'),
            phone: getValue('phone'),
            email: getValue('email'),
            web: getValue('web'),
            breed_id: getValue('breed_id')
        }
        props.editBreeder(updatedBreeder);
    }

    return (
        
            <div class="formbox">
                <h1>Editing Breeder</h1>
                <h5>ID: {props.selectedBreeder._id}</h5>

                <div className="flexbox center">
                    <article>

                        <input type="hidden" name="_id" id="_id" defaultValue={props.selectedBreeder._id}/>

                        <div className="formgroup">
                            <label htmlFor="name">name:</label>
                            <input type="text" name="name" id="name" defaultValue={props.selectedBreeder.name}/>
                        </div>

                        <div className="formgroup">
                            <label htmlFor="address">address:</label>
                            <input type="text" name="address" id="address" defaultValue={props.selectedBreeder.address}/>
                        </div>

                        <div className="formgroup">
                            <label htmlFor="phone">phone:</label>
                            <input type="text" name="phone" id="phone" defaultValue={props.selectedBreeder.phone}/>
                        </div>
                    </article>

                    <article>
                        <div className="formgroup">
                            <label htmlFor="email">email:</label>
                            <input type="email" name="email" id="email" defaultValue={props.selectedBreeder.email}/>
                        </div>

                        <div className="formgroup">
                            <label htmlFor="web">web:</label>
                            <input type="text" name="web" id="web" defaultValue={props.selectedBreeder.web}/>
                        </div>

                        <div className="formgroup">
                            <label htmlFor="breed_id">breeds:</label>
                            <select name="breed_id" id="breed_id" value={breedID} defaultValue={breedID}>
                                {props.cats.map((cat, index) => (
                                    <option key={index} value={cat._id} onChange={(e) => setBreedID(e.target.value)}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        

                        <Link className="button" to="/" onClick={updateBreeder}>Update</Link>
                    </article>

                </div>

            </div>

    )
}

export default EditBreederComponent;
