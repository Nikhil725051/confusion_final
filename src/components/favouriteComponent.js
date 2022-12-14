import React, {component} from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import {Loading} from './LoadingComponent';


function RenderMenuItem({dish, deleteFavourite}){
    return(
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl+dish.image} alt={dish.name}></Media>
                <Media body className='ml-5'>
                    <Media heading>{dish.name}</Media>
                    <p>{dish.description}</p>
                    <Button outline color='danger' onClick={deleteFavourite(dish._id)}>
                        <span className='fa fa-times'></span>
                    </Button>
                </Media>
            </Media>
        </Media>
    );
}

const Favourites = (props) => {
    if(props.favourites.isLoading){
        return (
            <div className='container'>
                <div className='row'>
                    <Loading></Loading>
                </div>
            </div>
        );
    }else if(props.favourites.errMess){
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.favourites.errMess}</h4>
                </div>
            </div>
        );
    }else if(props.favourites.favourites){
        const favourites = props.favourites.favourites.dihses.map((dish) => {
           return (
            <div key={dish._id} className="col-12 mt-5">
                <RenderMenuItem dish={dish} deleteFavourite = {props.deleteFavourite}></RenderMenuItem>
            </div>
           );
        });
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                      <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                      <BreadcrumbItem active>My Favourites</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>My Favourites</h3>
                        <hr />
                    </div>
                    <div className='row'>
                        <Media list>
                            {favourites}
                        </Media>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div className='container'>
                <div className='row'>
                    <h4>You have no favourites</h4>
                </div>
            </div>
        );
    }
}

export default Favourites;