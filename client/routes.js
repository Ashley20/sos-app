import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppComponent from '../imports/ui/App';
import PlayerNameFormComponent from '../imports/ui/PlayerNameForm';




export const renderRoutes = () => (
    <Router>
        <div>
            <Route exact path="/" component={PlayerNameFormComponent}/>
            <Route path="/play/:playerName" component={AppComponent}/>
        </div>
    </Router>
  );