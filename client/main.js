import React from 'react';
import { Meteor } from 'meteor/metecleaor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.js';
 
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
