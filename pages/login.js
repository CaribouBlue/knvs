import Router from 'next/router'
import Layout from '../components/layout';
import { signInWithEmailAndPassword } from '../utils/firebase/auth'
import isAuthenticated from '../components/is-authenticated-hoc'

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
    }
  }

  onTxtInputChange(input, {value}) {
    this.setState({ [input]: value })
  }

  onLoginSubmit() {
    this.setState({loggingIn: true})
    signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        return this.props.checkAuth()
      })
      .catch(err => {
        console.log(err)
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
                <input className="form-input"
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
                <input className="form-input"
                  type="password"
                  id="password-input"
                  placeholder="password"
                  onChange={({target}) => this.onTxtInputChange('password', target)}
                  value={this.state.password}
                  disabled={this.state.loggingIn}
                ></input>
              </div>
              {loginBtn}
            </div>
          </div>
        </div>
      </Layout>
    </>
  }
}

export default isAuthenticated(Login)
