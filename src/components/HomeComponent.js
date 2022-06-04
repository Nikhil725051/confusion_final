import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import {FadeTransform} from "react-animation-components"

function Home(props) {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md col-12 m-1">
            <RenderCard item={props.dish} isLoading={props.dishesLoading} errMess={props.errMess}></RenderCard>
          </div>
          <div className="col-md col-12 m-1">
            <RenderCard item={props.promotion} isLoading={props.promoLoading} errMess={props.promoErrMess}></RenderCard>
          </div>
          <div className="col-md col-12 m-1">
            <RenderCard item={props.leader}></RenderCard>
          </div>
        </div>
      </div>
    );
}

function RenderCard({item, isLoading, errMess}){

  if(isLoading){
   
    return (
      <Loading></Loading>
    );
  }else if(errMess){
    return (
      <h4>{errMess}</h4>
    );
  }else{
    return (
      <FadeTransform in
                      transformProps = {{
                        exitTransform : "scale(0.5) translateY(-50%)"
                      }}>
       <Card>
        <CardImg src={baseUrl + item.image} alt={item.name}></CardImg>
        <CardBody>
         <CardTitle>{item.name}</CardTitle>
         {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
         <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
     );
  }

}

export default Home;   