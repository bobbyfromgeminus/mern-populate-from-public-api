import React from "react";
import {  Link  } from "react-router-dom";

const CreateCatComponent = (props) => {

    const getValue = (id) => {
        return (document.getElementById(id).value);
    }

    const createNewCat = () =>{
        const newCat = {
            name: getValue('name'),
            origin: getValue('origin'),
            description: getValue('description'),
            img_url: getValue('img_url'),
            life_span: getValue('life_span'),
            lap: getValue('lap'),
            indoor: getValue('indoor'),
            hypoallergenic: getValue('hypoallergenic')
        }
        props.createCat(newCat);
    }

    return (
        <>
        <div className="formgroup">
            <label htmlFor="name">name:</label>
            <input type="text" name="name" id="name" />
        </div>

        <div className="formgroup">
            <label htmlFor="origin">origin:</label>
            <input type="text" name="origin" id="origin" />
        </div>

        <div className="formgroup">
            <label htmlFor="description">description:</label>
            <textarea name="description" id="description" cols="30" rows="10"></textarea>
        </div>

        <div className="formgroup">
            <label htmlFor="img_url">image url:</label>
            <input type="text" name="img_url" id="img_url" />
        </div>

        <div className="formgroup">
            <label htmlFor="life_span">life span:</label>
            <input type="text" name="life_span" id="life_span" />
        </div>

        <div className="formgroup">
            <label htmlFor="lap">lap:</label>
            <input type="number" min={0} max={1} name="lap" id="lap" defaultValue={0} />
        </div>

        <div className="formgroup">
            <label htmlFor="indoor">indoor:</label>
            <input type="number" min={0} max={1} name="indoor" id="indoor" defaultValue={0} />
        </div>

        <div className="formgroup">
            <label htmlFor="hypoallergenic">hypoallergenic:</label>
            <input type="number" min={0} max={1} name="hypoallergenic" id="hypoallergenic" defaultValue={0} />
        </div>

        <Link className="button" to="/" onClick={createNewCat}>Create</Link>
        </>
    )
}

export default CreateCatComponent;
