import React from "react";

const setDay = (param1, param2) => {

}

export default function DayListItem(props) {
    
    return (
    <li onClick={() => props.setDay(props.name)} >
        <h2 className="text--regular">Day Name</h2> 
        <h3 className="text--light">X spots remaining</h3>
    </li>
  );
  
}