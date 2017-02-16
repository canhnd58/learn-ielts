import React, { Component } from 'react'

class CardSingle extends Component {
    TYPES = {
        ENG: 0,
        VI: 1,
        SOUND: 2
    }

    render() {
        const { _id, eng, vi, type } = this.props
        return <div className="card-single">
            {type == this.TYPES["ENG"] && eng}
            {type == this.TYPES["VI"] && vi}
            {type == this.TYPES["SOUND"] &&
                <button className="card-sound-btn" onClick={e => responsiveVoice.speak(eng)}>
                    {responsiveVoice.speak(eng)}
                    <i className="fa fa-volume-up" aria-hidden="true"></i>

                </button>
            }
        </div>
    }
}

export default CardSingle
