import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle} from "reactstrap";

class DishDetail extends Component
{

    render(){
        return (<div className="container">
            {this.renderDish(this.props.dish)}
        </div>)
    }

    renderComments(comments){

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

    renderDish(dish){
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
                {this.renderComments(dish.comments)}
            </div>
            </div>
            
           );
        }else
        {
            return(<div></div>);
        }
    }
}

export default DishDetail;