import React, { useState } from "react";

function StatesSelect(props) {
  const [states, setStates] = useState([
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Malacca",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Putrajaya",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
  ]);


//   function handleOnChange(){}
  return (
    <>
      <label htmlFor="states">States</label>
      <select
      value={props.states? props.states : ""}
        name="states"
        onChange={(e)=>{
          props.onChange(e.target.name, e.target.value, states.indexOf(e.target.value))
        }}
        id="states"
        className="form-control"
      >
          <option defaultValue disabled >Select a States</option> 
          {states.map((state)=>{
              return <option key={state} value={state}>{state}</option>
          })}
      </select>
    </>
  );
}

export default StatesSelect;
