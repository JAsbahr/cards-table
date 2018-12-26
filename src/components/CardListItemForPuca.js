import React from "react"
import { Link } from "react-router-dom"
import numeral from "numeral"

const CardListItemForPuca = ({ id, description, euro, amount, shipping, sent, puca, location }) => { // Everything inside Link is clickable
    const formattedEuro = numeral(euro / 100).format("0,0.00")
    const formattedShippingCosts = numeral(shipping / 100).format("0,0.00")
    const percentage = Math.round(((puca * sent / (euro * sent + shipping * sent)) - 1) * 100)
    let color
    if (percentage >= 100) {
        color = "item-green"
    } else if (percentage <= 70) {
        color = "item-red"
    } else {
        color = ""
    }
    return (
        <Link className="list-item" to={location === "/forpuca" ? `/edit/forpuca/${id}` : `/edit/forpucapromoted/${id}`}>
            <div className="list-item-long">{description}</div>
            <div className="list-item-short">{amount}</div>
            <div className="list-item-short">{formattedEuro}€</div>
            {sent === 0 ? <div className="list-item-very-short"></div> : <div className="list-item-very-short">{sent}</div>}
            {shipping === 0 ? <div className="list-item-middle"></div> : <div className="list-item-middle">{formattedShippingCosts}€</div>}
            {puca === 0 ? <div className="list-item-short"></div> : <div className="list-item-short">{puca}</div>}
            {sent === 0 ? <div className="list-item-short"></div> : <div className="list-item-short"><span className={color}>{percentage}%</span></div>}
        </Link>
    )
}

export default CardListItemForPuca
