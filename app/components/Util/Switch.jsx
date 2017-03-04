import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import classnames from 'classnames'

class Switch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            on: props.on,
            edit: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            on: !prevState.on
        }))
    }

    toggleEdit = () => {
        this.setState(prevState => ({
            edit: !prevState.edit
        }))
    }

    handleOnClick = () => {
        this.toggle()
        if (this.props.onClick) this.props.onClick()
    }

    handleKeyPress = e => {
        if (e.which == 13) {
            this.toggleEdit()
        }
    }

    changeMaxSec = e => {
        this.props.changeMaxSec(e.target.value)
    }

    render() {
        const { on, edit } = this.state
        const sliderClass = classnames('switch-slider', {
            'switch-slider-off': !this.state.on
        })
        const sliderButtonClass = classnames('switch-slider-button', {
            'switch-slider-button-off': !this.state.on
        })
        const textClass = classnames('switch-text', {
            'switch-text-off': !this.state.on
        })
        return <div className="switch-container">
            <div className={textClass} onClick={this.toggleEdit} >
                { !edit ? this.props.text :
                    <input
                        size='1'
                        value={this.props.maxSec}
                        onChange={this.changeMaxSec}
                        onKeyPress={this.handleKeyPress}
                        autoFocus /> }
            </div>
            <div className={sliderClass} onClick={this.handleOnClick}>
                <div className={sliderButtonClass}></div>
            </div>
        </div>
    }
}

export default Switch
