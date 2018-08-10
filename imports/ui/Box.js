import React, { Component } from 'react';


export default class Box extends Component {

    render(){
        return(
            <div className="box">
              <h1> {this.props.box.content} </h1>
            </div>
        );
    }
}