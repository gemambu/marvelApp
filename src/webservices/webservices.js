import axios from 'axios'
import * as constants from './constants'

export function configure() {
    axios.defaults.baseURL = constants.BASE_URL;
    axios.defaults.headers.post['Content-Type'] = constants.CONTENT_TYPE;
    axios.defaults.headers.common['Referer'] = constants.REFERRER;
}

export function fetch(url){
    
    console.log('URL: ', url)
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

export function post(url, data){
    
    return new Promise(function(resolve, reject) {

        axios.post(url, data).then( response => {

            if (response.data)
                resolve( response.data )
            else
                reject( response )

        }).catch( error => {
            reject( error )
        });

    })
}

