import React from 'react';

// Size list component
const arrayLength = (props) => {
    return (
        <span className="options">
            <select 
                name="arrayLength" id="menu" className="size-menu"
                onChange = {(e) => props.onChange(e.target.value, "arrayLength")}>
                {props.lengths.map(element => (
                    <option 
                        key = {10*element}
                        value = {element}>
                        {element}
                    </option>
                ))}
            </select>
        </span>
    );
}
 
export default arrayLength;