import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddBrew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brewName: '',
            brewStyle: '',
            targetFg: '',
            targetTemp: '',
            error: '',
            isOpen: false
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
              this.handleModalClose();
                
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
  handleModalClose() {
    this.setState({
      isOpen: false,
      brewName: '',
      brewStyle: '',
      targetFg: '',
      targetTemp: '',
      error: ''
    });
  }
    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({isOpen: true})}>New Brew Session</button>
                <Modal
                  isOpen={this.state.isOpen}
                  contentLabel="Add Brew"
                  onAfterOpen={() => this.refs.brewName.focus()}
                  onRequestClose={this.handleModalClose.bind(this)}>
                    <h1>Add New Brew Session</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)}>
                      <input type="text" value={this.state.brewName} ref="brewName" name="brewName" placeholder="Name of Beer" onChange={this.onChange.bind(this)}/>
                      <input type="text" value={this.state.brewStyle} name="brewStyle" placeholder="Style of Beer" onChange={this.onChange.bind(this)}/>
                      <input type="text" value={this.state.targetFg} name="targetFg" placeholder="Expected Final Gravity" onChange={this.onChange.bind(this)}/>
                      <input type="text" value={this.state.targetTemp} name="targetTemp" placeholder="Target Fermentation Temperature" onChange={this.onChange.bind(this)}/>                
                      <button type="submit" className="button">Add Brew</button>
                      <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}