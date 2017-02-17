import React, { Component } from 'react'

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
    }

    componentDidMount() {
        if (this.state.type == TYPES["SOUND"])
            this.speak()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.type != nextProps.type || this.state.type != nextState.type
    }

    componentDidUpdate() {
        if (this.state.type == TYPES["SOUND"])
            this.speak()
    }

    flip = () => {
        this.setState(prevState => ({
            type: (prevState.type + 1) % NUM_OF_TYPES
        }))
    }

    speak = e => {
        responsiveVoice.speak(this.props.eng)
        if (e) {
            e.cancelBubble = true
            if (e.stopPropagation) e.stopPropagation()
        }
    }

    render() {
        const { _id, eng, vi } = this.props
        const { type } = this.state
        return <div className="card-single" onClick={this.flip}>
            {type == TYPES["ENG"] && <span>{eng}</span>}
            {type == TYPES["VI"] && <span>{vi}</span>}
            {type == TYPES["SOUND"] &&
                <button className="card-sound-btn" onClick={this.speak}>
                    <i className="fa fa-volume-up" aria-hidden="true"></i>
                </button>
            }
        </div>
    }
}

export default CardSingle
