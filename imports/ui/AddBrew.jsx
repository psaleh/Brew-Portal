import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class AddBrew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brewName: '',
            brewStyle: '',
            targetFg: '',
            targetTemp: '',
            error: ''
        };
    }
    onSubmit(e) {
        const { brewName, brewStyle, targetFg, targetTemp } = this.state;
        console.log(brewName, brewStyle, targetFg, targetTemp);

        e.preventDefault();

        Meteor.call('brews.insert', brewName, brewStyle, Number(targetFg), Number(targetTemp), (err, res) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.setState({
                    error: '', 
                    brewName: '',
                    brewStyle: '',
                    targetFg: '',
                    targetTemp: ''
                });
                
            }
        });
    }
    onChange(e) {
    const name = e.target.name    
    this.setState({
        error: '',
      [name]: e.target.value
    });
  }
    render() {
        return (
            <div>
              {this.state.error ? <p>{this.state.error}</p> : undefined}
              <form onSubmit={this.onSubmit.bind(this)}>
                <input type="text" value={this.state.brewName} name="brewName" placeholder="Name of Beer" onChange={this.onChange.bind(this)}/>
                <input type="text" value={this.state.brewStyle} name="brewStyle" placeholder="Style of Beer" onChange={this.onChange.bind(this)}/>
                <input type="text" value={this.state.targetFg} name="targetFg" placeholder="Expected Final Gravity" onChange={this.onChange.bind(this)}/>
                <input type="text" value={this.state.targetTemp} name="targetTemp" placeholder="Target Fermentation Temperature" onChange={this.onChange.bind(this)}/>                
                <button>Add Brew</button>
              </form>
            </div>
        );
    }
}
