import * as types from '../types/characters'
import { fetchCharacters } from 'marvelApp/src/webservices/webservices'
import { Actions } from 'react-native-router-flux'


function updateCharactersList(value) {
    return {
        type: types.GET_CHARACTERS,
        value
    }
}
export function fetchCharactersList(){
    return (dispatch, getState) => {
        
        dispatch(updateCharactersList([]))
        const apiKey = '1d62818073f1f77290d9cba5a0df3d8f'
       
        fetchCharacters(apiKey).then(response => {
            console.log("fetchCharactersList response: ", response)
            dispatch(updateCharactersList(response.data.results))
        }).catch( error => {
            console.log("fetchCharactersList error: ", error)
        });
    }
}