import React from "react"
import { connect } from "react-redux"
import CardListItemFromPuca from "./CardListItemFromPuca"
import getVisibleCards from "../selectors/getVisibleCards"

export const CardListFromPuca = (props) => { // export for testing
    const arrayLength = 7

    return (
        <div className="content-container">
            <div className="list-header">
                <div className="list-item-long">Card name</div>
                <div className="list-item-short">Amount</div>
                <div className="list-item-short">Puca value</div>
                <div className="list-item-very-short">Sent</div>
                <div className="list-item-short">Sold for</div>
                <div className="list-item-middle"></div>
                <div className="list-item-short">Percentage</div>
            </div>
            {props.location === "/frompuca" ? <div className="list-body">
                {
                    props.cards.length === 0 ? (
                        <div className="list-item list-item--message">
                            <span>No cards found</span>
                        </div>
                    ) : (
                            props.cards.slice(props.cards.length - arrayLength, props.cards.length).reverse().map((card) => {
                                return <CardListItemFromPuca key={card.id} location={props.location} {...card} />
                            })
                        )
                }
            </div> : <div className="list-body">
                    {
                        props.cardsPromoted.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span>No cards found</span>
                            </div>
                        ) : (
                                props.cardsPromoted.slice(props.cardsPromoted.length - arrayLength, props.cardsPromoted.length).reverse().map((card) => {
                                    return <CardListItemFromPuca key={card.id} location={props.location} {...card} />
                                })
                            )
                    }
                </div>}
        </div>
    )
}

const mapStatetoProps = (state) => {
    return {
        cards: getVisibleCards(state.frompuca, state.filters),
        cardsPromoted: getVisibleCards(state.frompucaPromoted, state.filters)
    }
}

export default connect(mapStatetoProps)(CardListFromPuca);  // HOC (kind of)
