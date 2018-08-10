import React, { Component } from 'react';


export default class Box extends Component {

    render(){
        return(
            <div className="box" onClick={ () => this.props.handler(this.props.box._id) }>
                  <h1> {this.props.box.content} </h1>
            </div>
        );
    }
}