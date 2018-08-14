import React from 'react';

const Box = (props) => {
    return (
        <div className="box" onClick={ () => props.handler(props.box._id) }>
            <h1> {props.box.content} </h1>
        </div>
    );
};

export default Box;