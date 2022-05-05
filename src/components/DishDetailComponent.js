import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle} from "reactstrap";


    function DishDetail(props){
        return (<div className="container">
            {renderDish(props.dish)}
        </div>);
    }

    function renderComments(comments){

        if(comments!=null)
        {
            return (<div>
                {comments.map((dishComment)=>{
                    return(<ul className="list-unstyled">
                        <li>{dishComment.comment}</li>
                        <li>--{dishComment.author}, {new Date(dishComment.date).toDateString()}</li>
                    </ul>)
                })}
            </div>);
        }
        else{
            return(<div></div>);
        }

    }

   function renderDish(dish){
        if(dish!=null)
        {
            return(<div className="row">
                <div className="col-12 col-md-5 m-1">
                <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
            <div className="col-12 col-md-5">
                <h2>Comments</h2>
                {renderComments(dish.comments)}
            </div>
            </div>
            
           );
        }else
        {
            return(<div></div>);
        }
    }

export default DishDetail;