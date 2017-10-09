import React, { Component } from 'react';
import { ApproveColor, DeclaineColor } from './colors';
var _ = require('lodash');

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1 style={{ color: this.props.color }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}

// class InputField extends Component {
//     render () {
//         return (
//
//         )
//     }
// }



// class MyComponent extends React.Component {
//     constructor() {
//         this.onChangeTextDelayed = _.debounce(this.onChangeText, 2000);
//     }
//
//     onChangeText(text) {
//         console.log("debouncing");
//     }
//
//     render() {
//         return <Input onChangeText={this.onChangeTextDelayed} />
//     }
// }

class InputField extends Component {
    constructor(props) {
        super(props);
        // this.state = { counter: 0 };
        // this.interval = setInterval(() => this.tick(), 1000);
    }
    InputFunc (idfield, LengthField, DelayTime) {
        var InputSourceuserName = Rx.Observable.fromEvent(idfield, 'keyup')
            .map(function (events) {
                return events.target.value;
            })

            .map(function (input) {
                return input.length > LengthField;
            })
            .debounceTime(DelayTime);
    }

    render () {
        return {
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChange}
                       style={{ borderColor : this.state.activeGreen ? ApproveColor : DeclaineColor}}/>
            </div>

        }
    }
}

export class App extends Component {


    constructor(props) {
        super(props);
        this.state = {value: this.props.DefValueField,
        activeGreen : false};
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        let val = this.state.value;
        const lengthValue=this.props.MinLength ;
        console.log(lengthValue,this.state.activeGreen);

        if ( val.length>lengthValue ) {
            this.setState({activeGreen: true});
        } else {
            this.setState({activeGreen: false});
        }
    }


  render() {
    return (
      <div>
          <input type="text" value={this.state.value} onChange={this.handleChange}
                 style={{ borderColor : this.state.activeGreen ? ApproveColor : DeclaineColor}}/>
      </div>
    );
  }
}

  // class NameForm extends React.Component {
  //     constructor(props) {
  //     super(props);
  //     this.state = {value: ''};
  //
  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleSubmit = this.handleSubmit.bind(this);
  // }
  //
  //     handleChange(event) {
  //     this.setState({value: event.target.value});
  // }
  //
  //     handleSubmit(event) {
  //     alert('A name was submitted: ' + this.state.value);
  //     event.preventDefault();
  // }
  //
  //     render() {
  //     return (
  //     <form onSubmit={this.handleSubmit}>
  //     <label>
  //     Name:
  //     <input type="text" value={this.state.value} onChange={this.handleChange} />
  //     </label>
  //     <input type="submit" value="Submit" />
  //     </form>
  //     );
  // }
  // }