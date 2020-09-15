/**
 *  CUSTOM FUNCTIONS
 *  CALLBACKS DECLARED IN myplugin.json
 */

const myCustomFunction1 = e => {
    //getEnv is a utility function defined in
    console.log( getEnv( e ) );
}

const myCustomFunction2 = e => {
    console.log( getEnv( e ) );
}