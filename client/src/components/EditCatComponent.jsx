import React from "react";
import { useParams } from 'react-router-dom';
import {  Link  } from "react-router-dom";

const EditCatComponent = (props) => {

    const { id } = useParams();

    const getValue = (id) => {
        return (document.getElementById(id).value);
    }

    const updateCat = () =>{
        const updatedCat = {
            _id: id,
            name: getValue('name'),
            origin: getValue('origin'),
            description: getValue('description'),
            reference_image_id: getValue('reference_image_id'),
            life_span: getValue('life_span'),
            lap: getValue('lap'),
            indoor: getValue('indoor'),
            hypoallergenic: getValue('hypoallergenic')
        }
        props.editCat(updatedCat);
    }

    return (
        <>
        <p>Editing cat with ID: {id}</p>

        <div className="formgroup">
            <label htmlFor="name">name:</label>
            <input type="text" name="name" id="name" defaultValue={props.selectedCat.name}/>
        </div>

        <div className="formgroup">
            <label htmlFor="origin">origin:</label>
            <input type="text" name="origin" id="origin" defaultValue={props.selectedCat.origin}/>
        </div>

        <div className="formgroup">
            <label htmlFor="description">description:</label>
            <textarea name="description" id="description" cols="30" rows="10" defaultValue={props.selectedCat.description}></textarea>
        </div>

        <div className="formgroup">
            <label htmlFor="reference_image_id">image url:</label>
            <input type="text" name="reference_image_id" id="reference_image_id" defaultValue={props.selectedCat.reference_image_id}/>
        </div>

        <div className="formgroup">
            <label htmlFor="life_span">life span:</label>
            <input type="text" name="life_span" id="life_span" defaultValue={props.selectedCat.life_span}/>
        </div>

        <div className="formgroup">
            <label htmlFor="lap">lap:</label>
            <input type="number" min={0} max={1} name="lap" id="lap" defaultValue={props.selectedCat.lap} />
        </div>

        <div className="formgroup">
            <label htmlFor="indoor">indoor:</label>
            <input type="number" min={0} max={1} name="indoor" id="indoor" defaultValue={props.selectedCat.indoor} />
        </div>

        <div className="formgroup">
            <label htmlFor="hypoallergenic">hypoallergenic:</label>
            <input type="number" min={0} max={1} name="hypoallergenic" id="hypoallergenic" defaultValue={props.selectedCat.hypoallergenic} />
        </div>

        <Link className="button" to="/" onClick={updateCat}>Update</Link>
        </>
    )
}

export default EditCatComponent;
