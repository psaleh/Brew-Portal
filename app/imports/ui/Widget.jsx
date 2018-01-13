import React from 'react';

export default class Widget extends React.Component {
  render (){
    return(
      <div className="card">
        <div className="card-header">      
          <h5>{this.props.widgetTitle}</h5>
        </div>
          <div className="card-body">
            <h2>{this.props.widgetData}</h2>
            <p>{this.props.lastUpdate}</p>
        </div>
      </div>
    )
  };
}