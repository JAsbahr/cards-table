import React from "react"
import { Link } from "react-router-dom"
import numeral from "numeral"

const CardListItemFromPuca = ({ id, description, euro, amount, sent, puca, location }) => { // Everything inside Link is clickable
    const formattedEuro = numeral(euro / 100 * 0.95).format("0,0.00")
    const percentage = Math.round(((euro * 0.95 * sent / (puca * sent)) - 1) * 100) * 2
    const percentagePromo = Math.round(((puca * sent / ((euro * 0.95) * sent)) - 1) * 100)
    let color
    if (percentage >= 100) {
        color = "item-green"
    } else if (percentage <= 70) {
        color = "item-red"
    } else {
        color = ""
    }
    return (
        <Link className="list-item" to={location === "/frompuca" ? `/edit/frompuca/${id}` : `/edit/frompucapromoted/${id}`}>
            <div className="list-item-long">{description}</div>
            <div className="list-item-short">{amount}</div>
            <div className="list-item-short">{puca}</div>
            {sent === 0 ? <div className="list-item-very-short"></div> : <div className="list-item-very-short">{sent}</div>}
            {euro === 0 ? <div className="list-item-short"></div> : <div className="list-item-short">{formattedEuro}€</div>}
            <div className="list-item-middle"></div>
            {sent === 0 ? <div className="list-item-short"></div> : <div className="list-item-short"><span className={color}>
                {location === "/frompuca" ? percentage : percentagePromo}
                %</span></div>}
        </Link>
    )
}

export default CardListItemFromPuca
