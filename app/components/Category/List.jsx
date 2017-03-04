import React, { Component } from 'react'
import { connect } from 'react-redux'
import { array } from '../../helper'
import { setCategories } from '../../actions/categories'
import { browserHistory } from 'react-router'
import CategoryCheckbox from './Checkbox'

class CategoryList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: array(nextProps.data.length, () => false)
        })
    }

    toggleCheck = i => {
        this.setState(prevState => {
            let checked = [...prevState.checked]
            checked[i] = !checked[i]
            return { checked }
        })
    }

    setCategories = () => {
        const { data, onSetCategories } = this.props
        const { checked } = this.state

        let categories = []
        checked.forEach((c, i) => {
            if (c) categories.push(data[i]._id)
        })

        onSetCategories(categories)
    }

    render() {
        const { loading, error, data } = this.props
        const { checked } = this.state

        return <div id="category-list">
            {data.map((d, i) =>
                <CategoryCheckbox key={d._id} {...d} isCheck={checked[i]} toggle={e => this.toggleCheck(i)} /> )}
            {checked.indexOf(true) != -1 &&
                <div>
                    <div className="category-button" onClick={e => {this.setCategories(); browserHistory.push('/cards')}}>Start the Test</div>
                    <div className="category-button" onClick={e => {this.setCategories(); browserHistory.push('/test')}}>Test</div>
                </div>}
        </div>
    }
}

export default connect(
    state => state.categories,
    dispatch => ({
        onSetCategories: (categories) => dispatch(setCategories(categories))
    })
)(CategoryList)
