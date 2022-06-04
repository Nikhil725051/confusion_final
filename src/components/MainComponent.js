import React, {Component} from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import {Routes, Route, Navigate, useParams, useLocation} from 'react-router-dom';
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import { postComment, fetchComments, fetchDishes, fetchPromos } from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import {TransitionGroup, CSSTransition} from "react-transition-group";



const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    comments: state.comments,
    promotions : state.promotions,
    leaders : state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment : (dishId, author, rating, comment) => dispatch(postComment(dishId, author, rating, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  fetchComments : () => {dispatch(fetchComments())},
  fetchPromos : () =>{dispatch(fetchPromos())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))}
})


function MainContent(props){
  const loaction = useLocation();
  
  return (
    <TransitionGroup>
    <CSSTransition key={loaction.key} classNames="page" timeout={300}>
     <Routes>
      <Route path="/home" element={<Home 
      dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
      dishesLoading={props.dishes.isLoading}
      errMess={props.dishes.errMess}
      promotion={props.promotions.promotions.filter((promo) => promo.featured)[0]}
      promoLoading = {props.promotions.isLoading}
      promoErrMess = {props.promotions.errMess}
      leader={props.leaders.filter((leader) => leader.featured)[0]}></Home>}></Route>
      <Route exact path="/menu" element={<Menu dishes={props.dishes}></Menu>} />
      <Route path="/contactus" element={<Contact resetFeedbackForm = {props.resetFeedbackForm}></Contact>}></Route>
      <Route exact path="/menu/:dishId" element={<DishWithId 
      dishes={props.dishes} 
      comments={props.comments.comments}
      commentsErrMess={props.comments.errMess} 
      postComment={props.postComment} 
      dishesLoading={props.dishes.isLoading} 
      errMess={props.dishes.errMess}
      ></DishWithId>}></Route>
      <Route path="/aboutus" element={<About leaders={props.leaders}></About>}></Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
   </CSSTransition>
  </TransitionGroup>    
  )
}

function DishWithId(props){
  const {dishId} = useParams();
 
  return (<DishDetail 
    dish={props.dishes.dishes.filter((dish)=>dish.id===parseInt(dishId,10))[0]} 
    comments={props.comments.filter((comment)=>comment.dishId===parseInt(dishId,10))}
    commentsErrMess={props.commentsErrMess}
    postComment={props.postComment} 
    dishesLoading={props.dishesLoading} 
    errMess={props.errMess}></DishDetail>);
 
}

class Main extends Component
{


  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  
  render(){

    return (<div>
      <Header></Header>
      <MainContent {...this.props}></MainContent>
      <Footer></Footer>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);