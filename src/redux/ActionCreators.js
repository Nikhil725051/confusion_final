
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type : ActionTypes.ADD_COMMENT,
    payload : comment
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    var newComment = {
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    }

    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments', {
        method : "post",
        body : JSON.stringify(newComment),
        headers : {
            "Content-Type" : "application/json" 
        },
        credentials : "same-origin"
    })
    .then((response) => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error ' + response.status + ' : ' + response.StatusText);
            error.response=response;
            throw error;
        }
    },
    (error) => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then((response) => response.json())
    .then((comment) => dispatch(addComment(comment)))
    .catch((error) => {
        console.log('post comments', error.message);
        alert('Your comment could not be posted\nError :' + error.message);});
}


export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return fetch(baseUrl+'dishes')
    .then((response)=>{
        if(response.ok){
           return response;
        }else{
            var error = new Error('Error '+ response.status + ' : ' + response.statusText);
            error.response=response;
            throw error;            
        }
    },
    (error) => {
        var errMess= new Error(error.message);
        throw errMess
    } )
    .then((response) => response.json())
    .then((dishes)=>dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));

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

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl+'comments')
    .then((response)=>{
        if(response.ok){
           return response;
        }else{
            var error = new Error('Error '+ response.status + ' : ' + response.statusText);
            error.response=response;
            throw error;            
        }
    },
    (error) => {
        var errMess= new Error(error.message);
        throw errMess
    } )
    .then((response) => response.json())
    .then((comments)=>dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
    
}

export const addComments = (comments) => ({
    type : ActionTypes.ADD_COMMENT,
    payload : comments
})

export const commentsFailed = (errMess) => ({
    type : ActionTypes.COMMENTS_FAILED,
    payload : errMess
})

export const fetchPromos = () => (dispatch) =>{
    dispatch(promosLoading());
    return fetch(baseUrl+'promotions')
    .then((response)=>{
        if(response.ok){
           return response;
        }else{
            var error = new Error('Error '+ response.status + ' : ' + response.statusText);
            error.response=response;
            throw error;            
        }
    },
    (error) => {
        var errMess= new Error(error.message);
        throw errMess
    } )
    .then((response) => response.json())
    .then((promos)=>dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
} 

export const promosLoading = () => ({
    type : ActionTypes.PROMOS_LOADING
})

export const addPromos = (promos) => ({
    type : ActionTypes.ADD_PROMOS,
    payload : promos
})

export const promosFailed = (errMess) => ({
    type : ActionTypes.PROMOS_FAILED,
    payload : errMess
})

export const postFeedback = (firstName, lastName, telNum, email, agree, contactType, message) => (dispatch) => {
    const feedback ={
        fistName : firstName,
        lastName : lastName,
        telNum : telNum,
        email : email,
        agree : agree,
        contactType : contactType,
        message : message
    }
    return fetch(baseUrl + 'feedback', {
        method : "post",
        body : JSON.stringify(feedback),
        headers:{
            "content-Type" : "application/json"
        },
        credentials : "same-origin"
    },
    (error) => {throw error;} )
    .then((response) =>{
        if(response.ok){
            return response.json()
        }else{
            var error = new Error('Error '+ response.status + ':' + response.statusText);
            error.response=response;
            throw error;
        }
    })
    .then((feedback) => alert(JSON.stringify(feedback)))
    .catch((error) => {
        console.log('post feedback', error.message);
        alert('We have encountered some error posting your feedback\nError : ' + error.message);
    })
   
}

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then((response) => {
        if(response.ok){
            return response.json();
        }else{
            var error = new Error('Error ' + response.status + ' : ' + response.statusText);
            error.response=response;
            throw error;
        }
    },
    (error) => {throw error;})
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error)=>dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})

export const addLeaders = (leaders) => ({
    type : ActionTypes.ADD_LEADERS,
    payload : leaders
})

export const leadersFailed = (errMess) => ({
    type : ActionTypes.LEADERS_FAILED,
    payload : errMess
})