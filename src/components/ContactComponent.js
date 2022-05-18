import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Button, Label, Col, FormFeedback } from 'reactstrap';
import {Link} from 'react-router-dom';

class Contact extends Component{
    
    constructor(props){
        super(props);
        this.state={
            firstName:"",
            lastName:"",
            telNum:"",
            email:"",
            agree:false,
            ContactType:"Tel.",
            message:"",
            touched:{
                firstName:false,
                lastName:false,
                telNum:false,
                email: false
            }
        };

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
    }

    handleSubmit(event){
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    handleInputChange(event){
        const target=event.target;
        const value=target.type==='checkbox' ? target.checked : target.value;
        const name=target.name;
        this.setState({
            [name]: value
        });
    }

    handleBlur= (field)=>(evt)=>{
       
        this.setState({
            touched:{...this.state.touched, [field]:true}
        });
       
    }

    validate(firstName, lastName, telNum, email){
        const errors={
            firstName: '',
            lastName: '',
            telNum: '',
            email: '',
        }
        if (this.state.touched.firstName && firstName.length < 3)
        errors.firstName = 'First Name should be >= 3 characters';
        else if (this.state.touched.firstName && firstName.length > 10)
        errors.firstName = 'First Name should be <= 10 characters';

        if (this.state.touched.lastName && lastName.length < 3)
        errors.lastName = 'Last Name should be >= 3 characters';
        else if (this.state.touched.lastName && lastName.length > 10)
        errors.lastName = 'Last Name should be <= 10 characters';

       const reg = /^\d+$/;
        if (this.state.touched.telNum && !reg.test(telNum))
        errors.telNum = 'Tel. Number should contain only numbers';

        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
        errors.email = 'Email should contain a @';

        console.log(JSON.stringify(errors));

        return errors;
    }



    render(){

        const errors=this.validate(this.state.firstName, this.state.lastName, this.state.telNum, this.state.email);
        return(
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                      <BreadcrumbItem><Link to="/Home">Home</Link></BreadcrumbItem>
                      <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Contact Us</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a href='https://www.skype.com/en/' role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className='row row-content'>
                    <div className='col-12'>
                        <h3>Send us your feedback</h3>
                        <div className='col-12 col-md-9'>
                            <Form  onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor='firstName' md={2}>First Name</Label>
                                    <Col md={10}>
                                        <Input type='text' id='firstName' name='firstName' placeholder='First Name' value={this.state.firstName} onChange={this.handleInputChange} onBlur={this.handleBlur('firstName')} valid={errors.firstName===''} invalid={errors.firstName!==''}></Input>
                                        <FormFeedback>{errors.firstName}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='lastName' md={2}>Last Name</Label>
                                   <Col md={10}>
                                   <Input type='text' id='lastName' placeholder='Last Name' name='lastName' value={this.state.lastName} onChange={this.handleInputChange} onBlur={this.handleBlur('lastName')} valid={errors.lastName===''} invalid={errors.lastName!==''}></Input>
                                   <FormFeedback>{errors.lastName}</FormFeedback>
                                   </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='telNum' md={2}>Contact Tel.</Label>
                                    <Col md={10}>
                                        <Input type='tel' id='telNum' name='telNum' placeholder='Tel. Number' value={this.state.telNum} onChange={this.handleInputChange} onBlur={this.handleBlur('telNum')} valid={errors.telNum===''} invalid={errors.telNum!==''}></Input>
                                        <FormGroup>{errors.telNum}</FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='email' md={2}>Email</Label>
                                    <Col md={10}>
                                        <Input type='email' id='email' name='email' placeholder='Email' value={this.state.email} onChange={this.handleInputChange} onBlur={this.handleBlur('email')} valid={errors.email===''} invalid={errors.email!==''}></Input>
                                        <FormGroup>{errors.email}</FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size: 6, offset: 2}}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type='checkbox' name='agree' checked={this.state.agree} onChange={this.handleInputChange}></Input>
                                                <strong>May we contact you?</strong>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={{size: 3, offset: 1}}>
                                        <Input style={{width: '100%'}}   type='select' name='contactType' value={this.state.ContactType} onChange={this.handleInputChange}>
                                           <option>Tel.</option>
                                           <option>Email</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor='message' md={2}>Your feedback</Label>
                                    <Col md={10}>
                                    <Input type='textarea' id='message' name='message' value={this.state.message} rows="12" onChange={this.handleInputChange} ></Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size: 10, offset: 2}}>
                                        <Button type='submit' color='primary'>Send Feedback</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;