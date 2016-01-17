import React, { PropTypes, Component } from 'react';

class Input extends Component {
  static propTypes = {
    children: PropTypes.any,
    type: PropTypes.any,
    label: PropTypes.any,
    onChangeValue: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _onChange(e) {
    this.props.onChangeValue(e.target.value)
  }

  render() {

    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        {this.props.type == 'textarea' ?
          (<textarea className="form-control" rows="3"></textarea>) :
          (<input onChange={this._onChange.bind(this)} type={this.props.type} className="form-control"/>)
        }
      </div>
  )
  }
}

export default Input;
