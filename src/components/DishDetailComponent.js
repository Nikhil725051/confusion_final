import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardImgOverlay, Button, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import Comment from "./CommentComponent";
import {FadeTransform, Fade, Stagger} from "react-animation-components"




    function DishDetail(props){
        return (<div className="container">
            <div className="row">
                <Breadcrumb>
                  <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props?.dish?.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props?.dish?.name}</h3>
                    <hr/>
                </div>
            </div>
          <div className="row">
          <RenderDish dish={props.dish} favorite={props.favorite} postFavorite={props.postFavorite} />
                        <RenderComments comments={props?.comments}
                            postComment={props.postComment}
                            dishId={props?.dish?._id} />
          </div>
        </div>);
    }

    function RenderComments({comments, dishId, postComment, errMess}){

        if(errMess){
           return (
            <div className="col-12 col-md-5">
            <h4>{errMess}</h4>
        </div>               
           )
        }else{
            if(comments!=null)
            {
                return (<div className="col-12 col-md-5">
                    <h2>Comments</h2>
                    
                     <ul className="list-unstyled">
                      <Stagger in>
                       {comments.map((dishComment)=>{
                         return(
                             <Fade in>
                              <li key={dishComment.id}>
                                <p>{dishComment.comment}</p>
                                <p>--{dishComment.author}, {new Date(dishComment.date).toDateString()}</p>
                              </li>
                            </Fade>
                           )
                       })}
                       </Stagger>
                      </ul>
                   
                    <Comment dishId={dishId} postComment={postComment}></Comment>
                </div>);
            }
            else{
                return(<div></div>);
            }            
        }

    }

    function RenderDish({dish, favourite, postFavorite}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in 
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={baseUrl + dish?.image} alt={dish?.name} />
                        <CardImgOverlay>
                            <Button outline color="primary" onClick={() => favourite ? console.log('Already favorite') : postFavorite(dish?._id)}>
                                {favourite ?
                                    <span className="fa fa-heart"></span>
                                    : 
                                    <span className="fa fa-heart-o"></span>
                                }
                            </Button>
                        </CardImgOverlay>
                        <CardBody>
                            <CardTitle>{dish?.name}</CardTitle>
                            <CardText>{dish?.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );

}

export default DishDetail;