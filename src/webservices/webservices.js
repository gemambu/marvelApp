import axios from 'axios'
import * as Constants from './constants'

export function configure() {
    axios.defaults.baseURL = Constants.BASE_URL;
    axios.defaults.headers.post['Content-Type'] = Constants.CONTENT_TYPE;
    axios.defaults.headers.common['Referrer'] = Constants.REFERRER;
}

export function fetchCharacters(publicApiKey){
    const url = Constants.CHARACTERS_ENDPOINT + Constants.TIMESTAMP + Constants.PUBLIC_API_KEY + publicApiKey + Constants.HASH;
    console.log('url: ', url);

    axios.get(url).then((response) => {
        return response.data
    }).catch((error) => {

       throw error
    });
}

export function fetchCharacter(publicApiKey, characterId){
    const url = '/characters/' + characterId +'?apiKey=' + publicApiKey;
    

    axios.get(url).then((response) => {
        return response.data
    }).catch((error) => {

       throw error
    });
}