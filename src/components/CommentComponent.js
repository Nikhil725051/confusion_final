import { Component } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";


const required = (val) => val && val.length;
const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length<=len;

class Comment extends Component{


    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }
    }

    toggleModal(){
        this.setState({isModalOpen : !this.state.isModalOpen});
    }

    handleFormSubmit(values){
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render(props){
        return (<div>
            <Button color="secondry" outline onClick={()=>{this.toggleModal()}}><i className="fa fa-pencil"></i> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={()=>{this.toggleModal()}}>
                <ModalHeader toggle={()=>{this.toggleModal()}}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleFormSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" xs={12}>Rating</Label>
                            <Col xs={12}>
                              <Control.select model=".rating" name="rating" className="form-control">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                              </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" xs={12}>Your Name</Label>
                            <Col>
                              <Control.text 
                              model=".name" 
                              id="name" 
                              name="name" 
                              className="form-control" 
                              placeholder="Your Name"
                              validators={{
                                  required, minLength: minLength(3), maxLength: maxLength(15)
                              }}></Control.text>
                              <Errors 
                              show="touched"
                              className="text-danger"
                              model=".name"
                              messages={{
                                  required : "Required ",
                                  minLength : "Must be greater than 2 characters",
                                  maxLength : "Must be 15 characters or less" 
                              }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" xs={12}>Comment</Label>
                           <Col xs={12}>
                           <Control.textarea model=".comment" id="comment" name="comment" rows={6} className="form-control"></Control.textarea>
                           </Col>
                        </Row>
                        <Row className="form-group">
                            <Col xs={12}>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>);
    }
}

export default Comment;