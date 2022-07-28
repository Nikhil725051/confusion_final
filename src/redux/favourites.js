import * as  ActionTypes  from "./ActionTypes";
export const Favourites = (state={
    isLoading: true,
    errMess: null,
    favourites: null
}, action) => {
    switch(action.type){
        case ActionTypes.FAVOURITE_LOADING : 
            return state;

        case ActionTypes.FAVOURITE_FAILED :
            return {...state, isLoading: false, errMess : action.payload};

        case ActionTypes.ADD_FAVOURITES :
            return {...state, isLoading: false, favourites: action.payload};

        default :
             return state;
    }
}