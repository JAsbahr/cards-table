import React from "react"
import { connect } from "react-redux"
import { setTextFilter } from "../actions/filters"
import { Link } from "react-router-dom"


export class CardListFilter extends React.Component {
    constructor(props) {
        super(props)
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            className="text-input"
                            type="text"
                            value={this.props.filters.text}
                            onChange={this.onTextChange}
                            placeholder="Search for card"
                        />
                    </div>
                    <div className="input-group__item">
                        <Link className="button button--green" to="frompuca/create">From Cardsphere</Link>
                    </div>
                    <div className="input-group__item">
                        <Link className="button button--green" to="forpuca/create">For Cardsphere</Link>
                    </div>
                    <div className="input-group__item">
                        <Link className="button button--green" to="frompucapromoted/create">From Puca</Link>
                    </div>
                    <div className="input-group__item">
                        <Link className="button button--green" to="forpucapromoted/create">For Puca</Link>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardListFilter)
