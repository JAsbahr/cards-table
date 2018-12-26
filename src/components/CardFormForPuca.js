import React from "react"


export default class CardFormForPuca extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            description: props.card ? props.card.description : "",
            euro: props.card ? (props.card.euro / 100).toString() : "",
            amount: props.card ? (props.card.amount).toString() : "",
            shipping: props.card ? (props.card.shipping / 100).toString() : "",
            sent: props.card ? (props.card.sent).toString() : "",
            puca: props.card ? (props.card.puca).toString() : "",
            error: ""
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }))
    }
    onAmountChange = (e) => {
        const amount = e.target.value
        if (!amount || amount.match(/^\d{1,}$/)) {
            this.setState(() => ({ amount }))
        }
    }
    onEuroChange = (e) => {
        const euro = e.target.value
        if (!euro || euro.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ euro }))
        }
    }
    onShippingChange = (e) => {
        const shipping = e.target.value
        if (!shipping || shipping.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ shipping }))
        }
    }
    onSentChange = (e) => {
        const sent = e.target.value
        if (!sent || sent.match(/^\d{1,}$/)) {
            this.setState(() => ({ sent }))
        }
    }
    onPucaChange = (e) => {
        const puca = e.target.value
        if (!puca || puca.match(/^\d{1,}$/)) {
            this.setState(() => ({ puca }))
        }
    }
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount || !this.state.amount) {
            this.setState(() => ({
                error: "Please provide card name, amount and cost"
            }))
        } else {
            this.setState(() => ({ error: "" }))
            this.props.onSubmit({
                description: this.state.description,
                euro: parseFloat(this.state.euro) * 100,
                amount: parseFloat(this.state.amount),
                shipping: this.state.shipping === "" ? 0 : parseFloat(this.state.shipping) * 100,
                sent: this.state.sent === "" ? 0 : parseFloat(this.state.sent),
                puca: this.state.puca === "" ? 0 : parseFloat(this.state.puca)
            })
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Card name"
                    autoFocus
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    className="text-input"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <input
                    type="text"
                    className="text-input"
                    placeholder="Cost in Euro"
                    value={this.state.euro}
                    onChange={this.onEuroChange}
                />
                <input
                    type="text"
                    className="text-input"
                    placeholder="Amount sent"
                    value={this.state.sent}
                    onChange={this.onSentChange}
                />
                <input
                    type="text"
                    className="text-input"
                    placeholder="Shipping costs"
                    value={this.state.shipping}
                    onChange={this.onShippingChange}
                />
                <input
                    type="text"
                    className="text-input"
                    placeholder="Puca value"
                    value={this.state.puca}
                    onChange={this.onPucaChange}
                />
                <div>
                    <button className="button">Save card</button>
                </div>
            </form>
        )
    }
}
