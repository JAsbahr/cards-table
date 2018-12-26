import database from "../firebase/firebase"
import { auth } from "firebase";

export const addForPucaPromoted = (card) => ({
    type: "ADD_FOR_PUCA_PROMOTED",
    card
});


export const startAddForPucaPromoted = (cardData = {}) => {    // works because of thunk
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {                         // andere Schreibweise für defaults wie ehemals addExpense (als object in Klammer)
            description = "",
            euro = 0,
            amount = 0,
            shipping = 0,
            sent = 0,
            puca = 0
        } = cardData
        const card = { description, euro, amount, shipping, sent, puca }

        return database.ref(`users/${uid}/forpucaPromoted`).push(card).then((ref) => {     // return used for promise-chaining when testing
            dispatch(addForPucaPromoted({
                id: ref.key,
                ...card
            }))
        })
    }
}

export const removeForPucaPromoted = ({ id } = {}) => ({        // destructuring used when getting an object/array
    type: "REMOVE_FOR_PUCA_PROMOTED",
    id
})

export const startRemoveForPucaPromoted = ({ id }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/forpucaPromoted`).child(id).remove().then(() => {  // or `expenses${id}` for child(id)
            dispatch(removeForPucaPromoted({ id }))
        })
    }
}

export const editForPucaPromoted = (id, updates) => ({
    type: "EDIT_FOR_PUCA_PROMOTED",
    id,
    updates
})

export const startEditForPucaPromoted = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/forpucaPromoted/${id}`).update(updates).then(() => {
            dispatch(editForPucaPromoted(id, updates))
        })
    }
}

export const setForPucaPromoted = (cards) => ({
    type: "SET_FOR_PUCA_PROMOTED",
    cards
})

export const startSetForPucaPromoted = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const cards = []
        return database.ref(`users/${uid}/forpucaPromoted`).once("value").then((snapshot) => { //snapshot is object structure, we need array structure
            snapshot.forEach((childSnapshot) => {
                cards.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setForPucaPromoted(cards))
        })
    }
}
