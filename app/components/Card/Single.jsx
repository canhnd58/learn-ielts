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

    flip = () => {
        this.setState(prevState => ({
            type: (prevState.type + 1) % NUM_OF_TYPES
        }))
    }

    speak = eng => e => {
        responsiveVoice.speak(eng)
        e.cancelBubble = true
        if (e.stopPropagation) e.stopPropagation()
    }

    render() {
        const { _id, eng, vi } = this.props
        const { type } = this.state
        return <div className="card-single" onClick={this.flip}>
            {type == TYPES["ENG"] && eng}
            {type == TYPES["VI"] && vi}
            {type == TYPES["SOUND"] &&
                <button className="card-sound-btn" onClick={this.speak(eng)}>
                    {responsiveVoice.speak(eng)}
                    <i className="fa fa-volume-up" aria-hidden="true"></i>

                </button>
            }
        </div>
    }
}

export default CardSingle
