import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

export default class BrewChart extends React.Component {
  render(){
    return(
      <div>
        <LineChart width={400} height={400} data={this.props.data}>
        <Line type="monotone" dataKey="gravity" stroke="#8884d8" />
        
        <XAxis dataKey="timeStamp" />
        <YAxis type="number" domain={[1, 'dataMax + 0.005']} orientation="left"/>
        
        </LineChart>
      </div>
    );
  }
}