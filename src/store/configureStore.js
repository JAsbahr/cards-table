import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import forpucaReducer from "../reducers/forpuca"
import frompucaReducer from "../reducers/frompuca"
import filtersReducer from "../reducers/filters"
import authReducers from "../reducers/auth"
import thunk from "redux-thunk"
import forpucaPromotedReducer from "../reducers/forpucaPromoted";
import frompucaPromotedReducer from "../reducers/frompucaPromoted";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            forpuca: forpucaReducer,
            forpucaPromoted: forpucaPromotedReducer,
            frompuca: frompucaReducer,
            frompucaPromoted: frompucaPromotedReducer,
            filters: filtersReducer,
            auth: authReducers
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store
}
