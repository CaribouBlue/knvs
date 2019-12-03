import Header from '../header'
import './styles.scss'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <>
      <style jsx global>{`
        body {
          margin: 0;
          background-color: whitesmoke;
        }
      `}</style>
      <div>
        <Header
          {...this.props}
        ></Header>
      </div>
      <div className="children-container">
        {this.props.children}
      </div>
    </>
  }
}
