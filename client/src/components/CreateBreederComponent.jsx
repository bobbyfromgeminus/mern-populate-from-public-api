import React from "react";
import {  Link  } from "react-router-dom";

const CreateBreederComponent = (props) => {

    const getValue = (id) => {
        return (document.getElementById(id).value);
    }

    const createNewBreeder = () =>{
        const newBreeder = {
            name: getValue('name'),
            address: getValue('address'),
            phone: getValue('phone'),
            email: getValue('email'),
            web: getValue('web'),
            breed_id: getValue('breed_id')
        }
        props.createBreeder(newBreeder);
    }

    return (
            <div class="formbox">
                <h1>Create new Breeder</h1>

                <div className="flexbox center">

                    <article>

                        <div className="formgroup">
                            <label htmlFor="name">name:</label>
                            <input type="text" name="name" id="name" />
                        </div>

                        <div className="formgroup">
                            <label htmlFor="address">address:</label>
                            <input type="text" name="address" id="address" />
                        </div>

                        <div className="formgroup">
                            <label htmlFor="phone">phone:</label>
                            <input type="text" name="phone" id="phone" />
                        </div>
                    </article>

                    <article>
                        <div className="formgroup">
                            <label htmlFor="email">email:</label>
                            <input type="email" name="email" id="email" />
                        </div>

                        <div className="formgroup">
                            <label htmlFor="web">web:</label>
                            <input type="text" name="web" id="web" />
                        </div>

                        <div className="formgroup">
                            <label htmlFor="breed_id">breeds:</label>
                            <select name="breed_id" id="breed_id" >
                                {props.cats.map((cat, index) => (
                                    <option key={index} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <Link className="button" to="/breederlist" onClick={createNewBreeder}>Create</Link>
                    </article>
                </div>
            </div>
    )
}

export default CreateBreederComponent;
