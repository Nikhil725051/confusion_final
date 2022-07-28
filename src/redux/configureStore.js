import { applyMiddleware, combineReducers, createStore } from "redux";
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";
import { InitialFeedback } from "./forms";
import { Favourites } from "./favourites";
import { Auth } from "./auth";

export const ConfigureStore=()=>{
   const store = createStore(
       combineReducers(
           {
               dishes : Dishes,
               comments : Comments,
               leaders : Leaders,
               promotions : Promotions,
               favourites : Favourites,
               auth : Auth,
               ...createForms({
                   feedback : InitialFeedback
               }) 
           }
       ),
       applyMiddleware(thunk, logger)
   );
   return store;
}