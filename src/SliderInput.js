import React, { Component } from 'react';

class SliderInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultValue };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({ value: value });
    this.props.updateDefaultValues(event.target.id, value);
  }

  render() {
    return (
      <div className="sideBar-input">
        <label htmlFor={this.props.inputId}>{this.props.inputId}</label>
        <p>{this.state.value}</p>
        <input
          id={this.props.inputId}
          type="range"
          min={this.props.min} max={this.props.max}
          value={this.state.value}
          onChange={this.handleChange}
          step="1"/>
      </div>
    );
  }
}

export default SliderInput;