import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component
{

    constructor(props){
        super(props);
        this.toggleNav=this.toggleNav.bind(this);
        this.state={
            isNavOpen: false
        };
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render(){
        return(
            <div>
             <Navbar dark expand="md">
                  <div className="container">
                      <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
                      <NavbarBrand className="mr-auto" href="/"><img src="assets/images/logo.png" alt="Ristorante Con Fusion" height="30" width="41"/></NavbarBrand>
                      <Collapse isOpen={this.state.isNavOpen}>
                        <Nav navbar>
                            <NavItem><NavLink className="nav-link" to="/home"></NavLink><span className="fa fa-home fa-lg"></span>Home</NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem><NavLink className="nav-link" to="/menu"></NavLink><span className="fa fa-list fa-lg"></span>Menu</NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem><NavLink className="nav-link" to="/aboutus"></NavLink><span className="fa fa-info fa-lg"></span>Abut US</NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem><NavLink className="nav-link" to="/contactus"></NavLink><span className="fa fa-card fa-lg"></span>Contact Us</NavItem>
                        </Nav>
                      </Collapse>
                  </div>
              </Navbar>
             <div className="p-5 text-white jumbotron">
                 <div className="container">
                     <div className="row row-header">
                         <div className="col-12 col-sm-6">
                             <h1>Ristorante con Fusion</h1>
                             <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                         </div>
                     </div>
                 </div>
             </div>
            </div>
        )
    }
}
export default Header;