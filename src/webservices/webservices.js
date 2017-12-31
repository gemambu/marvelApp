import axios from 'axios'
import * as Constants from './constants'

export function configure() {
    axios.defaults.baseURL = Constants.BASE_URL;
    axios.defaults.headers.post['Content-Type'] = Constants.CONTENT_TYPE;
    axios.defaults.headers.common['Referer'] = Constants.REFERRER;
}

export function fetchCharacters(publicApiKey, queryParams){
    
    const url = Constants.CHARACTERS_ENDPOINT + Constants.TIMESTAMP + Constants.PUBLIC_API_KEY + publicApiKey + Constants.HASH + '&' +queryParams;
    console.log('url: ', url);
    
    return new Promise(function(resolve, reject) {
        axios.get(url).then( response => {

            if (response.data)
                resolve( response.data )
            else
                reject( response )

        }).catch( error => {
            reject( error )
        });
    })
}
