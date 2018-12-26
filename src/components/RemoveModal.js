import React from "react"
import Modal from "react-modal"

const RemoveModal = (props) => (
    <Modal
        isOpen={!!props.showModal}
        onRequestClose={props.onModalNo}
        closeTimeoutMS={200}
        contentLabel="Remove inquiry"
        ariaHideApp={false} // Fehlermeldung (nicht best-practice!)
        className="modal"
    >
        <h3 className="modal__title">Do you really want to delete this card?</h3>
        <div className="modal-align">
            <button className="button" onClick={props.onModalYes}>Yes, sir</button>
            <button className="button button--secondary" onClick={props.onModalNo}>No, god no</button>
        </div>
    </Modal>
)

export default RemoveModal 
