import Header from '../header'
import './styles.scss'

export default (props) => {
  return <>
    <style jsx global>{`
      body {
        margin: 0;
        background-color: whitesmoke;
      }
    `}</style>
    <Header></Header>
    <div className="children-container">
      {props.children}
    </div>
  </>
}
