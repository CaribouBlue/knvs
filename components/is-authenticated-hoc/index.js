import React from 'react'
import firebase from '../../utils/firebase'
import Router from 'next/router'

export default (WrappedComponent, authRequired=false) => {
  return class HOC extends React.Component {
    constructor(props) {
      super(props)
      this.authRequired = authRequired
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
            if (this.authRequired && !user)
              Router.push('/login')
            else
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
