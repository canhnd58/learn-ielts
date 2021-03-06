import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from'react-router'
import CardSingle, { TYPES } from './Single'
import CardToggleMode from './ToggleMode'
import CardTable from './Table'
import Switch from '../Util/Switch'
import { fetchCards, emptyCards } from '../../actions/cards'
import { shuffle, range, array, random, getKey } from '../../helper'

export const MODES = {
    random: 0,
    eng: 1,
    vi: 2,
    sound: 3
}

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
            mode: MODES['eng'],
            showResult: false
        }
        this.interval = undefined
        this.sound = new Audio('/sounds/pop.mp3')
    }

    componentWillMount() {
        const { currentCategories, onFetchCards } = this.props
        currentCategories.forEach(c => onFetchCards(c))
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
                if (this.state.currentSec <= 0) {
                    this.sound.play()
                    this.nextCard()
                }
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
        this.setState(prevState => ({
            mode: (prevState.mode + 1) % Object.keys(MODES).length
        }), () => this.resetCard(this.props.data))
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
        this.setState(prevState => {
            const setCardType = () => {
                const modeKeys = Object.keys(MODES)
                const { mode } = prevState
                if (mode != MODES['random'])
                    return TYPES[getKey(MODES, mode)]

                let key = 'random'
                while (key == 'random')
                    key = modeKeys[random(modeKeys.length)]
                return TYPES[key]
            }

            return {
                indices: shuffle(range(data.length)),
                types: array(data.length, setCardType),
                current: 0
            }
        })
    }

    toggleResult = () => {
        this.setState(prevState => ({
            showResult: !prevState.showResult
        }))
    }

    changeMaxSec = maxSec => {
        this.setState({ maxSec })
    }

    render() {
        const { data, loading, error } = this.props
        const { current, indices, types, autoNext, currentSec, maxSec, showResult, mode } = this.state

        if (!data || data.length == 0) return null

        return <div id="card-container">
            <div id="card-list">
                <div id="card-upper">
                    <Switch
                        on={autoNext}
                        maxSec={maxSec}
                        text={autoNext ? `${currentSec}`  : 'Off'}
                        onClick={this.toggleAuto}
                        changeMaxSec={this.changeMaxSec}
                    />
                    <div className="card-upper-btn" onClick={e => browserHistory.push('/categories')}>
                        <i className="fa fa-reply-all" aria-hidden="true"></i>
                    </div>
                    <div className="card-upper-btn" onClick={e => this.resetCard(data)}>
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </div>
                    <CardToggleMode
                        mode={mode}
                        changeMode={this.changeMode}
                    />
                    <div className="card-upper-btn" onClick={this.toggleResult}>
                        <i className="fa fa-list-ul" aria-hidden="true"></i>
                    </div>
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
            { showResult &&
                <CardTable
                    {...this.props}
                    indices={indices}
                    backToCardList={this.toggleResult}
                /> }
        </div>
    }
}

export default connect(
    state => ({
        ...state.cards,
        currentCategories: state.categories.current
    }),
    dispatch => ({
        onFetchCards: (categoryId) => dispatch(fetchCards(categoryId)),
        onEmptyCards: () => dispatch(emptyCards())
    }))
(CardPage)
