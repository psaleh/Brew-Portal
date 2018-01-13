import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Brews } from '../api/brews';
import { BrewData } from '../api/brewdata';
import Widget from './Widget';
import BrewChart from './BrewChart';
import moment from 'moment';


export class BrewView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Select a Brew or Create a New Brew to Begin',
      gravity: '-.---',
      temperature: '--.-',
      lastUpdate: null
    };
  }  
  componentDidUpdate(prevProps, prevState) {
    const currentBrewId = this.props.selectedBrew ? this.props.selectedBrew._id : undefined;
    const prevBrewId = prevProps.selectedBrew ? prevProps.selectedBrew._id : undefined;
    const currentBrewData = this.props.selectedBrewData ? this.props.selectedBrewData[0] : undefined;
    const prevBrewData = prevProps.selectedBrewData ? prevProps.selectedBrewData[0] : undefined;

    if (currentBrewId && currentBrewId !== prevBrewId) {
      this.setState({
        title: this.props.selectedBrew.brewName,
        gravity: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].gravity : 'No Data',
        temperature: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].temperature : 'No Data',
        lastUpdate: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].timeStamp : null
      });
    } else if (currentBrewData && currentBrewData !== prevBrewData) {
      this.setState({
        gravity: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].gravity : 'No Data',
        temperature: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].temperature : 'No Data',
        lastUpdate: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].timeStamp : null
    });
  }
}

  render(){
    return (
        <div>
          <div className="row my-4">
            <h3 className="mx-auto">{this.state.title}</h3>
          </div>
          <div className="row">
            <div className="col-sm text-center">
              <Widget widgetTitle="Current Gravity" widgetData={this.state.gravity} lastUpdate={moment(this.state.lastUpdate).fromNow()} />
            </div>
            <div className="col-sm text-center">
              <Widget widgetTitle="Current Temperature" widgetData={this.state.temperature} lastUpdate={moment(this.state.lastUpdate).fromNow()} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <BrewChart 
                data={this.props.selectedBrewData} 
                dataKey="gravity" 
                domain={[1, 'dataMax + 0.005']} 
                target={this.props.selectedBrew ? this.props.selectedBrew.targetFg : undefined} />
            </div>
            <div className="col-sm">
              <BrewChart 
                data={this.props.selectedBrewData} 
                dataKey="temperature" 
                domain={['dataMin - 2', 'dataMax + 2']} 
                target={this.props.selectedBrew ? this.props.selectedBrew.targetTemp : undefined} />
            </div>    
          </div>
          
          
        </div>
      );
  }
}

export default withTracker(() => {
    const selectedBrewId = Session.get('selectedBrewId');
    Meteor.subscribe('brewdata');
    return {
      selectedBrew: Brews.findOne({_id: selectedBrewId}),
      selectedBrewData: BrewData.find({brewId: selectedBrewId}, {sort: {timeStamp: -1}}).fetch()
    };

  })(BrewView);