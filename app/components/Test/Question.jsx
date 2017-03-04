import React, { Component } from 'react'

export const SPEAK_INTERVAL = 5
export const TYPES = {
    vi: 0,
    sound: 1,
    example: 2
}

class TestQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.type,
            value: ''
        }
    }

    componentWillMount() {
    }

    inputChange = (e) => {
        this.setState({value: e.target.value})
    }

    inputPress = e => {
        const { eng, vi, example } = this.props
        const { current, value } = this.state

        if (e.key === 'Enter') {
            this.props.changeCorrect(value == eng)
            if (value != eng) {
                console.log(eng + ": " + vi)
            }
            else {
                this.setState({value: ''})
            }
        }
    }

    render() {
        const { eng, vi, example } = this.props
        const { type, value } = this.state
        const index = example.toLowerCase().indexOf(eng)
        const firstPart = example.substring(0, index)
        const secondPart = example.substring(index + eng.length)
        return <div className="card-single">
            {type == TYPES["example"] &&
                <div>
                    <span>{firstPart}</span>
                    <input id="blank" onChange={this.inputChange} onKeyPress={this.inputPress} value={value}/>
                    <span>{secondPart}</span>
                </div>
            }
        </div>
    }
}

export default TestQuestion
