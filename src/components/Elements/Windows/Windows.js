import React, {Component, PropTypes} from 'react'

class Windows extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let style = {
      width: '100vw',
      height: '100vh',
      left: 0,
      top: 0,
      position: 'fixed'
    }

    return (<div className="windows" style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default Windows
