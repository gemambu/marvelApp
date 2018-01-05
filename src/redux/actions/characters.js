import * as types from '../types/characters'
import { fetch } from 'marvelApp/src/webservices/webservices'
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

function setInitialList(value, total){
    return {
        type: types.INIT_CHARACTERS_LIST,
        value,
        total
    }
}

function updateCharactersFiltered(value){
    return {
        type: types.GET_CHARACTERS_FILTERED,
        value
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

export function reloadCharactersList(){
    return (dispatch, getState) => {
        const state = getState()
        const list = state.characters.initialList
        const total = state.characters.total

        console.log('CharacterAction: loading list again...', list)
        dispatch(updateCharactersList(list, total))
    }
}

export function fetchCharactersFiltered(filterName){
    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))

        const queryString = '&nameStartsWith=' + filterName
        
        const url = webservices.CHARACTERS_ENDPOINT + 
                    webservices.TIMESTAMP + 
                    webservices.PUBLIC_API_KEY + 
                    webservices.PUBLIC_API + 
                    webservices.HASH + 
                    queryString

        console.log('fetch with url: ', url);
        fetch(url).then(response => {

            console.log('New List: ', response.data.results)
            const newList = response.data.results
            dispatch(setCharactersFetching(false))
            dispatch(updateCharactersList(newList, response.data.total))
        }).catch( error => {

            console.log("fetchCharactersList error: ", error)
            dispatch(setCharactersFetching(false))
        });
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

        fetch(url).then(response => {

            const newList = [...list, ...response.data.results]
            
            dispatch(setCharactersFetching(false))
            dispatch(setInitialList(newList))
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
