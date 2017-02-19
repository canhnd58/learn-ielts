import React, { Component } from 'react'

export const SPEAK_INTERVAL = 5
export const NUM_OF_TYPES = 3
export const TYPES = {
    ENG: 0,
    VI: 1,
    SOUND: 2
}

class CardSingle extends Component {
    constructor(props) {
        super(props)
        this.state = { type: this.props.type }
        this.interval = undefined
    }

    componentDidMount() {
        if (this.state.type == TYPES["SOUND"]) {
            this.speak()
            this.resetInterval()
        }
    }

    componentWillUnmount() {
        if (this.interval) clearInterval(this.interval)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.type != nextProps.type || this.state.type != nextState.type
    }

    componentDidUpdate() {
        if (this.state.type == TYPES["SOUND"]) {
            this.speak()
            this.resetInterval()
        }
    }

    resetInterval = () => {
        if (this.interval) clearInterval(this.interval)
        this.interval = setInterval(this.speak, 1000 * SPEAK_INTERVAL)
    }

    flip = () => {
        this.setState(prevState => ({
            type: (prevState.type + 1) % NUM_OF_TYPES
        }))
    }

    speak = e => {
        responsiveVoice.speak(this.props.eng)
        if (e) {
            // Parent won't trigger event
            e.cancelBubble = true
            if (e.stopPropagation) e.stopPropagation()
        }
    }

    mayTriggerOnClick = () => {
        if (this.props.onClick) this.props.onClick()
    }

    render() {
        const { _id, eng, vi } = this.props
        const { type } = this.state
        return <div className="card-single" onClick={e => {this.flip(); this.mayTriggerOnClick()}}>
            {type == TYPES["ENG"] && <span>{eng}</span>}
            {type == TYPES["VI"] && <span>{vi}</span>}
            {type == TYPES["SOUND"] &&
                <button className="card-sound-btn" onClick={e => {this.speak(e); this.mayTriggerOnClick()}}>
                    <i className="fa fa-volume-up" aria-hidden="true"></i>
                </button>
            }
        </div>
    }
}

export default CardSingle
