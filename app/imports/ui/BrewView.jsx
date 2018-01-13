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
      gravity: undefined,
      temperature: undefined,
      lastUpdate: undefined,
      abv: undefined,
      display: {display: 'none'}
    };
  }  
  componentDidUpdate(prevProps, prevState) {
    const currentBrewId = this.props.selectedBrew ? this.props.selectedBrew._id : undefined;
    const prevBrewId = prevProps.selectedBrew ? prevProps.selectedBrew._id : undefined;
    const currentBrewData = this.props.selectedBrewData ? this.props.selectedBrewData[0] : undefined;
    const prevBrewData = prevProps.selectedBrewData ? prevProps.selectedBrewData[0] : undefined;
    const og = this.props.selectedBrewData[this.props.selectedBrewData.length - 1] ? this.props.selectedBrewData[this.props.selectedBrewData.length - 1].gravity : undefined;
    const fg = this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].gravity : undefined;
    const ABV = Number((76.08 * (og-fg) / (1.775-og)) * (fg / 0.794)).toFixed(1);
    

    if (currentBrewId && currentBrewId !== prevBrewId) {
      this.setState({
        title: this.props.selectedBrew.brewName,
        gravity: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].gravity : 'No Data',
        temperature: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].temperature : 'No Data',
        lastUpdate: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].timeStamp : null,
        abv: ABV ? ABV : 'No Data1',
        display: undefined
      });
    } else if (currentBrewData && currentBrewData !== prevBrewData) {
      this.setState({
        gravity: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].gravity : 'No Data',
        temperature: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].temperature : 'No Data',
        lastUpdate: this.props.selectedBrewData[0] ? this.props.selectedBrewData[0].timeStamp : null,
        abv: ABV ? ABV : 'No Data2',
        display: undefined
        
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
            <div className="col-sm text-center" style={this.state.display}>
              <Widget widgetTitle="Current Gravity" widgetData={this.state.gravity} lastUpdate={moment(this.state.lastUpdate).fromNow()} />
            </div>
            <div className="col-sm text-center" style={this.state.display}>
              <Widget widgetTitle="Current Temperature" widgetData={this.state.temperature} lastUpdate={moment(this.state.lastUpdate).fromNow()} />
            </div>
            <div className="col-sm text-center" style={this.state.display}>
              <Widget widgetTitle="Current %ABV" widgetData={this.state.abv} lastUpdate={moment(this.state.lastUpdate).fromNow()} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm" style={this.state.display}>
              <BrewChart 
                data={this.props.selectedBrewData} 
                dataKey="gravity" 
                domain={[1, 'dataMax + 0.005']} 
                target={this.props.selectedBrew ? this.props.selectedBrew.targetFg : undefined} />
            </div>
            <div className="col-sm" style={this.state.display}>
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