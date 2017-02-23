import React, { Component } from 'react'
import { NUM_OF_TYPES } from './Single'

class CardToggleMode extends Component {
    render() {
        const { mode, changeMode } = this.props
        const modeName = ["random", "english", "vietnamese", "pronounce"]
        return <div className="card-upper-btn" onClick={e => {changeMode()}}>
            Mode: <span id = "mode-name">{modeName[mode + 1]}</span>
        </div>
    }
}


export default CardToggleMode
