import React, {Component} from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import {Routes, Route, Navigate, useParams} from 'react-router-dom';
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import { addComment, fetchComments, fetchDishes, fetchPromos } from "../redux/ActionCreators";
import { actions } from "react-redux-form";



const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    comments: state.comments,
    promotions : state.promotions,
    leaders : state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment : (dishId, author, rating, comment) => dispatch(addComment(dishId, author, rating, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  fetchComments : () => {dispatch(fetchComments())},
  fetchPromos : () =>{dispatch(fetchPromos())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))}
})

function DishWithId(props){
  const {dishId} = useParams();
 
  return (<DishDetail 
    dish={props.dishes.dishes.filter((dish)=>dish.id===parseInt(dishId,10))[0]} 
    comments={props.comments.filter((comment)=>comment.dishId===parseInt(dishId,10))}
    commentsErrMess={props.commentsErrMess}
    addComment={props.addComment} 
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
      <Routes>
          <Route path="/home" element={<Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading = {this.props.promotions.isLoading}
          promoErrMess = {this.props.promotions.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}></Home>}></Route>
          <Route exact path="/menu" element={<Menu dishes={this.props.dishes}></Menu>} />
          <Route path="/contactus" element={<Contact resetFeedbackForm = {this.props.resetFeedbackForm}></Contact>}></Route>
          <Route exact path="/menu/:dishId" element={<DishWithId 
          dishes={this.props.dishes} 
          comments={this.props.comments.comments}
          commentsErrMess={this.props.comments.errMess} 
          addComment={this.props.addComment} 
          dishesLoading={this.props.dishes.isLoading} 
          errMess={this.props.dishes.errMess}
          ></DishWithId>}></Route>
          <Route path="/aboutus" element={<About leaders={this.props.leaders}></About>}></Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer></Footer>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);