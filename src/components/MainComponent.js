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
import { postComment, fetchComments, fetchDishes, fetchPromos, postFeedback, fetchLeaders, postFavourite, fetchFavourites, deleteFavourite, loginUser, logoutUser } from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Favourites from "./favouriteComponent";



const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    comments: state.comments,
    promotions : state.promotions,
    leaders : state.leaders,
    favourites : state.favourites,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment : (dishId, author, rating, comment) => dispatch(postComment(dishId, author, rating, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  fetchComments : () => {dispatch(fetchComments())},
  fetchPromos : () =>{dispatch(fetchPromos())},
  fetchLeaders : () => dispatch(fetchLeaders()),
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))},
  postFeedback : (firstName, lastName, telNum, email, agree, contactType, message) => dispatch(postFeedback(firstName, lastName, telNum, email, agree, contactType, message)),
  postFavourites : (dishId) => dispatch(postFavourite(dishId)),
  fetchFavourites : () => dispatch(fetchFavourites()),
  deleteFavourite : (dishId) => dispatch(deleteFavourite(dishId)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
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
      leader={props.leaders.leaders.filter((leader) => leader.featured)[0]}
      leadersLoading={props.leaders.isLoading}
      leadersErrMess={props.leaders.errMess}></Home>}></Route>
      <Route exact path="/menu" element={<Menu dishes={props.dishes}></Menu>} />
      <Route exact path="favourites" element={<PrivateRoute><Favourites favourites={props.favourites} deleteFavourite={props.deleteFavourite}></Favourites></PrivateRoute>}></Route>
      <Route path="/contactus" element={<Contact resetFeedbackForm = {props.resetFeedbackForm} postFeedback={props.postFeedback}></Contact>}></Route>
      <Route exact path="/menu/:dishId" element={<DishWithId 
      dishes={props.dishes} 
      comments={props.comments.comments}
      commentsErrMess={props.comments.errMess} 
      postComment={props.postComment} 
      dishesLoading={props.dishes.isLoading} 
      errMess={props.dishes.errMess}
      ></DishWithId>}></Route>
      <Route path="/aboutus" element={<About leaders={props.leaders.leaders}></About>}></Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
   </CSSTransition>
  </TransitionGroup>    
  )
}

function PrivateRoute({children}){
  return this.props.auth.isAuthenticated ?  children : <Navigate to='/home'/>
}

function DishWithId(props){
  const {dishId} = useParams();
  return (<DishDetail 
    dish={props?.dishes?.dishes?.filter((dish)=>dish._id===dishId)[0]} 
    comments={props.comments.filter((comment)=>comment.dish===dishId)}
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
    this.props.fetchLeaders();
    this.props.fetchFavourites();
  }
  
  render(){

    return (<div>
      <Header
          auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} ></Header>
      <MainContent {...this.props}></MainContent>
      <Footer></Footer>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);