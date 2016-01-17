import React, { PropTypes, Component } from 'react'
import styles from './TaskbarWindowsList.scss'

class TaskbarWindowsList extends Component {
  static propTypes = {
    position: PropTypes.any,
    windows: PropTypes.any,
    onActive: PropTypes.any
  };

  constructor (props) {
    super(props)
    this.state = {}
  }

  _selectWindow (id) {
    if (this.props.onActive) {
      this.props.onActive(id)
    }
  }

  render () {
    return (
      <span className={styles.windows}>
        {!this.props.windows || this.props.windows.list.map((w, i) => {
          return <span onClick={this._selectWindow.bind(this, w.id)} key={i} className={styles.win}>{w.title}</span>
        })}
      </span>
    )
  }
}

export default TaskbarWindowsList
