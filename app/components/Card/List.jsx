import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from'react-router'
import CardSingle, { NUM_OF_TYPES } from './Single'
import Switch from '../Util/Switch'
import { fetchCards, emptyCards } from '../../actions/cards'
import { shuffle, range, array, random } from '../../helper'

class CardPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            indices: [],
            types: [],
            current: -1,
            autoNext: false,
            autoNextSec: 5
        }
        this.interval = undefined
    }

    componentWillMount() {
        this.props.onFetchCards(this.props.params.categoryId)
    }

    componentDidMount() {
        if (this.state.autoNext) {
            this.interval = setInterval(this.nextCard, this.state.autoNextSec * 1000)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data.length > 0)
            this.resetCard(nextProps.data)
    }

    componentDidUpdate() {
        if (this.interval) {
            clearInterval(this.interval)
        }
        if (this.state.autoNext) {
            this.interval = setInterval(this.nextCard, this.state.autoNextSec * 1000)
        }
    }

    componentWillUnmount() {
        this.props.onEmptyCards()
        if (this.interval) clearInterval(this.interval)
    }

    toggleAuto = () => {
        this.setState(prevState => ({
            autoNext: !prevState.autoNext
        }))
    }

    nextCard = () => {
        if (this.state.current == this.props.data.length - 1) return
        this.setState(prevState => ({
            current: prevState.current + 1
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
        const { current, indices, types, autoNext } = this.state

        if (!data || data.length == 0) return null

        return <div id="card-list">
            {/*<button className="card-btn" onClick={e => this.resetCard(data)}>Reset</button>*/}
            <div id="card-upper">
                <Switch on={autoNext} text={"Auto"} onClick={this.toggleAuto}/>
                <div className="card-quit-btn" onClick={browserHistory.goBack}>
                    <i className="fa fa-reply-all" aria-hidden="true"></i>
                </div>
            </div>
            <CardSingle key={data[indices[current]]._id} {...data[indices[current]]} type={types[current]} />
            <button className="card-btn" onClick={this.prevCard}>
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
            <span className="card-index">{`${current+1} / ${data.length}`}</span>
            <button className="card-btn" onClick={this.nextCard}>
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
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

