/**
 * Created by Luís A. Bastião Silva <bastiao@ua.pt> on 06/04/15.
 */
/** This should be only include once */

var appEnv = {
    env: '',
    agent: ''
};

if (typeof window === 'undefined' && process) {
    appEnv.env = 'node';

} else  {
    appEnv.env = 'browser';
    appEnv.agent = navigator.userAgent;
}

export {appEnv}