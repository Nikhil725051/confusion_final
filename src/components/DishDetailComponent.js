import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import Comment from "./CommentComponent";



    function DishDetail(props){
        return (<div className="container">
            <div className="row">
                <Breadcrumb>
                  <BreadcrumbItem><Link to="Menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
          <div className="row">
          {RenderDish(props.dish)}
         <RenderComments comments={props.comments} dishId={props.dish.id} addComment={props.addComment} ></RenderComments>
          </div>
        </div>);
    }

    function RenderComments({comments, dishId, addComment}){

        if(comments!=null)
        {
            return (<div className="col-12 col-md-5">
                <h2>Comments</h2>
                {comments.map((dishComment)=>{
                    return(<ul className="list-unstyled">
                        <li>{dishComment.comment}</li>
                        <li>--{dishComment.author}, {new Date(dishComment.date).toDateString()}</li>
                    </ul>)
                })}
                <Comment dishId={dishId} addComment={addComment}></Comment>
            </div>);
        }
        else{
            return(<div></div>);
        }

    }

   function RenderDish(dish){
        if(dish!=null)
        {
                return(<div className="col-12 col-md-5 m-1">
                <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
            
           );
        }else
        {
            return(<div></div>);
        }
    }

export default DishDetail;