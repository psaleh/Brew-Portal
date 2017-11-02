import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Brews } from '../api/brews';


export class BrewView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Select a Brew or Create a New Brew to Begin'
    };
  }  
  componentDidUpdate(prevProps, prevState) {
    const currentBrewId = this.props.selectedBrew ? this.props.selectedBrew._id : undefined;
    const prevBrewId = prevProps.selectedBrew ? prevProps.selectedBrew._id : undefined;

    if (currentBrewId && currentBrewId !== prevBrewId) {
      this.setState({
        title: this.props.selectedBrew.brewName
      });
    }
  }
  render(){
    return (
        <div>
          <h2>{this.state.title}</h2>
        </div>
      );
  }
}

export default withTracker(() => {
    const selectedBrewId = Session.get('selectedBrewId');
  
    return {
      selectedBrew: Brews.findOne({_id: selectedBrewId})
    };
  })(BrewView);