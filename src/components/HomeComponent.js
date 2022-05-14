import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';

function Home(props) {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md col-12 m-1">
            <RenderCard item={props.dish}></RenderCard>
          </div>
          <div className="col-md col-12 m-1">
            <RenderCard item={props.promotion}></RenderCard>
          </div>
          <div className="col-md col-12 m-1">
            <RenderCard item={props.leader}></RenderCard>
          </div>
        </div>
      </div>
    );
}

function RenderCard({item}){
 return (
  <Card>
  <CardImg src={item.image} alt={item.name}></CardImg>
  <CardBody>
    <CardTitle>{item.name}</CardTitle>
    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
    <CardText>{item.description}</CardText>
  </CardBody>
</Card>
 );
}

export default Home;   