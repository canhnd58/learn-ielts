import React, { Component } from 'react'
import { MODES } from './List'

class CardToggleMode extends Component {
    render() {
        const { mode, changeMode } = this.props
        return <div className="card-upper-btn" onClick={e => {changeMode()}} id="mode-icon">
            {mode == MODES['random'] &&
                <i className="fa fa-random" aria-hidden="true"></i>
            }
            {mode == MODES['eng'] &&
                <span>en</span>
            }
            {mode == MODES['vi'] &&
                <span>vi</span>
            }
            {mode == MODES['sound'] &&
                <i className="fa fa-volume-up" aria-hidden="true"></i>
            }
        </div>
    }
}


export default CardToggleMode
