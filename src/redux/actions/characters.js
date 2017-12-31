import * as types from '../types/characters'
import { fetchCharacters } from 'marvelApp/src/webservices/webservices'
import { Actions } from 'react-native-router-flux'
import { constants } from 'marvelApp/src/commons'
import qs from 'qs'


function updateCharactersList(value, total) {
    return {
        type: types.GET_CHARACTERS,
        value,
        total
    }
}

export function updateCharactersListOffset(value) {
    return {
        type: types.GET_CHARACTERS_OFFSET,
        value
    }
}

function setCharactersFetching(value) {
    return{
        type: types.GET_CHARACTERS_FETCHING,
        value: value
    }
}

export function initCharactersList(){
    return (dispatch, getState) => {

        // reset characters list and set total to 0
        dispatch(updateCharactersList([], 0))

        // set the offset = 0
        dispatch(updateCharactersListOffset(0))

        // fetch list
        dispatch(fetchCharactersList())
    }
}

export function fetchCharactersList(){
    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))

        const apiKey = '1d62818073f1f77290d9cba5a0df3d8f'

        const state = getState()
        const list = state.characters.list
        const offset = state.characters.offset
        const limit = constants.LIST_CHARACTERS_OFFSET

        const filters = {
            offset: offset,
            limit: limit
        }

        const queryString = '&' + qs.stringify(filters)
        
        fetchCharacters(apiKey, queryString).then(response => {

            const newList = [...list, ...response.data.results]
            dispatch(setCharactersFetching(false))
            dispatch(updateCharactersList(newList, response.data.total))
        }).catch( error => {

            console.log("fetchCharactersList error: ", error)
            dispatch(setCharactersFetching(false))
        });
    }
}

export function updateCharacterSelected(character) {
    return {
        type: types.UPDATE_SELECTED_CHARACTER,
        character
    }
}

// export function fetchCharacterDetail(){
//     return (dispatch, getState) => {
        
        
//         const apiKey = '1d62818073f1f77290d9cba5a0df3d8f'
       
//         fetchCharacters(apiKey).then(response => {
//             console.log("fetchCharactersList response: ", response)
//             dispatch(updateCharactersList(response.data.results))
//         }).catch( error => {
//             console.log("fetchCharactersList error: ", error)
//         });
//     }
// }