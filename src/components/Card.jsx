// import react, { useState } from 'react';

// function Card(props)
// {
//     var s = {width: "120px", height: "120px", overflow: "hidden", backgroundColor: (props.disp == true)?"#006eff":"#ae52fa"};
//     return(
//         <>
//             <div className="card m-2" style={s}>
//                 <div className="card-body p-1 d-flex flex-column align-items-center justify-content-center">
//                 {props.disp == true?<h1 className="card-title text-truncate" style={{ fontSize: "auto" }}>{props.value}</h1>:<h1 className="card-title text-truncate" style={{ fontSize: "auto" }}>#</h1>} 
//                 </div>
//             </div>
//         </>
//     );
// }export default Card;

import React from 'react';
import './Card.css'; // Import your CSS file

function Card(props) {
    return (
        <div 
            className={`card m-2 ${props.disp ? "active-card" : ""} border border-3 border-black`} 
            style={{ width: "120px", height: "120px", overflow: "hidden" }}
        >
            <div className="card-body  p-1 d-flex flex-column align-items-center justify-content-center">
                <h1 className="card-title text-truncate" style={{ fontSize: "auto" }}>
                    {props.disp ? props.value : "#"}
                </h1>
            </div>
        </div>
    );
}

export default Card;
