import database from "../firebase/firebase"
import { auth } from "firebase";

export const addForPuca = (card) => ({
    type: "ADD_FOR_PUCA",
    card
});

export const startAddForPuca = (cardData = {}) => {    // works because of thunk
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

        return database.ref(`users/${uid}/forpuca`).push(card).then((ref) => {     // return used for promise-chaining when testing
            dispatch(addForPuca({
                id: ref.key,
                ...card
            }))
        })
    }
}

export const removeForPuca = ({ id } = {}) => ({        // destructuring used when getting an object/array
    type: "REMOVE_FOR_PUCA",
    id
})

export const startRemoveForPuca = ({ id }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/forpuca`).child(id).remove().then(() => {  // or `expenses${id}` for child(id)
            dispatch(removeForPuca({ id }))
        })
    }
}

export const editForPuca = (id, updates) => ({
    type: "EDIT_FOR_PUCA",
    id,
    updates
})

export const startEditForPuca = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/forpuca/${id}`).update(updates).then(() => {
            dispatch(editForPuca(id, updates))
        })
    }
}

export const setForPuca = (cards) => ({
    type: "SET_FOR_PUCA",
    cards
})

export const startSetForPuca = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const cards = []
        return database.ref(`users/${uid}/forpuca`).once("value").then((snapshot) => { //snapshot is object structure, we need array structure
            snapshot.forEach((childSnapshot) => {
                cards.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setForPuca(cards))
        })
    }
}
