import * as types from '../types/characters'

const initialState = {
    isFetching: false,
    list: [],
    total: 0,
    offset: 0,
    item: null
}

export default function reducer(state = initialState, action = {}) {

    console.log('REDUCER: ', action)
    switch (action.type) {
        case types.GET_CHARACTERS:
            return {
                ...state,
                list: action.value,
                total: action.total
            };
        case types.GET_CHARACTERS_OFFSET:
            return {
                ...state,
                offset: action.value
            };
        case types.SHOW_CHARACTER_DETAIL:
            return {
                ...state,
                item: action.value
            };
        default:
            return state;
    }
}
