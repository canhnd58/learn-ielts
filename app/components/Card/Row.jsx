import React, { Component } from 'react'

class CardRow extends Component {
    render() {
        const { idx, eng, vi } = this.props
        return <div className="card-row">
            <span className="card-row-cell card-row-idx">{idx}</span>
            <span className="card-row-cell card-row-eng">{eng}</span>
            <span className="card-row-cell card-row-vi">{vi}</span>
        </div>
    }
}

export default CardRow
