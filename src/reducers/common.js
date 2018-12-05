const defaultState = {
    appName: 'Hermes'
};
  
export default (state = defaultState, action) => {
    switch (action.type) {
        case 'APP_LOAD':
            return {
                ...state,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null
            };
        case 'REDIRECT':
            return { ...state, redirectTo: null };
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user
            };
        case 'LOGOUT':
            return { 
                ...state, 
                redirectTo: '/', 
                token: null, 
                currentUser: null 
            };
        case 'SETTINGS_SAVED':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user
            }
        default:
            return state;
    }
};