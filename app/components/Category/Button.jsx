import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class CategoryButton extends Component {
    handleClick = () => {
        browserHistory.push(`/categories/${this.props._id}`)
    }

    render() {
        const { _id } = this.props
        return <div className="category-button" onClick={this.handleClick}>
            {_id}
        </div>
    }
}

export default CategoryButton
