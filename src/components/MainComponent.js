import React, {Component} from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import {Routes, Route, Navigate} from 'react-router-dom';
import Contact from "./ContactComponent";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

class Main extends Component
{

  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS

  };
  }

  render(){

    return (<div>
      <Header></Header>
      <Routes>
          <Route path="/home" element={<Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} promotion={this.state.promotions.filter((promo) => promo.featured)[0]}  leader={this.state.leaders.filter((leader) => leader.featured)[0]}></Home>}></Route>
          <Route exact path='/menu' element={<Menu dishes={this.state.dishes}></Menu>} />
          <Route exact path="/contactus" element={<Contact></Contact>}></Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer></Footer>
    </div>);
  }
}

export default Main;
