import React from "react";
import { connect } from "react-redux"
import CardFormFromPuca from "./CardFormFromPuca"
import { startRemoveFromPuca } from "../actions/frompuca"
import { startRemoveFromPucaPromoted } from "../actions/frompucaPromoted"
import { startEditFromPuca } from "../actions/frompuca"
import { startEditFromPucaPromoted } from "../actions/frompucaPromoted"
import RemoveModal from "./RemoveModal"

export class EditFromPuca extends React.Component {
    state = {
        showModal: false
    }

    onSubmit = (card) => {
        this.props.startEditFromPuca(this.props.card.id, card)
        this.props.history.push("/frompuca")
    }
    onSubmitPromo = (card) => {
        this.props.startEditFromPucaPromoted(this.props.cardPromoted.id, card)
        this.props.history.push("/frompucapromoted")
    }
    onRemove = () => {
        this.setState(() => ({
            showModal: true
        }))
    }
    onModalYes = () => {
        this.props.startRemoveFromPuca({ id: this.props.card.id })
        this.props.history.push("/frompuca")
        this.setState(() => ({
            showModal: false
        }))
    }
    onModalYesPromo = () => {
        this.props.startRemoveFromPucaPromoted({ id: this.props.cardPromoted.id })
        this.props.history.push("/frompucapromoted")
        this.setState(() => ({
            showModal: false
        }))
    }
    onModalNo = () => {
        this.setState(() => ({
            showModal: false
        }))
    }


    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit card</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.card ?
                        <CardFormFromPuca
                            card={this.props.card}
                            onSubmit={this.onSubmit}
                        /> :
                        <CardFormFromPuca
                            card={this.props.cardPromoted}
                            onSubmit={this.onSubmitPromo}
                        />}
                    <button className="button button--secondary" onClick={this.onRemove}>Remove card</button>
                </div>
                {this.props.card ?
                    <RemoveModal
                        showModal={this.state.showModal}
                        onModalYes={this.onModalYes}
                        onModalNo={this.onModalNo}
                    /> :
                    <RemoveModal
                        showModal={this.state.showModal}
                        onModalYes={this.onModalYesPromo}
                        onModalNo={this.onModalNo}
                    />}
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        card: state.frompuca.find((card) => card.id === props.match.params.id),
        cardPromoted: state.frompucaPromoted.find((card) => card.id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch, props) => ({// Vereinfachung des Codes, damit besser getestest werden kann
    startEditFromPuca: (id, card) => dispatch(startEditFromPuca(id, card)),
    startRemoveFromPuca: (data) => dispatch(startRemoveFromPuca(data)),
    startEditFromPucaPromoted: (id, card) => dispatch(startEditFromPucaPromoted(id, card)),
    startRemoveFromPucaPromoted: (data) => dispatch(startRemoveFromPucaPromoted(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFromPuca);
