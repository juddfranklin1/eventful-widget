// COMMENT BELOW to disable firebase
import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';
import { firebaseConfig, s3Config } from '../config';
// COMMENT ABOVE to disable firebase

import S3 from 'aws-sdk/clients/s3';

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

export const configure = function(configType) {
    let database = false;

    if (configType === 'FIREBASE'){
        const configuration = !!!firebaseConfig ? false : firebaseConfig;
        const library = !!!firebase ? false : firebase;

        if(library && configuration){
            library.initializeApp(configuration);
    
            database = library.database();
        } else {
            console.warn(configuration, 'No database connection established');
        }
    } else if (configType === 'S3') {
        const configuration = !!!s3Config ? false : s3Config;
        const library = !!!S3 ? false : S3;

        if(library && configuration) {
            // S3
            // Bucket names must be unique across all S3 users

            var myBucket = s3Config.bucketName;

            var myKey = s3Config.bucketKey;

            /* s3Library.createBucket({Bucket: myBucket}, function(err, data) {  // example test put

            if (err) {

            console.log(err);

            } else {

                params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};

                s3Library.putObject(params, function(err, data) {

                    if (err) {

                        console.log(err)

                    } else {

                        console.log("Successfully uploaded data to myBucket/myKey");

                    }

                });

            }

            }); */
        } else {
            console.warn('No database connection established');
        }
    }
    return database;
}

export const getStoreLibrary = function(configType){
    let library = false;
    if (configType === 'FIREBASE' && !!firebase){
        library = firebase;
    } else if (configType === 'S3' && !!S3) {
        library = S3;
    }
    
    return library;
}
