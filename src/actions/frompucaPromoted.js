import database from "../firebase/firebase"
import { auth } from "firebase";

export const addFromPucaPromoted = (card) => ({
  type: "ADD_FROM_PUCA_PROMOTED",
  card
});

export const startAddFromPucaPromoted = (cardData = {}) => {    // works because of thunk
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const {                         // andere Schreibweise für defaults wie ehemals addExpense (als object in Klammer)
      description = "",
      euro = 0,
      amount = 0,
      sent = 0,
      puca = 0
    } = cardData
    const card = { description, euro, amount, sent, puca }

    return database.ref(`users/${uid}/frompucaPromoted`).push(card).then((ref) => {     // return used for promise-chaining when testing
      dispatch(addFromPucaPromoted({
        id: ref.key,
        ...card
      }))
    })
  }
}

export const removeFromPucaPromoted = ({ id } = {}) => ({        // destructuring used when getting an object/array
  type: "REMOVE_FROM_PUCA_PROMOTED",
  id
})

export const startRemoveFromPucaPromoted = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/frompucaPromoted`).child(id).remove().then(() => {  // or `expenses${id}` for child(id)
      dispatch(removeFromPucaPromoted({ id }))
    })
  }
}

export const editFromPucaPromoted = (id, updates) => ({
  type: "EDIT_FROM_PUCA_PROMOTED",
  id,
  updates
})

export const startEditFromPucaPromoted = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/frompucaPromoted/${id}`).update(updates).then(() => {
      dispatch(editFromPucaPromoted(id, updates))
    })
  }
}

export const setFromPucaPromoted = (cards) => ({
  type: "SET_FROM_PUCA_PROMOTED",
  cards
})

export const startSetFromPucaPromoted = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const cards = []
    return database.ref(`users/${uid}/frompucaPromoted`).once("value").then((snapshot) => { //snapshot is object structure, we need array structure
      snapshot.forEach((childSnapshot) => {
        cards.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setFromPucaPromoted(cards))
    })
  }
}
