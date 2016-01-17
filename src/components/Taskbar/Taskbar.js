import React, { PropTypes, Component } from 'react'
import styles from './Taskbar.scss'

class Taskbar extends Component {
  static propTypes = {
    position: PropTypes.any,
    children: PropTypes.any
  };

  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }

    setInterval(() => this.setState({
      date: new Date()
    }), 300)
  }

  render () {
    const className = styles[this.props.position] || styles.bottom
    // TODO: fix
    let date = this.state.date
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const dateTime = `${date.toLocaleString(navigator.language, {weekday: 'short'})} ${hours}:${minutes}`

    return (
      <span className={`${styles.panel} ${className}`} >
        <span>
          {this.props.children}
        </span>
      </span>
    )
  }
}

export default Taskbar
