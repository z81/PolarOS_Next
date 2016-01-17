import React, {Component, PropTypes} from 'react'
import bgAnim from './bgAnim'
import styles from './LoginScreen.scss'
import { Button, Input } from '../../components/Elements'


class LoginScreen extends Component {
  static propTypes = {
    children: PropTypes.any,
    onLogin: PropTypes.func
  };

  constructor(props) {
    super(props)
    this.state = {
      isRegMode: false
    }
  }

  componentDidMount() {
    bgAnim('#login-screen')
  }

  _onSubmit() {
    this.props.onLogin({
      login: this.refs.login.getValue(),
      pass:  this.refs.pass.getValue()
    })
  }


  render() {

    return (
      <div id="login-screen" className={styles.screen}>
        <div className={styles.form}>
          <div>
            Логин:
            <Input ref="login" />
          </div>
          <div>
            Пароль:
            <Input ref="pass" type="password"/>
          </div>
          <div style={{paddingTop: '10px'}}>
            <Button onClick={this._onSubmit.bind(this)} ptStyle="primary" text="Войти" />
          </div>
        </div>
    </div>)
  }
}

export default LoginScreen
