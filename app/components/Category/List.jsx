import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryButton from './Button'

class CategoryList extends Component {
    render() {
        const { loading, error, data } = this.props
        return <div id="category-list">
            {data.map(d =>
                <CategoryButton key={d._id} {...d} />
            )}
        </div>
    }
}

export default connect(state => state.categories)(CategoryList)
