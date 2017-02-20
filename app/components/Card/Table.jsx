import React, { Component } from 'react'
import CardRow from './Row'

const NUM_OF_ROWS = 10

class CardTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0
        }
        this.pageNum = parseInt(props.data.length / NUM_OF_ROWS)
    }

    prevPage = () => {
        this.setState(prevState => ({
            currentPage: (prevState.currentPage - 1 + this.pageNum) % this.pageNum
        }))
    }

    nextPage = () => {
        this.setState(prevState => ({
            currentPage: (prevState.currentPage + 1) % this.pageNum
        }))
    }

    handleKeyPress = e => {
        if (e.which == 37) { // left arrow key
            this.prevPage()
        }
        if (e.which == 39) { // right arrow key
            this.nextPage()
        }
        if (e.which == 27) { // escape key
            this.props.backToCardList()
        }
    }

    render() {
        const { loading, data, error, backToCardList } = this.props
        const { currentPage } = this.state
        const startIndex = NUM_OF_ROWS * currentPage
        const endIndex = NUM_OF_ROWS * (currentPage + 1)

        return <div id="card-table" onKeyDown={this.handleKeyPress}>
            <div id="card-table-upper">
                <div className="card-upper-btn" onClick={backToCardList}>
                    <i className="fa fa-reply-all" aria-hidden="true"></i>
                </div>
            </div>
            <div id="card-table-content">
                {data.slice(startIndex, endIndex).map((d, i) => <CardRow key={d._id} {...d} idx={startIndex + i + 1} />)}
            </div>
            <div id="card-table-lower">
                <button className="card-table-lower-btn" onClick={this.prevPage}>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <button className="card-table-lower-btn" onClick={this.nextPage} autoFocus>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    }
}

export default CardTable
