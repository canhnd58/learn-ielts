import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
    render() {
        const { loading, error, data } = this.props
        if (loading) return null

        const { user } = data
        if (!user) return null

        return <div id="header">
            Hello, {user.uname}
        </div>
    }
}

export default connect(
    state => state.sessions
)(Header)

