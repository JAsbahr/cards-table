const frompucaReducerDefaultState = [];

const frompucaReducer = (state = frompucaReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_FROM_PUCA":
      return [
        ...state,
        action.card
      ];
    case "REMOVE_FROM_PUCA":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_FROM_PUCA":
      return state.map((card) => {
        if (card.id === action.id) {
          return {
            ...card,
            ...action.updates
          }
        } else {
          return card
        }
      })
    case "SET_FROM_PUCA":
      return action.cards
    default:
      return state;
  }
}

export default frompucaReducer
