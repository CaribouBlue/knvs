import Link from 'next/link'
import UserMenu from './user-menu'
import { useRouter } from 'next/router'
import isAuthenticated from '../is-authenticated-hoc'
import { getPathSegment } from '../../utils/router'
import NavBar from '../nav-bar'

import './styles.scss'
const leftNavBtnStyle = {
    marginRight: '15px',
}

const getRightNavSection = (props, router) => {
  const noAuth = <>
     <div className="input-group input-inline">
      <Link href="/login">
        <button className="btn btn-primary input-group-btn"
        >Login</button>
      </Link>
    </div>
  </>

  const isAuth = <>
    <UserMenu></UserMenu>
  </>

  if (props.loggingIn) return null
  else if (props.isAuthenticated) return isAuth
  else return noAuth
}

const getLeftNavSection = (props, router) => {
  const pathBase = getPathSegment(router)
  const noAuth = <>
    <Link href="/about">
      <a className={`btn btn-link ${pathBase === 'about' && 'text-secondary'}`}
        style={leftNavBtnStyle}
      >About</a>
    </Link>
    <Link href="/contact">
      <a className={`btn btn-link ${pathBase === 'contact' && 'text-secondary'}`}
        style={leftNavBtnStyle}
      >Contact</a>
    </Link>
  </>

  const isAuth = <>
    <Link href="/books">
      <a className={`btn btn-link ${pathBase === 'books' && 'text-secondary'}`}
        style={leftNavBtnStyle}
      >Books</a>
    </Link>
    <Link href="/portfolio">
      <a className={`btn btn-link ${pathBase === 'portfolio' && 'text-secondary'}`}
        style={leftNavBtnStyle}
      >Portfolio</a>
    </Link>
  </>


  if (props.isAuthenticated) return isAuth
  else return noAuth
}

const Header = (props) => {
  const router = useRouter()

  let navBar = null
  if (props.navBar)
    navBar = <NavBar {...props} ></NavBar>

  return <>
    <div className="header-container">
      <header className="navbar">
        <section className="navbar-section">
          {getLeftNavSection(props, router)}
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
          {getRightNavSection(props, router)}
        </section>
      </header>
    </div>
    {navBar}
  </>
}

export default isAuthenticated(Header)
