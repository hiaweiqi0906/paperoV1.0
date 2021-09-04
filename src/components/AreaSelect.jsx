import React, { useEffect, useState } from "react";

function AreaSelect(props) {
  const [areaLocations, setAreaLocations] = useState([
    ["Johor"],
    ["Kedah"],
    ["Kelantan"],
    ["Kuala Lumpur"],
    ["Labuan"],
    ["Malacca1", "Malacca2"],
    ["Negeri Sembilan"],
    ["Pahang"],
    ["Penang"],
    ["Perak"],
    ["Perlis"],
    ["Putrajaya"],
    ["Sabah"],
    ["Sarawak"],
    ["Selangor"],
    ["Terengganu"],
  ]);

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

  const [areasToShow, setAreasToShow] = useState(
    props.states ? areaLocations[states.indexOf(props.states)] : []
  );
  useEffect(() => {
    setAreasToShow(
      props.states ? areaLocations[states.indexOf(props.states)] : []
    );
  }, [props.states]);

  return (
    <>
      <label htmlFor="areaLocations">Area Locations</label>
      <select
        name="areaLocations"
        value={
          areasToShow.includes(props.userAreaLocation)
            ? props.userAreaLocation
            : ""
        }
        onChange={(e) => {
          props.onChange(
            e.target.name,
            e.target.value,
            areaLocations.indexOf(e.target.value)
          );
        }}
        id="areaLocations"
        className="form-control"
      >
        <option>test</option>
        {areasToShow.map((location) => {
          return (
            <option key={location} value={location}>
              {location}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default AreaSelect;
