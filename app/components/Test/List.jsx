import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCards, emptyCards } from '../../actions/cards'
import TestQuestion, { TYPES } from './Question'

class TestPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            correct: null
        }
    }

    componentWillMount() {
        const { currentCategories, onFetchCards } = this.props
        currentCategories.forEach(c => onFetchCards(c))
    }

    componentWillUnmount() {
        this.props.onEmptyCards()
    }

    prevCard = () => {
        const { current } = this.state
        const length = this.props.data.length
        this.setState({
            current: (current - 1 + length) % length
        })
    }

    nextCard = () => {
        const { current } = this.state
        const length = this.props.data.length
        this.setState({
            current: (current + 1) % length
        })
    }

    changeCorrect = (correct) => {
        this.setState({ correct: correct })
        if (correct) {
            this.nextCard()
        }
    }

    removeCorrect = () => {
        this.setState({
            correct: null
        })
    }

    render() {
        const { data } = this.props
        if (!data || data.length == 0) return null
        const { current, correct } = this.state
        return <div id="test-container">
            <TestQuestion
                type={TYPES["example"]}
                {...data[current]}
                nextCard={this.nextCard}
                changeCorrect={this.changeCorrect}
            />
            <div id="card-lower">
                <button className="card-lower-btn" onClick={e => {this.prevCard(); this.removeCorrect()}}>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                <span className="card-index">{`${current+1} / ${data.length}`}</span>
                <button className="card-lower-btn" onClick={e => {this.nextCard(); this.removeCorrect()}}>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
            </div>
            {correct && <div>Correct</div>}
            {correct == false && <div>Wrong</div>}
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
(TestPage)
