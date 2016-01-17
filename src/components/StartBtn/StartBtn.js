import React, { PropTypes, Component } from 'react'
import styles from './StartBtn.scss'

class StartBtn extends Component {
  static propTypes = {
    user: PropTypes.any,
    position: PropTypes.any,
    onRunApp: PropTypes.func,
    apps: PropTypes.array.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      startShow: false
    }
  }

  showMenu () {
    this.setState({
      show: !this.state.show
    })
  }

  runApp (app) {
    if (this.props.onRunApp) {
      this.props.onRunApp(app)
    }
  }

  render () {

    return (
      <span>
        {!this.state.show || <span className={styles.menu}>
          <div className={styles.userName}>
            {this.props.user.name}
          </div>
          <div>
            {this.props.apps.map((app) => {
              return (<div key={app.id} onClick={this.runApp.bind(this, app)} className={styles.app}>
                {app.name}
              </div>)
            })}
          </div>
        </span>}
        <span className={styles.startbtn} onClick={this.showMenu.bind(this)} />
      </span>
    )
  }
}

export default StartBtn
