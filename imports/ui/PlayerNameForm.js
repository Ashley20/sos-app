import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 150,
      marginTop: 200
    },
     
    container: {
      display: 'inline-block',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },

    textField: {
      marginLeft: theme.spacing.unit*2,
      marginRight: theme.spacing.unit*2,
      width: 200,
    },

    button: {
      margin: theme.spacing.unit*5,
    },
  });



class PlayerNameForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push({
            pathname: `/play/${this.state.name}`,
        });
    }

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Grid container justify="center"  alignItems="center">
                   
                    <Paper className={classes.paper}>
                        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                            <TextField
                              id="name"
                              label="Player Name"
                              className={classes.textField}
                              value={this.state.name}
                              onChange={this.handleChange}
                              margin="normal"
                            />
                           
                            <Button 
                                variant="outlined" 
                                color="primary"  
                                disabled={!this.state.name} 
                                type="submit" 
                                className={classes.button} 
                                value="Submit">
                                     Start Game
                            </Button>
                        </form>
                    </Paper>

                </Grid>
            </div>
        );
    }
}


PlayerNameForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (PlayerNameForm);