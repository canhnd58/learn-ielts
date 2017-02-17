import React, { Component } from 'react'
import classnames from 'classnames'

class Switch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on: props.on
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            on: !prevState.on
        }))
    }

    handleOnClick = () => {
        this.toggle()
        if (this.props.onClick) this.props.onClick()
    }

    render() {
        const switchClass = classnames('switch-container', {
            'switch-off': !this.state.on
        })
        const sliderClass = classnames('switch-slider', {
            'switch-slider-off': !this.state.on
        })
        return <div className={switchClass} onClick={this.handleOnClick}>
            <div className={sliderClass}></div>
        </div>
    }
}

export default Switch
