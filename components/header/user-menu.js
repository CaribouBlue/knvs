import { logout } from '../../utils/firebase/auth'

export default (props) => {
  return <>
    <div className="dropdown">
      <div className="btn-group">
        <a className="dropdown-toggle"
          tabIndex="0"
        >
          <figure className="avatar avatar-lg dropdown-toggle"
            data-initial="AD"
            style={{cursor: 'pointer'}}
          >
            <img src="" alt=""></img>
          </figure>
        </a>

        <ul className="menu"
          style={{right: '0px', left: 'unset'}}
        >
          <li className="menu-item"
            style={{cursor: 'pointer'}}
          >
            <a onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </>
}
