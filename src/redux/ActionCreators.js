import { actionTypes } from 'react-redux-form';
import { DISHES } from '../shared/dishes';
import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, author, rating, comment) => ({
    type : ActionTypes.ADD_COMMENT,
    payload : {
        dishId : dishId,
        author : author,
        rating : rating,
        comment : comment
    }
})

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    setTimeout(()=>{dispatch(addDishes(DISHES))}, 2000);
}

export const dishesLoading = () => ({
    type : ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errMess)=>({
    type : ActionTypes.DISHES_FAILED,
    payload : errMess
})

export const addDishes = (dishes) => ({
    type : ActionTypes.ADD_DISHES,
    payload : dishes
})