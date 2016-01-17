import { connect } from 'react-redux'
import { Link } from 'react-router'
import { LoginScreen } from '../components'
import { actions as userActions } from '../redux/modules/user'

const mapStateToProps = (state) => ({
  user: state.user
})
export class LoginView extends React.Component {

  static propTypes = {
    loadUserAsync: React.PropTypes.func.isRequired,
    loginUserAsync: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)

    this.state = {}
  }

  shouldComponentUpdate (nextProps, nextState) {
    // TODO: fix redirect
    if ('id' in nextProps.user) {
      //this.props.history.pushState(null, '/')
      document.location.href = '/'
    }

    return true
  }

  render () {

    return (
      <div>
        <LoginScreen onLogin={this.props.loginUserAsync}/>
      </div>
    )
  }
}
export default connect(mapStateToProps, userActions)(LoginView)
