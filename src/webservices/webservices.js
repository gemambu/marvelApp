import axios from 'axios'

export function configure() {
    axios.defaults.baseURL = 'http://gateway.marvel.com';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Authorization'] = 'http://dccomics.com';
}

export function fetchCharacters(publicApiKey){
    const url = '/characters?apiKey=' + publicApiKey;

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