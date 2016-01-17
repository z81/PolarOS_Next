import { connect } from 'react-redux'
import { Link } from 'react-router'
import Channel from 'jschannel'
import NotificationSystem from 'react-notification-system'
import { actions as userActions } from '../redux/modules/user'
import { actions as windowsActions } from '../redux/modules/windows'
import { actions as userAppsActions } from '../redux/modules/userApps'
import styles from './HomeView.scss'
import AppsAPI from '../../apps/api'
//import 'photon/dist/css/photon.css';

import {
  Window,
  Windows,
  Tabs,
  Tab,
  Button,
  Pane,
  PaneGroup,
  Nav,
  NavGroup,
  Icon,
  Table,
  ListGroup,
  ListItem
} from '../components/Elements'

import {
  Taskbar,
  StartBtn,
  TaskbarWindowsList
} from '../components'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  user: state.user,
  windows: state.windows,
  userApps: state.userApps,
})
export class HomeView extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    windows: React.PropTypes.object.isRequired,
    userApps: React.PropTypes.array.isRequired,
    setAppsList: React.PropTypes.func.isRequired,
    loadUserAsync: React.PropTypes.func.isRequired,
    addWindow: React.PropTypes.func.isRequired,
    setActiveWindow: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onMin: React.PropTypes.func.isRequired,
    onUnMin: React.PropTypes.func.isRequired,
    onMax: React.PropTypes.func.isRequired,
    onChangePos: React.PropTypes.func.isRequired,
    loadWindows: React.PropTypes.func.isRequired,
    setWindowsList: React.PropTypes.func.isRequired,
    onStopDrag: React.PropTypes.func.isRequired,
    setWallpaper: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    console.log(props)

    props.loadUserAsync(props)

    this.state = {
      active: 0
    }
  }

  runApp (app) {
    this.props.addWindow(Object.assign({}, app, {token: this.props.user.token}))
  }

  render () {
    return (
      <div
        style={{backgroundImage: `url(http://127.0.0.1:3000${this.props.user.background})`,
        height: '100%'}}
      >


      <Windows>
          {this.props.windows.list.map((w, i)=> {

             return (
             <Window
               onActive={this.props.setActiveWindow}
               onChangePos={this.props.onChangePos}
               onClose={this.props.onClose}
               onMin={this.props.onMin}
               onMax={this.props.onMax}
               onStopDrag={this.props.onStopDrag}
               key={w.id}
               config={w}
             >
                <iframe onLoad={AppsAPI.bind(this, i)}  style={{width: '100%', border: 'medium none'}} src={w.app.url} name={i}></iframe>
             </Window>
           );
        })}
      </Windows>

      <Taskbar position="bottom">
        <StartBtn apps={this.props.userApps} onRunApp={this.runApp.bind(this)} user={this.props.user} />
        <TaskbarWindowsList windows={this.props.windows} onActive={this.props.setActiveWindow} />
      </Taskbar>

      <NotificationSystem ref="notify" />
    </div>
    )
  }
}

export default connect(mapStateToProps, Object.assign(windowsActions, userActions, userAppsActions))(HomeView)
