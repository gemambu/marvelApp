import * as types from '../types/characters'
import { fetchCharacters, fetchCharacter } from 'marvelApp/src/webservices/webservices'
import { Actions } from 'react-native-router-flux'
import { constants } from 'marvelApp/src/commons'
import * as webservices from 'marvelApp/src/webservices/constants'
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

        const state = getState()
        const list = state.characters.list
        const offset = state.characters.offset
        const limit = constants.LIST_CHARACTERS_OFFSET

        const filters = {
            offset: offset,
            limit: limit
        }

        const queryString = '&' + qs.stringify(filters)
        
        const url = webservices.CHARACTERS_ENDPOINT + 
                    webservices.TIMESTAMP + 
                    webservices.PUBLIC_API_KEY + 
                    webservices.PUBLIC_API + 
                    webservices.HASH + 
                    queryString

        fetchCharacters(url).then(response => {

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
