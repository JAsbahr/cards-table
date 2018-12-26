const forpucaPromotedReducerDefaultState = [];

const forpucaPromotedReducer = (state = forpucaPromotedReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_FOR_PUCA_PROMOTED":
            return [
                ...state,
                action.card
            ];
        case "REMOVE_FOR_PUCA_PROMOTED":
            return state.filter(({ id }) => id !== action.id);
        case "EDIT_FOR_PUCA_PROMOTED":
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
        case "SET_FOR_PUCA_PROMOTED":
            return action.cards
        default:
            return state;
    }
}

export default forpucaPromotedReducer
