import React, { useState } from "react";

function AreaSelect(props) {
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
      <label htmlFor="location">Location</label>
      <select
        name="location"
        onChange={(e)=>{
    props.onChange(e.target.name, e.target.value, states.indexOf(e.target.value))
  }}
        id="location"
        className="form-control"
      >
          <option>test</option> 
          {states.map((state)=>{
              return <option key={state} value={state}>{state}</option>
          })}
        {/* <%var options = [ "Simpang Ampat", "Butterworth" ];
            htmlFor ( var i = 0; i < options.length; i++ )
            {
                var selected = ( user.location == options[i]) ? "selected" : "";
                %><option value="<%=options[ i ]%>" <%=selected %>><%=options[ i ] %></option><%
            }
            %> */}
      </select>
    </>
  );
}

export default AreaSelect;
