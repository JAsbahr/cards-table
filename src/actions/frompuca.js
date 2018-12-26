import database from "../firebase/firebase"
import { auth } from "firebase";

export const addFromPuca = (card) => ({
  type: "ADD_FROM_PUCA",
  card
});

export const startAddFromPuca = (cardData = {}) => {    // works because of thunk
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

    return database.ref(`users/${uid}/frompuca`).push(card).then((ref) => {     // return used for promise-chaining when testing
      dispatch(addFromPuca({
        id: ref.key,
        ...card
      }))
    })
  }
}

export const removeFromPuca = ({ id } = {}) => ({        // destructuring used when getting an object/array
  type: "REMOVE_FROM_PUCA",
  id
})

export const startRemoveFromPuca = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/frompuca`).child(id).remove().then(() => {  // or `expenses${id}` for child(id)
      dispatch(removeFromPuca({ id }))
    })
  }
}

export const editFromPuca = (id, updates) => ({
  type: "EDIT_FROM_PUCA",
  id,
  updates
})

export const startEditFromPuca = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/frompuca/${id}`).update(updates).then(() => {
      dispatch(editFromPuca(id, updates))
    })
  }
}

export const setFromPuca = (cards) => ({
  type: "SET_FROM_PUCA",
  cards
})

export const startSetFromPuca = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const cards = []
    return database.ref(`users/${uid}/frompuca`).once("value").then((snapshot) => { //snapshot is object structure, we need array structure
      snapshot.forEach((childSnapshot) => {
        cards.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setFromPuca(cards))
    })
  }
}
