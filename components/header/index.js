import 'spectre.css'
import './styles.scss'
import Link from 'next/link'
import { logout } from '../../utils/firebase/auth'
import isAuthenticated from '../is-authenticated-hoc'

const leftNavBtnStyle = {
    marginRight: '15px',
}

const getRightNavSection = (props) => {
  const noAuth = <>
     <div className="input-group input-inline">
      <Link href="/login">
        <button className="btn btn-primary input-group-btn">
        Login</button>
      </Link>
    </div>
  </>

  const isAuth = <>
     <div className="input-group input-inline">
      <button className="btn btn-primary input-group-btn"
        onClick={logout}
      >
      Logout</button>
    </div>
  </>

  if (props.loggingIn) return null
  else if (props.isAuthenticated) return isAuth
  else return noAuth
}

const getLeftNavSection = (props) => {
  const noAuth = <>
    <Link href="/about">
      <a className="btn btn-link"
        style={leftNavBtnStyle}
      >About</a>
    </Link>
    <Link href="/contact">
      <a className="btn btn-link"
        style={leftNavBtnStyle}
      >Contact</a>
    </Link>
  </>

  return noAuth
}

const Header = (props) => {
  return <>
    <div className="header-container">
      <header className="navbar">
        <section className="navbar-section">
          {getLeftNavSection(props)}
        </section>
        <section className="navbar-center">
          <Link href="/">
            <a className="navbar-brand mr-2"
              style={{margin:0}}
            >
              <h1 style={{margin:0}}>knvs</h1>
            </a>
          </Link>
        </section>
        <section className="navbar-section">
          {getRightNavSection(props)}
        </section>
      </header>
    </div>
  </>
}

export default isAuthenticated(Header)
