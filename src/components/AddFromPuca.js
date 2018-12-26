import React from "react";
import { connect } from "react-redux"
import CardFormFromPuca from "./CardFormFromPuca"
import { startAddFromPuca } from "../actions/frompuca"
import { startAddFromPucaPromoted } from "../actions/frompucaPromoted"

export class AddFromPuca extends React.Component {
    onSubmit = (card) => {
        this.props.startAddFromPuca(card)
        this.props.history.push("/frompuca")  //history can be used cause of react-router (this component is used in a router)
    }
    onSubmitPromo = (card) => {
        this.props.startAddFromPucaPromoted(card)
        this.props.history.push("/frompucapromoted")
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">{this.props.location.pathname === "/frompuca/create" ? "Add from" : "Add from promo"}</h1>
                    </div>
                </div>
                <div className="content-container">
                    <CardFormFromPuca
                        onSubmit={this.props.location.pathname === "/frompuca/create" ? this.onSubmit : this.onSubmitPromo} // props.dispatch(addExpense(expense)) code, bevor getestet werden musste
                    />
                </div>
            </div>
        )
    }
}


const mapDispatchtoProps = (dispatch) => ({                  // eingeführt, um leichter zu testen 
    startAddFromPuca: (card) => dispatch(startAddFromPuca(card)),
    startAddFromPucaPromoted: (card) => dispatch(startAddFromPucaPromoted(card))
})

export default connect(undefined, mapDispatchtoProps)(AddFromPuca);
