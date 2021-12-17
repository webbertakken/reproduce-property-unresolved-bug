// Signature of lodash.get:
// get<TDefault>(object: null | undefined, path: PropertyPath, defaultValue: TDefault): TDefault;
import { get } from 'lodash';

/**
 * This will represent having set up a root reducer with nested reducers as well as having a store for global state.
 * This is a simplified version that will be detected similar to a react-redux setup like in any regular app.
 *
 * Autocompletion from WebStorm now knows that somewhere in the code these properties MAY be referenced,
 * creating what you could call uncertainty.
 *
 * For example: The IDE does not know whether a prop can be resolved or not.
 *              This results in not having red squiggly lines indicating "unresolved" when
 *              referenced on an identifier that holds a variable of an unknown shape.
 *
 * Note: this doesn't need to be called `state` in order for its properties to potentially resolve.
 */
const store = {
    activeAddress: {
        userGeolocations: true
    }
}

/**
 * Representation of a file with code that integrates with redux, structured like a duck
 *
 * @see also https://github.com/erikras/ducks-modular-redux
 */

const initialState = {
    someProp: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'someAction':
            return {
                ...state,
                nothing: false,
            };
        default:
            return state;
    }
};

// Success: someProp potentially resolved
const rootSelector = state => state.activeAddress.userGeolocations;
const selector = state => rootSelector(state).someProp;

// Success: someProp potentially resolved
const rootSelector1 = () => state => reducer(state);
const selector1 = state => rootSelector1(state).someProp;

// Failure: someProp "certainly" unresolved
const rootSelector2 = state => get(state, 'activeAddress.userGeolocations', initialState);
const selector2 = state => rootSelector2(state).someProp;
