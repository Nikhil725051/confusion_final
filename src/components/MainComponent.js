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



const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    comments: state.comments,
    promotions : state.promotions,
    leaders : state.leaders
  }
}

function DishWithId(props){
  const {dishId} = useParams();
  return (<DishDetail dish={props.dishes.filter((dish)=>dish.id===parseInt(dishId,10))[0]} comments={props.comments.filter((comment)=>comment.dishId===parseInt(dishId,10))}></DishDetail>);
}

class Main extends Component
{
  
  render(){

    return (<div>
      <Header></Header>
      <Routes>
          <Route path="/home" element={<Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} promotion={this.props.promotions.filter((promo) => promo.featured)[0]}  leader={this.props.leaders.filter((leader) => leader.featured)[0]}></Home>}></Route>
          <Route exact path="/menu" element={<Menu dishes={this.props.dishes}></Menu>} />
          <Route path="/contactus" element={<Contact></Contact>}></Route>
          <Route exact path="/menu/:dishId" element={<DishWithId dishes={this.props.dishes} comments={this.props.comments}></DishWithId>}></Route>
          <Route path="/aboutus" element={<About leaders={this.props.leaders}></About>}></Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer></Footer>
    </div>);
  }
}

export default connect(mapStateToProps)(Main);