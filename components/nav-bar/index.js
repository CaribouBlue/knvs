import Link from 'next/link'
import { useRouter } from 'next/router'
import NavBarItem from './nav-bar-item'

export default (props) => {
  const router = useRouter()
  return <>
    <div className="divider" style={{margin: 0}}></div>
    <div className="header-container"
      style={{paddingTop: '5px', paddingBottom: '5px'}}
    >
      <header className="navbar">
        <section className="navbar-section">
        </section>
        <section className="navbar-center">
          {
            props.navBar.map(item =>
              <NavBarItem
                key={item.title}
                {...item}
                router={router}
              ></NavBarItem>
            )
          }
        </section>
        <section className="navbar-section">
        </section>
      </header>
    </div>
  </>
}
