import React from "react";

const EditBreederComponent = (props) => {

    console.log(props.selectedBreeder.breed_id);
    const getValue = (id) => {
        return (document.getElementById(id).value);
    }

    const updateBreeder = () =>{
        const updatedBreeder = {
            _id: getValue('_id'),
            name: getValue('name'),
            country: getValue('country'),
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
                            <label htmlFor="country">country:</label>
                            <input type="text" name="country" id="country" defaultValue={props.selectedBreeder.country}/>
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
                            <select name="breed_id" id="breed_id">
                                {props.cats.map((cat, index) => (
                                    <option key={index} value={cat._id} selected={cat._id === props.selectedBreeder.breed_id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <button type="button" className="button" onClick={updateBreeder}>Update</button>
                    </article>

                </div>

            </div>

    )
}

export default EditBreederComponent;
