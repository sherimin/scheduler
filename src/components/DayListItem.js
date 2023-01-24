import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
    const dayClass = classNames("day-list__item ", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0
     });

     //To format the props.spots
     const formatSpots = (spotsRemaining) => {
        if (spotsRemaining === 0) {
            return "no spots remaining";
        } else if (spotsRemaining === 1) {
            return "1 spot remaining";
        } else {
            return `${spotsRemaining} spots remaining`;
        }
     }
    
    return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} >
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{formatSpots(props.spots)} </h3>
    </li>
  );

}