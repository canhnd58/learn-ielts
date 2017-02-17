import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CardSingle from './Single'
import { shuffle, range, array, random } from '../../helper'

class CardPage extends Component {
    NUM_OF_TYPES = 3

    constructor(props) {
        super(props)
        this.state = {
            indices: [],
            types: [],
            current: -1
        }
    }

    componentWillReceiveProps(nextProps) {
        this.resetCard(nextProps.data)
    }

    nextCard = () => {
        this.setState(prevState => ({
            current: prevState.current < this.props.data.length ? prevState.current + 1 : prevState.current
        }))
    }

    prevCard = () => {
        this.setState(prevState => ({
            current: prevState.current == 0 ? 0 : prevState.current - 1
        }))
    }

    resetCard = data => {
        this.setState({
            indices: shuffle(range(data.length)),
            types: array(data.length, () => random(this.NUM_OF_TYPES)),
            current: 0
        })
    }

    noMoreCard = () => this.state.current === this.props.data.length

    render() {
        const { data, loading, error } = this.props
        const { current, indices, types } = this.state

        if (data.length == 0) return null

        return <div id="card-page">
            {this.noMoreCard() ?
                <div className="card-single" key="out-of-words">
                    Out of words!!!
                </div> :
                <CardSingle key={data[indices[current]]._id} {...data[indices[current]]} type={types[current]} />
            }
            <button className="card-btn" onClick={this.prevCard}>Prev</button>
            <button className="card-btn" onClick={this.nextCard}>Next</button>
            <button className="card-btn" onClick={e => this.resetCard(data)}>Reset</button>
        </div>
    }
}

export default connect(state => state.cards)(CardPage)

