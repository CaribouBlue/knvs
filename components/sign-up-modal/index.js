import React from 'react'
import SpinnerButton from '../spinner-button'
import { createUserWithEmailAndPassword } from '../../utils/firebase/auth'

const formPartStyle = {
  marginTop: '20px',
}

export default class SignUpModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      email: '',
      password: '',
      passwordVerify: '',
      signingUp: false,
      signUpError: null,
      emailError: null,
      passwordError: null,
    }
    this.validateEmailDebounce = null
    this.validatePasswordDebounce = null
  }

  validateEmailAddress(string) {
    let emailError = true
    if (!this.state.email.match(/[^@]+@[^@]+\.[a-z]+/i))
      emailError = 'Invalid email address'
    this.setState({emailError})
    return !!emailError
  }

  validatePassword() {
    let passwordError = true
    if (!this.state.password)
      passwordError = null
    else if (this.state.password.length < 6)
      passwordError = 'Password must be at least 6 characters'
    else if (this.state.password !== this.state.passwordVerify)
      passwordError = 'Passwords do not match'
    this.setState({passwordError})
    return !!passwordError
  }

  onTxtInputChange(input, {value}) {
    this.setState({ [input]: value }, () => {
      if (input === 'email') {
        if (this.validateEmailDebounce)
          clearInterval(this.validateEmailDebounce)
        this.validateEmailDebounce = setTimeout(() => this.validateEmailAddress(), 1000)
      } else if (['password', 'passwordVerify'].includes(input)) {
        if (this.validatePasswordDebounce)
          clearInterval(this.validatePasswordDebounce)
        this.validatePasswordDebounce = setTimeout(() => this.validatePassword(), 1000)
      }
    })
  }

  toggleModal() {
    this.setState({modal: !this.state.modal})
  }

  onSignUpSubmit() {
    if (!this.validateEmailAddress() || !this.validatePassword()) return
    this.setState({signingUp: true})
    createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(_ => {
        this.toggleModal()
      })
      .catch(err => {
        const newState = {signingUp: false}
        if (err.code.includes('email'))
          newState['emailError'] = err.msg
        else if (err.code.includes('password'))
          newState['passwordError'] = err.msg
        this.setState(newState)
      })
  }

  render() {
    const { passwordError, emailError } = this.state
    const passwordIsValid = passwordError === true
    const passwordIsError = passwordError !== null && !passwordIsValid
    const emailIsValid = emailError === true
    const emailIsError = emailError !== null && !emailIsValid
    return <>
      <button className="btn input-group-btn float-right"
        style={formPartStyle}
        onClick={() => this.toggleModal()}
      >SignUp</button>
      <div className={this.state.modal ? 'modal active' : 'modal'}
        id="modal-id"
      >
        <a className="modal-overlay"
          onClick={() => this.toggleModal()}
          aria-label="Close"
        ></a>
        <div className="modal-container">
          <div className="modal-header">
            <a className="btn btn-clear float-right"
              onClick={() => this.toggleModal()}
              aria-label="Close"
            ></a>
            <div className="modal-title h5">Sign Up</div>
          </div>
          <div className="modal-body">
            <div className="content">
              <div className="form-group"
                onKeyDown={({key}) => key === 'Enter' && this.onSignUpSubmit()}
              >
                <label className="form-label"
                  htmlFor="su-email-input"
                >Email</label>
                <input className={`
                    form-input
                    ${emailIsError && ' is-error'}
                    ${emailIsValid && 'is-success'}
                  `}
                  type="text"
                  id="su-email-input"
                  placeholder="Email"
                  onChange={({target}) => this.onTxtInputChange('email', target)}
                  value={this.state.email}
                  disabled={this.state.signingUp}
                ></input>
                <p className="form-input-hint">{this.state.emailError}</p>
                <label className="form-label"
                  style={formPartStyle}
                  htmlFor="su-password-input"
                >Password</label>
                <input className={`
                    form-input
                    ${passwordIsError && ' is-error'}
                    ${passwordIsValid && 'is-success'}
                  `}
                  type="password"
                  id="su-password-input"
                  placeholder="Password"
                  onChange={({target}) => this.onTxtInputChange('password', target)}
                  value={this.state.password}
                  disabled={this.state.signingUp}
                ></input>
                <label className="form-label"
                  style={formPartStyle}
                  htmlFor="su-verify-password-input"
                >Verify Password</label>
                <input className={`
                    form-input
                    ${passwordIsError && ' is-error'}
                    ${passwordIsValid && 'is-success'}
                  `}
                  type="password"
                  id="su-verify-password-input"
                  placeholder="Re-enter Password"
                  onChange={({target}) => this.onTxtInputChange('passwordVerify', target)}
                  value={this.state.passwordVerify}
                  disabled={this.state.signingUp}
                ></input>
                <p className="form-input-hint">{this.state.passwordError}</p>
              </div>
              <SpinnerButton
                buttonStyle={formPartStyle}
                spinnerStyle={{...formPartStyle, margin: '25px', float: 'left'}}
                spinner={this.state.signingUp}
                onClick={() => this.onSignUpSubmit()}
              >Submit</SpinnerButton>
            </div>
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
    </>
  }
}
