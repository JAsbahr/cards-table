import React from "react";
import { connect } from "react-redux"
import CardFormForPuca from "./CardFormForPuca"
import { startAddForPuca } from "../actions/forpuca"
import { startAddForPucaPromoted } from "../actions/forpucaPromoted"

export class AddForPuca extends React.Component {
    onSubmit = (card) => {
        this.props.startAddForPuca(card)
        this.props.history.push("/forpuca")  //history can be used cause of react-router (this component is used in a router)
    }
    onSubmitPromo = (card) => {
        this.props.startAddForPucaPromoted(card)
        this.props.history.push("/forpucapromoted")
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">{this.props.location.pathname === "/forpuca/create" ? "Add for" : "Add for promo"}</h1>
                    </div>
                </div>
                <div className="content-container">
                    <CardFormForPuca
                        onSubmit={this.props.location.pathname === "/forpuca/create" ? this.onSubmit : this.onSubmitPromo}
                    />
                </div>
            </div>
        )
    }
}


const mapDispatchtoProps = (dispatch) => ({                  // eingeführt, um leichter zu testen 
    startAddForPuca: (card) => dispatch(startAddForPuca(card)),
    startAddForPucaPromoted: (card) => dispatch(startAddForPucaPromoted(card))
})

export default connect(undefined, mapDispatchtoProps)(AddForPuca);
