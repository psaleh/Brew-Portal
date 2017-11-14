import React from 'react';

export default class Widget extends React.Component {
  render (){
    return(
      <div>
        <h5>{this.props.widgetTitle}</h5>
        <h2>{this.props.widgetData}</h2>
      </div>
    )
  };
}