import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import selectCostTotal from "../selectors/selectCostTotal"
import selectPointsTotal from "../selectors/selectPointsTotal"
import selectEuroTotal from "../selectors/selectEuroTotal"

export const CardsSummary = ({
    totalPointsFor, totalCostsFor, totalEuroFrom, totalPointsFrom, totalPointsForPromoted, totalCostsForPromoted, totalEuroFromPromoted, totalPointsFromPromoted
}) => {
    const percentageFor = Math.round(((totalPointsFor / totalCostsFor) - 1) * 100)
    const percentageForPromoted = Math.round(((totalPointsForPromoted / totalCostsForPromoted)) * 100)
    const percentageFrom = Math.round((((totalEuroFrom * 0.95) / totalPointsFrom) - 1) * 100) * 2
    const percentageFromPromoted = Math.round(((totalPointsFromPromoted / (totalEuroFromPromoted * 0.95))) * 100)
    const profit = percentageFor + percentageFrom
    const profitPromo = Math.round(((percentageForPromoted / percentageFromPromoted) - 1) * 100)
    return (
        <div className="page-header">
            <div className="content-container">
                <div className="input-group__summary">
                    <div className="summary-item">
                        <h1 className="page-header__title">From Puca: <span>{percentageFrom}%</span></h1>
                        <h1 className="page-header__title">For Puca: <span>{percentageFor}%</span></h1>
                        <h1 className="page-header__title">Profit: <span className="profit-span">{profit}%</span></h1>
                    </div>
                    <div className="summary-item">
                        <h1 className="page-header__title">Promo from Puca: <span>{percentageFromPromoted}%</span></h1>
                        <h1 className="page-header__title">Promo for Puca: <span>{percentageForPromoted}%</span></h1>
                        <h1 className="page-header__title">Profit : <span className="profit-span">{profitPromo}%</span></h1>
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-group__item">
                        <NavLink to="/frompuca" className="button" activeClassName="button button--active">From Puca</NavLink>
                    </div>
                    <div className="input-group__item">
                        <NavLink to="/forpuca" className="button" activeClassName="button button--active">For Puca</NavLink>
                    </div>
                    <div className="input-group__item">
                        <NavLink to="/frompucapromoted" className="button" activeClassName="button button--active">Promo from Puca</NavLink>
                    </div>
                    <div className="input-group__item">
                        <NavLink to="/forpucapromoted" className="button" activeClassName="button button--active">Promo for Puca</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )

}

const mapStatetoProps = (state) => {
    return {
        totalCostsFor: selectCostTotal(state.forpuca),
        totalPointsFor: selectPointsTotal(state.forpuca),
        totalCostsForPromoted: selectCostTotal(state.forpucaPromoted),
        totalPointsForPromoted: selectPointsTotal(state.forpucaPromoted),
        totalEuroFrom: selectEuroTotal(state.frompuca),
        totalPointsFrom: selectPointsTotal(state.frompuca),
        totalEuroFromPromoted: selectEuroTotal(state.frompucaPromoted),
        totalPointsFromPromoted: selectPointsTotal(state.frompucaPromoted)
    }
}

export default connect(mapStatetoProps)(CardsSummary)
