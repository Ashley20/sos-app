import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppComponent from '../imports/ui/App';
import EntryComponent from '../imports/ui/Entry';




export const renderRoutes = () => (
    <Router>
        <div>
            <Route exact path="/" component={AppComponent}/>
            <Route path="/login" component={EntryComponent}/>
        </div>
    </Router>
  );