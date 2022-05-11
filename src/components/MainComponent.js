import React, {Component} from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import {Routes, Route, Navigate} from 'react-router-dom';
import {Navbar} from "reactstrap";

class Main extends Component
{

  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
  };
  }

  render(){

    return (<div>
      <Header></Header>
      <Routes>
          <Route path='/home' element={<Home></Home>} />
          <Route exact path='/menu' element={<Menu dishes={this.state.dishes}></Menu>} />
          <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Footer></Footer>
    </div>);
  }
}

export default Main;
