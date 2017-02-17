import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CardSingle, { NUM_OF_TYPES } from './Single'
import { fetchCards, emptyCards } from '../../actions/cards'
import { shuffle, range, array, random } from '../../helper'

class CardPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            indices: [],
            types: [],
            current: -1
        }
    }

    componentWillMount() {
        this.props.onFetchCards(this.props.params.categoryId)
    }

    componentWillUnmount() {
        this.props.onEmptyCards()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data.length > 0)
            this.resetCard(nextProps.data)
    }

    nextCard = () => {
        this.setState(prevState => ({
            current: prevState.current < this.props.data.length - 1 ? prevState.current + 1 : prevState.current
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
            types: array(data.length, () => random(NUM_OF_TYPES)),
            current: 0
        })
    }

    render() {
        const { data, loading, error } = this.props
        const { current, indices, types } = this.state

        if (!data || data.length == 0) return null

        return <div id="card-list">
            {/*<button className="card-btn" onClick={e => this.resetCard(data)}>Reset</button>*/}

            <CardSingle key={data[indices[current]]._id} {...data[indices[current]]} type={types[current]} />
            <button className="card-btn" onClick={this.prevCard}>Prev</button>
            <span className="card-index">{`${current+1} / ${data.length}`}</span>
            <button className="card-btn" onClick={this.nextCard}>Next</button>
        </div>
    }
}

export default connect(
    state => state.cards,
    dispatch => ({
        onFetchCards: (categoryId) => dispatch(fetchCards(categoryId)),
        onEmptyCards: () => dispatch(emptyCards())
    }))
(CardPage)

