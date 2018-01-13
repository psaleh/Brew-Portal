import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

const customStyles = {
    overlay : {
      backgroundColor   : 'rgba(200, 200, 200, 0.75)'
      },
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

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
                <button type="button" className="btn btn-primary btn-block" onClick={() => this.setState({isOpen: true})}>New Brew Session</button>
                <Modal
                  isOpen={this.state.isOpen}
                  style={customStyles}
                  contentLabel="Add Brew"
                  onAfterOpen={() => this.refs.brewName.focus()}
                  onRequestClose={this.handleModalClose.bind(this)}>
                    <h2>Enter Brew Details</h2>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)}>
                      <input type="text" className="form-control form-group" value={this.state.brewName} ref="brewName" name="brewName" placeholder="Name of Beer" onChange={this.onChange.bind(this)}/>
                      <input type="text" className="form-control form-group" value={this.state.brewStyle} name="brewStyle" placeholder="Style of Beer" onChange={this.onChange.bind(this)}/>
                      <input type="text" className="form-control form-group" value={this.state.targetFg} name="targetFg" placeholder="Expected Final Gravity" onChange={this.onChange.bind(this)}/>
                      <input type="text" className="form-control form-group" value={this.state.targetTemp} name="targetTemp" placeholder="Target Fermentation Temperature" onChange={this.onChange.bind(this)}/>                
                      <div className="form-group text-right">
                        <button type="submit" className="btn btn-primary">Add Brew</button>
                        <button type="button" className="btn btn-secondary ml-2" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                      </div>
                    </form>
                </Modal>
            </div>
        );
    }
}