import React, { Component } from 'react';
import Box from './Box.js';


export default class App extends Component {

    getBoxes() {
        return [
            { _id: 0, content: ''},
            { _id: 1, content: ''},
            { _id: 2, content: ''},
            { _id: 3, content: ''},
            { _id: 4, content: ''},
            { _id: 5, content: ''},
            { _id: 6, content: ''},
            { _id: 7, content: ''},
            { _id: 8, content: ''}
        ];
    }

    renderBoxes() {
        return this.getBoxes().map((box) => (
            <Box key={box._id} box={box} />
        ));
    }

    render() {
        return (
            <div className="container">
              <header>
                  <h1>Sos Game </h1>
              </header>
              <div className="boxContainer">
                  { this.renderBoxes() }
              </div>
            </div>
        );
    }
}