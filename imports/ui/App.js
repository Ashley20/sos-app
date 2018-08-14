import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from './Box.js';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },

    button: {
      margin: theme.spacing.unit*5,
    },
  });

class App extends Component {

    constructor(props) {
        super(props)

        this.state = this.initialState;

        this.changeTurn = this.changeTurn.bind(this);
        this.isItSos = this.isItSos.bind(this);
        this.endGame = this.endGame.bind(this);
        this.restart = this.restart.bind(this);

        console.log(props.match.params);
    }

    get initialState() {
        return {
            // Initial counter value is 0. When it reaches up to 8 the game is over.
            counter: 0,
            // When the game ends we will set it to true
            end_of_the_game: false,
            // Game will be locked while the computer makes its move
            game_is_locked: false,
            // S starts first all the time
            turn: 'S',
            // No winner yet
            resultLine: '',
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

        if(this.state.end_of_the_game || this.state.game_is_locked) return;

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
            }, () => {
                 // Check if there is a winner or is it tie??
                let gameResult = this.isItSos();
                let newWinner = '';

                switch(gameResult){
                    case 'win': 
                                newWinner = this.state.turn === 'S' ? 'Computer' : this.props.match.params.playerName;
                                this.endGame(newWinner);
                                break;
                    case 'tie':
                                newWinner = 'tie';
                                this.endGame(newWinner);
                                break;
                    case 'continue':
                                if(this.state.turn === 'O'){
                                    this.state.game_is_locked = true;

                                    setTimeout(() => {
                                        do{
                                            var random  = Math.floor(Math.random()*9);
                                        }while(boxes[random].content != '');
                                        this.state.game_is_locked = false;

                                        this.changeTurn(random);
                                    }, 2000);
                                }
                                
                }
            });


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
            return 'win';
        }else if (this.state.counter === 9){
            // We have no winner yet its a TIE.
            return 'tie';
        }else {
            return 'continue';
        }
    }

    endGame(winner) {
        let resultLine = '';

        if(winner === 'tie'){
            resultLine = 'Game ended in a tie.'
        }else {
            resultLine = `${winner} has win the game`;
        }

        this.setState({
            resultLine: resultLine,
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
        const { classes } = this.props;
        return (
            <div className="container">
              <header>
                  <h1>Sos Game </h1>
              </header>

              {isGameEnded ? (
                  <div className="boxContainer">
                    <Paper className={classes.paper}>
                        <h2>{this.state.resultLine}</h2>
                        <Button 
                            variant="outlined" 
                            color="primary"
                            onClick={this.restart}
                            className={classes.button} >
                                    Restart the game
                        </Button>
                    </Paper>
                  </div>
        
               ) : (
                <Paper className={classes.paper}>
                   <div className="state">
                        <h5> Next  :  {this.state.turn} </h5>
                   </div>
                   <div className="boxContainer">
                        { this.renderBoxes() }
                   </div>
                </Paper>
               )}

            </div>
        );
    }
}


export default withStyles(styles) (App);