import React, { Component } from 'react';
import Box from './Box.js';


export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = this.initialState;

        this.changeTurn = this.changeTurn.bind(this);
        this.endGame = this.endGame.bind(this);
        this.restart = this.restart.bind(this);
    }

    get initialState() {
        return {
            // Initial counter value is 0. When it reaches up to 8 the game is over.
            counter: 0,
            // When the game ends we will set it to true
            end_of_the_game: false,
            // S starts first all the time
            turn: 'S',
            // No winner yet
            winner: '',
            boxes: [
                { _id: 0, content: '', selected: false},
                { _id: 1, content: '', selected: false},
                { _id: 2, content: '', selected: false},
                { _id: 3, content: '', selected: false},
                { _id: 4, content: '', selected: false},
                { _id: 5, content: '', selected: false},
                { _id: 6, content: '', selected: false},
                { _id: 7, content: '', selected: false},
                { _id: 8, content: '', selected: false}
            ]
        };
    }
    
    changeTurn(_id) {

        if(!this.state.boxes[_id].selected) {

            let newContent = this.state.turn === 'S' ? 'S' : 'O';
            let newTurn = this.state.turn === 'S' ? 'O' : 'S';

            const boxes = this.state.boxes;
            boxes[_id].selected = true;
            boxes[_id].content = newContent;

            this.setState({ 
                turn : newTurn,
                counter : this.state.counter + 1,
                boxes
            });

            // Check if there is a winner 
            this.isItSos();
        }
    }

    isRowWinner(boxes) {
        if((boxes[0].content === 'S' && boxes[1].content === 'O' && boxes[2].content === 'S') ||
            (boxes[3].content === 'S' && boxes[4].content === 'O' && boxes[5].content === 'S') ||
            (boxes[6].content === 'S' && boxes[7].content === 'O' && boxes[8].content === 'S')) 
        {
            return true;
        } 

        return false;
    }

    isColumnWinner(boxes) {
        if( (boxes[0].content === 'S' && boxes[3].content === 'O' && boxes[6].content === 'S') ||
            (boxes[1].content === 'S' && boxes[4].content === 'O' && boxes[7].content === 'S') ||
            (boxes[2].content === 'S' && boxes[5].content === 'O' && boxes[8].content === 'S'))
        {
            return true;
        }

        return false;
    }

    isDiagonalWinner(boxes) {
         if( (boxes[0].content === 'S' && boxes[4].content === 'O' && boxes[8].content === 'S') ||
         (boxes[2].content === 'S' && boxes[4].content === 'O' && boxes[6].content === 'S'))
         {
             return true;
         }

         return false;

    }

    isItSos() {
        const boxes = this.state.boxes;
    
        if(this.isRowWinner(boxes) || this.isColumnWinner(boxes) || this.isDiagonalWinner(boxes)){
            // Now we have a winner end the game and display the winner 
            this.endGame();
        }
    
    }

    endGame() {
        this.setState({
            winner: this.state.turn,
            end_of_the_game: true
        });
    }

    restart() {
        this.setState(this.initialState);
    }


    renderBoxes() {
        return this.state.boxes.map((box) => (
            <Box key={box._id} box={box} handler={this.changeTurn} />
        ));
    }

    render() {
        const isGameEnded = this.state.end_of_the_game;
        return (
            <div className="container">
              <header>
                  <h1>Sos Game </h1>
              </header>

              {isGameEnded ? (
                  <div>
                    <div className="state">
                        <h5> The game has ended.. </h5>
                    </div>
                    <div className="boxContainer">
                       <h1> {this.state.winner} has win the game!!</h1>
                       <button className="btn"  onClick={this.restart}>Restart the game </button>
                    </div>
                  </div>
        
               ) : (
                <div>
                    <div className="state">
                        <h5> TURN :  {this.state.turn} </h5>
                    </div>
                    <div className="boxContainer">
                        { this.renderBoxes() }
                    </div>
                </div>
               )}

            </div>
        );
    }
}