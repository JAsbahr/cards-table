import React from "react";
import { connect } from "react-redux"
import CardFormForPuca from "./CardFormForPuca"
import { startRemoveForPuca } from "../actions/forpuca"
import { startEditForPuca } from "../actions/forpuca"
import { startRemoveForPucaPromoted } from "../actions/forpucaPromoted"
import { startEditForPucaPromoted } from "../actions/forpucaPromoted"
import RemoveModal from "./RemoveModal"

export class EditForPuca extends React.Component {
    state = {
        showModal: false
    }

    onSubmit = (card) => {
        this.props.startEditForPuca(this.props.card.id, card)
        this.props.history.push("/forpuca")
    }
    onSubmitPromoted = (card) => {
        this.props.startEditForPucaPromoted(this.props.cardPromoted.id, card)
        this.props.history.push("/forpucapromoted")
    }
    onRemove = () => {
        this.setState(() => ({
            showModal: true
        }))
    }
    onModalYes = () => {
        this.props.startRemoveForPuca({ id: this.props.card.id })
        this.props.history.push("/forpuca")
        this.setState(() => ({
            showModal: false
        }))
    }
    onModalYesPromoted = () => {
        this.props.startRemoveForPucaPromoted({ id: this.props.cardPromoted.id })
        this.props.history.push("/forpucapromoted")
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
                        <CardFormForPuca
                            card={this.props.card}
                            onSubmit={this.onSubmit}
                        /> :
                        <CardFormForPuca
                            card={this.props.cardPromoted}
                            onSubmit={this.onSubmitPromoted}
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
                        onModalYes={this.onModalYesPromoted}
                        onModalNo={this.onModalNo}
                    />}
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        card: state.forpuca.find((card) => card.id === props.match.params.id),
        cardPromoted: state.forpucaPromoted.find((card) => card.id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch, props) => ({// Vereinfachung des Codes, damit besser getestest werden kann
    startEditForPuca: (id, card) => dispatch(startEditForPuca(id, card)),
    startRemoveForPuca: (data) => dispatch(startRemoveForPuca(data)),
    startEditForPucaPromoted: (id, card) => dispatch(startEditForPucaPromoted(id, card)),
    startRemoveForPucaPromoted: (data) => dispatch(startRemoveForPucaPromoted(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditForPuca);
