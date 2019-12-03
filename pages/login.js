import Router from 'next/router'
import Layout from '../components/layout';
import isAuthenticated from '../components/is-authenticated-hoc'
import SignUpModal from '../components/sign-up-modal'
import SpinnerButton from '../components/spinner-button'
import { signInWithEmailAndPassword } from '../utils/firebase/auth'

const formPartStyle = {
  marginTop: '20px',
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loggingIn: false,
      loginError: null,
    }
  }

  onTxtInputChange(input, {value}) {
    this.setState({ [input]: value })
  }

  onLoginSubmit() {
    this.setState({loggingIn: true, loginError: null})
    signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        const { code, msg } = err
        if (code === 'auth/wrong-password' || code === 'auth/user-not-found')
          this.setState({loginError: 'Invalid email or password'})
        else
          this.setState({loginError: 'Error logging in, please try again'})
      })
      .then(_ => {
        if (!this.props.isAuthenticated)
          this.setState({loggingIn: false})
      })
  }

  render() {
    if (this.props.isAuthenticated) {
      Router.push('/')
    }

    let loginBtn;
    if (this.state.loggingIn)
      loginBtn = <div className="loading loading-lg float-left"
        style={{...formPartStyle, marginLeft: '25px'}}
      ></div>
    else
      loginBtn = <button className="btn input-group-btn"
        style={formPartStyle}
        onClick={() => this.onLoginSubmit()}
      >Login</button>

    return <>
      <Layout
        loggingIn={true}
      >
        <div className="container"
          style={{marginTop: '50px'}}
        >
          <div className="columns">
            <div className="column col-4 col-mx-auto">
              <h3
                style={{textAlign: 'center'}}
              >Login</h3>
              <div className="form-group"
                onKeyDown={({key}) => key === 'Enter' && this.onLoginSubmit()}
              >
                <label className="form-label"
                  style={formPartStyle}
                  htmlFor="email-input"
                >Email</label>
                <input className={`
                    form-input
                    ${this.state.loginError && ' is-error'}
                  `}
                  type="text"
                  id="email-input"
                  placeholder="Email"
                  onChange={({target}) => this.onTxtInputChange('email', target)}
                  value={this.state.email}
                  disabled={this.state.loggingIn}
                ></input>
                <label className="form-label"
                  style={formPartStyle}
                  htmlFor="password-input"
                >Password</label>
                <input className={`
                    form-input
                    ${this.state.loginError && ' is-error'}
                  `}
                  type="password"
                  id="password-input"
                  placeholder="password"
                  onChange={({target}) => this.onTxtInputChange('password', target)}
                  value={this.state.password}
                  disabled={this.state.loggingIn}
                ></input>
                <p className="form-input-hint">{this.state.loginError}</p>
              </div>
              <SpinnerButton
                buttonStyle={formPartStyle}
                spinnerStyle={{...formPartStyle, marginLeft: '25px', float: 'left'}}
                spinner={this.state.loggingIn}
                onClick={() => this.onLoginSubmit()}
              >Login</SpinnerButton>
              <SignUpModal></SignUpModal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  }
}

export default isAuthenticated(Login)
