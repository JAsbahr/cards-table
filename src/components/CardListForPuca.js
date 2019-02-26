import React from "react"
import { connect } from "react-redux"
import CardListItemForPuca from "./CardListItemForPuca"
import getVisibleCards from "../selectors/getVisibleCards"

export const CardListForPuca = (props) => { // export for testing
    const arrayLength = 7

    return (
        <div className="content-container">
            <div className="list-header">
                <div className="list-item-long">Card name</div>
                <div className="list-item-short">Amount</div>
                <div className="list-item-short">Cost</div>
                <div className="list-item-very-short">Sent</div>
                <div className="list-item-middle">Shipping costs</div>
                <div className="list-item-short">Puca value</div>
                <div className="list-item-short">Percentage</div>
            </div>
            {props.location === "/forpuca" ? <div className="list-body">
                {
                    props.cards.length === 0 ? (
                        <div className="list-item list-item--message">
                            <span>No cards found</span>
                        </div>
                    ) : (
                            props.cards.length > 7 ? 
                            props.cards.slice(props.cards.length - arrayLength, props.cards.length).reverse().map((card) => {
                                return <CardListItemForPuca key={card.id} location={props.location} {...card} />
                            }) :
                            props.cards.reverse().map((card) => {
                                return <CardListItemForPuca key={card.id} location={props.location} {...card} />
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
                                props.cardsPromoted.length > 7 ?
                                props.cardsPromoted.slice(props.cardsPromoted.length - arrayLength, props.cardsPromoted.length).reverse().map((card) => {
                                    return <CardListItemForPuca key={card.id} location={props.location} {...card} />
                                }) : 
                                props.cardsPromoted.reverse().map((card) => {
                                    return <CardListItemForPuca key={card.id} location={props.location} {...card} />
                                })
                            )
                    }
                </div>}
        </div>
    )
}

const mapStatetoProps = (state) => {
    return {
        cards: getVisibleCards(state.forpuca, state.filters),
        cardsPromoted: getVisibleCards(state.forpucaPromoted, state.filters)
    }
}

export default connect(mapStatetoProps)(CardListForPuca);  // HOC (kind of)
