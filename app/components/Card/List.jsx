import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from'react-router'
import CardSingle, { TYPES, NUM_OF_TYPES } from './Single'
import CardToggleMode from './ToggleMode'
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
            maxSec: 13,
            currentSec: 5,
            mode: 0
        }
        this.interval = undefined
    }

    componentWillMount() {
        this.props.onFetchCards(this.props.params.categoryId)
    }

    componentDidMount() {
        this.resetInterval()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data.length > 0)
            this.resetCard(nextProps.data)
    }

    componentDidUpdate(prevProps, prevState) {
        // Don't reset interval when counting down sec
        if (this.state.currentSec == prevState.currentSec)
            this.resetInterval()
    }

    componentWillUnmount() {
        this.props.onEmptyCards()
        if (this.interval) clearInterval(this.interval)
    }

    resetInterval = () => {
        const { autoNext, currentSec, maxSec } = this.state
        if (this.interval) {
            clearInterval(this.interval)
        }
        if (currentSec != maxSec) this.setState({ currentSec: maxSec })
        if (autoNext) {
            this.interval = setInterval(() => {
                if (this.state.currentSec <= 0) this.nextCard()
                else {
                    this.setState(prevState => ({
                        currentSec: prevState.currentSec - 1
                    }))
                }
            }, 1000)
        }
    }

    toggleAuto = () => {
        this.setState(prevState => ({
            autoNext: !prevState.autoNext
        }))
    }

    changeMode = () => {
        this.setState(prevState => {
            let mode = prevState.mode + 1
            if (mode == NUM_OF_TYPES) mode = -1
            return { mode }
        }, () => this.resetCard(this.props.data))
    }

    nextCard = () => {
        this.setState(prevState => ({
            current: (prevState.current + 1) % this.props.data.length
        }))
    }

    prevCard = () => {
        const { data } = this.props
        this.setState(prevState => ({
            current: (prevState.current + data.length - 1) % data.length
        }))
    }

    resetCard = data => {
        const { mode } = this.state
        this.setState({
            indices: shuffle(range(data.length)),
            types: array(data.length, () => mode == -1 ? random(NUM_OF_TYPES) : mode),
            current: 0
        })
    }

    render() {
        const { data, loading, error } = this.props
        const { current, indices, types, autoNext, currentSec, mode } = this.state

        if (!data || data.length == 0) return null

        return <div id="card-list">
            <div id="card-upper">
                <Switch on={autoNext} text={autoNext ? `${currentSec}`  : 'Off'} onClick={this.toggleAuto}/>
                <div className="card-upper-btn" onClick={browserHistory.goBack}>
                    <i className="fa fa-reply-all" aria-hidden="true"></i>
                </div>
                <div className="card-upper-btn" onClick={e => this.resetCard(data)}>
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </div>
                <CardToggleMode
                    mode={mode}
                    changeMode={this.changeMode}
                />
            </div>
            <CardSingle
                key={data[indices[current]]._id}
                {...data[indices[current]]}
                type={types[current]}
                onClick={this.resetInterval}
            />
            <div id="card-lower">
                <button className="card-lower-btn" onClick={this.prevCard}>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <span className="card-index">{`${current+1} / ${data.length}`}</span>
                <button className="card-lower-btn" onClick={this.nextCard}>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
            </div>
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

