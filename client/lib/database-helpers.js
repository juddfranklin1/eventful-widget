// COMMENT BELOW to disable firebase
import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';
import config from '../config';
// COMMENT ABOVE to disable firebase

/**
 *  Configuration file is not in the repository.
 *  Create a file in the client folder called config.js with content like this:
 * 
 *  export default {
 *    apiKey: API_KEY_HERE,
 *    authDomain: AUTH_DOMAIN_HERE,
 *    databaseURL: DATABASE_URI_HERE,
 *    projectId: PROJECT_ID_HERE,
 *    storageBucket: "",
 *    messagingSenderId: SENDER_ID_HERE
 *  };
 *  
 *  The better next step is to have a "save to database" option on the front end and then use that to let user choose datastore type, add credentials, and store them locally.
 *  https://github.com/juddfranklin1/eventful-widget/issues/6
*/

const configuration = !!!config ?  false : config;
export const storeLibrary = !!!firebase ? false : firebase;

export const configure = function(configType) {
    let database = false;

    if (configType === 'FIREBASE' && storeLibrary && configuration){
        storeLibrary.initializeApp(config);

        database = storeLibrary.database();

    } else {
        console.warn('No database connection established');
    }

    return database;
}