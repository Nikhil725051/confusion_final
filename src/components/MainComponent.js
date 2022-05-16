import React, {Component} from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import {Routes, Route, Navigate, useParams} from 'react-router-dom';
import Contact from "./ContactComponent";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import DishDetail from "./DishDetailComponent";
import {COMMENTS} from "../shared/comments";
import About from "./AboutComponent";


function DishWithId(props){
  const {dishId} = useParams();
  return (<DishDetail dish={props.dishes.filter((dish)=>dish.id===parseInt(dishId,10))[0]} comments={props.comments.filter((comment)=>comment.dishId===parseInt(dishId,10))}></DishDetail>);
}

class Main extends Component
{

  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      comments: COMMENTS

  };
  }

  

  render(){

    return (<div>
      <Header></Header>
      <Routes>
          <Route path="/home" element={<Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} promotion={this.state.promotions.filter((promo) => promo.featured)[0]}  leader={this.state.leaders.filter((leader) => leader.featured)[0]}></Home>}></Route>
          <Route exact path="/menu" element={<Menu dishes={this.state.dishes}></Menu>} />
          <Route path="/contactus" element={<Contact></Contact>}></Route>
          <Route exact path="/menu/:dishId" element={<DishWithId dishes={this.state.dishes} comments={this.state.comments}></DishWithId>}></Route>
          <Route path="/aboutus" element={<About leaders={this.state.leaders}></About>}></Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer></Footer>
    </div>);
  }
}

export default Main;
