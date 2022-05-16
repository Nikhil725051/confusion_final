import React from "react";
import {Link} from "react-router-dom";

function Footer(props){
    return(<div className="footer">
        <div className="container pt-5">
            <div className="row">
                <div className="col-6 col-sm-4">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/aboutus">About</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="col-6 col-sm-4">
                    <h5>Our address</h5>
                    <p>121, Clear Water Bay Road<br/>
                       Clear Water Bay, Kowloon<br/>
                       HONG KONG</p>
                    <a href="tel:+852 1234 5678"><i className="fa fa-phone"></i>+852 1234 5678</a>
                    <a className="d-block" href=""><i className="fa fa-envelope"></i> confusion@food.net</a>
                </div>
                <div class="col-12 col-sm-4 align-self-center">
                    <div class="text-center">
                        <a class="btn btn-social-icon btn-google mr-2" href="http://google.com/+"><i class="fa fa-google-plus fa-lg"></i></a>
                        <a class="btn btn-social-icon btn-facebook mr-2" href="http://www.facebook.com/profile.php?id="><i class="fa fa-facebook fa-lg"></i></a>
                        <a class="btn btn-social-icon btn-linkedin mr-2" href="http://www.linkedin.com/in/"><i class="fa fa-linkedin fa-lg"></i></a>
                        <a class="btn btn-social-icon btn-twitter mr-2" href="http://twitter.com/"><i class="fa fa-twitter fa-lg"></i></a>
                        <a class="btn btn-social-icon btn-google mr-2" href="http://youtube.com/"><i class=" fa fa-youtube fa-lg"></i></a>
                        <a class="btn btn-social-icon" href="mailto:"><i class="fa fa-envelope-o fa-lg"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <p>© Copyright 2018 Ristorante Con Fusion</p>
                </div>
            </div>
        </div>
        </div>
    )

}

export default Footer;