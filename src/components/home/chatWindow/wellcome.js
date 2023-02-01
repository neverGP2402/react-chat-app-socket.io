import React from "react";
import wellcome from '../../../assets/image/robot.gif'
function WellcomePage () {
    return(
        <div className="wellcome">
            <img src={wellcome} alt="" />
            <h3 className="description"><i>Wellcome to <b>C-ALO</b>.!</i></h3>
            <b>Wish you have great conversations.!</b>
        </div>
    )
}

export default WellcomePage;