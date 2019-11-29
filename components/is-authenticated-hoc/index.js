import firebase from '../../utils/firebase'
import React from 'react'

export default (WrappedComponent) => {
  return class HOC extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isAuthenticated: null,
      }
    }

    componentDidMount() {
      this._isMounted = true
      this.checkAuth()
    }

    componentWillUnmount() {
      this._isMounted = false
    }

    checkAuth() {
      return firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (this._isMounted)
            this.setState({isAuthenticated: !!user})
        })
    }

    render() {
      const { isAuthenticated } = this.state
      if (isAuthenticated === null)
        return ''
      else
        return <WrappedComponent
          {...this.props}
          isAuthenticated={isAuthenticated}
          checkAuth={() => this.checkAuth}
        ></WrappedComponent>
    }

  }
}
