import 'spectre.css'
import './styles.scss'

const leftNavBtnStyle = {
    marginRight: '15px',
}

export default () => {
  return <>
    <div className="header-container">
      <header className="navbar">
        <section className="navbar-section">
          <a className="btn btn-link"
            style={leftNavBtnStyle}
            href=""
          >About</a>
          <a className="btn btn-link"
            style={leftNavBtnStyle}
            href=""
          >Contact</a>
        </section>
        <section className="navbar-center">
          <a href="" className="navbar-brand mr-2">
            <h1 style={{margin:0}}>knvs</h1>
          </a>
        </section>
        <section className="navbar-section">
          <div className="input-group input-inline">
            <button className="btn btn-primary input-group-btn">Login</button>
          </div>
        </section>
      </header>
    </div>
  </>
}
