import * as ActionTypes from './ActionTypes'

export const Auth = (state={
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds') ? JSON.stringify(localStorage.getItem('creds')) : null,
    errMess: null
}, action) => {
    switch(action.type){
        case ActionTypes.LOGIN_REQUEST :
            return {...state, isLoading: true, user: action.payload, isAuthenticated: false, errMess: null};

        case ActionTypes.LOGIN_SUCCESS :
            return {...state, isLoading: false, user: action, token: action.payload, isAuthenticated: true, errMess:''};
        
        case ActionTypes.LOGIN_FAILURE :
            return {...state, isLoading: false, isAuthenticated: false, errMess: action.payload};

        case ActionTypes.LOGOUT_REQUEST :
            return {...state, isLoading: true, isAuthenticated: true};

        case ActionTypes.LOGOUT_SUCCESS :
            return {...state, isLoading: false, isAuthenticated: false, token: '', user: null};

        default :
            return state;
    }
}