import React from 'react';
import { LineChart, Line, XAxis, YAxis, ReferenceLine } from 'recharts';

export default class BrewChart extends React.Component {
  render(){
    return(
      <div>
        <LineChart width={400} height={400} data={this.props.data}>
        <Line type="monotone" dataKey={this.props.dataKey} stroke="#8884d8" />
        <ReferenceLine y={this.props.target} label="Target" stroke="green" strokeDasharray="3 3" />
        <XAxis dataKey="timeStamp" />
        <YAxis type="number" domain={this.props.domain} orientation="left"/>
        
        </LineChart>
      </div>
    );
  }
}