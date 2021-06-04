import { createStore, applymiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applymiddleware(thunk)
    )
);

export default store;