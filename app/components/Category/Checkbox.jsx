import React, { Component } from 'react'

class CategoryCheckbox extends Component {

    render() {
        const { _id, isCheck, toggle } = this.props
        return <div className="category-row" onClick={toggle}>
            <div className="category-checkbox">
                { isCheck ?
                    <i className="fa fa-check-square-o" aria-hidden="true"></i>
                    : <i className="fa fa-square-o" aria-hidden="true"></i> }
            </div>
            <div className="category-name">
                {_id}
            </div>
        </div>
    }
}

export default CategoryCheckbox
