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
        const sliderClass = classnames('switch-slider', {
            'switch-slider-off': !this.state.on
        })
        const sliderButtonClass = classnames('switch-slider-button', {
            'switch-slider-button-off': !this.state.on
        })
        const textClass = classnames('switch-text', {
            'switch-text-off': !this.state.on
        })
        return <div className="switch-container" onClick={this.handleOnClick}>
            <div className={textClass}>
                {this.props.text}
            </div>
            <div className={sliderClass}>
                <div className={sliderButtonClass}></div>
            </div>
        </div>
    }
}

export default Switch
