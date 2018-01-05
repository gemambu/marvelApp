import * as types from '../types/characters'

const initialState = {
    isFetching: false,
    list: [],
    initialList: [],
    total: 0,
    offset: 0,
    item: null
}

export default function reducer(state = initialState, action = {}) {

    switch (action.type) {

        case types.GET_CHARACTERS:
            return {
                ...state,
                list: action.value,
                total: action.total
            };
        case types.INIT_CHARACTERS_LIST:
            return {
                ...state,
                initialList: action.value,
                total: action.total
            };
        case types.GET_CHARACTERS_FILTERED:
            return {
                ...state,
                list: action.value,
            };
        case types.GET_CHARACTERS_OFFSET:
            return {
                ...state,
                offset: action.value
            };
        case types.GET_CHARACTERS_FETCHING:
            return {
                ...state,
                isFetching: action.value
            };
        case types.SHOW_CHARACTER_DETAIL:
            return {
                ...state,
                item: action.value
            };
        case types.UPDATE_SELECTED_CHARACTER:
            return {
                ...state,
                item: action.character
            }
        default:
            return state;
    }
}
