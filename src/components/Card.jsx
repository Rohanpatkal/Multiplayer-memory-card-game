import react, { useState } from 'react';

function Card(props)
{
    return(
        <>
            <div className="card m-2" style={{ width: "120px", height: "120px", overflow: "hidden" ,backgroundColor: "#ae52fa" }}>
                <div className="card-body p-1 d-flex flex-column align-items-center justify-content-center">
                {props.disp == true?<h1 className="card-title text-truncate" style={{ fontSize: "auto" }}>{props.value}</h1>:<h1 className="card-title text-truncate" style={{ fontSize: "auto" }}>#</h1>} 
                </div>
            </div>
        </>
    );
}export default Card;