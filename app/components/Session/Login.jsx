import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { login } from '../../actions/sessions'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uname: '',
            passwd: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        const { user } = nextProps.data
        if (user) browserHistory.push('/categories')
    }

    handleChangeFor = key => e => {
        const newState = {}
        newState[key] = e.target.value
        this.setState(newState)
    }

    handleSubmit = e => {
        const { onLogin } = this.props
        const { uname, passwd } = this.state
        e.preventDefault()
        onLogin({ uname, passwd })
    }

    render() {
        const { uname, passwd } = this.state
        const { loading, error } = this.props
        if (loading) return null

        return <form id="login-page" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Username" value={uname} onChange={this.handleChangeFor('uname')}/>
            <input type="password" placeholder="Password" value={passwd} onChange={this.handleChangeFor('passwd')}/>
            <div className="error">{error}&nbsp;</div>
            <button type="submit" className="login-button">Login</button>
        </form>
    }
}

export default connect(
    state => state.sessions,
    dispatch => ({
        onLogin: credential => dispatch(login(credential))
    })
)(LoginPage)
