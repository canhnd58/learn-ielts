import React, { Component } from 'react'
import { NUM_OF_TYPES } from './Single'

class CardToggleMode extends Component {
    render() {
        const { mode, changeMode } = this.props
        return <div className="card-upper-btn" onClick={e => {changeMode()}} id="mode-icon">
            {mode == -1 &&
                <i className="fa fa-random" aria-hidden="true"></i>
            }
            {mode == 0 &&
                <span>en</span>
            }
            {mode == 1 &&
                <span>vi</span>
            }
            {mode == 2 &&
                <i className="fa fa-volume-up" aria-hidden="true"></i>
            }
        </div>
    }
}


export default CardToggleMode
