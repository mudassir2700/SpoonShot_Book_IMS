import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Card,CardTitle, CardText,CardBody, CardLink, CardHeader, CardFooter,CardImg, Row, Col } from 'reactstrap';
import instance from '../axios.js';

//importing components
import BookListLinkNavBar from './LinkNavbar'

//import Redirect
import { Redirect, withRouter } from "react-router-dom";
import { browserHistory } from 'history'

import Modal from 'react-bootstrap/Modal';
import {Form, FormControl,Nav,Navbar} from'react-bootstrap';
import Axios from 'axios';
//import Col from 'react-bootstrap/Col';

class BookList extends Component{
    constructor(props){
        super(props);
        this.state={
            books:[],
            showform:false,
            updateform:false,
            deleteform:false,
            passsword:" ",
            addbooklogin:false,
            allresults:[],
            finalarr:[],
            updateformpass:" ",
            updateforminventory:1,
            updateformaction:"add",
            updateformbookid:"",
            deleteformpass:"",
            deleteformid:"",
            searchformdict:{},
            searchvalue:"",
            searchresults:[],
            searchredirect:false,
            finalsearchres:[],

        }
    }

    
    componentDidMount(){
        this.getallbooks();
    }

    handlecloseform=()=>{
        this.setState({
            showform:false
        })
    }

    handleshowupdateform=()=>{
        this.setState({
            updateform:true
        })
    }
    handlecloseupdateform=()=>{
        this.setState({
            updateform:false,
            updateformpass:" ",
            updateforminventory:1,
            updateformaction:"",
            updateformbookid:"",

        })
    }

    handleshowdeleteform=()=>{
        this.setState({
           deleteform:true
        })
    }
    handleclosedeleteform=()=>{
        this.setState({
           deleteform:false,
           deleteformpass:"",
           deleteformid:"",

        })
    }

    handleinputchange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,
        })
    }

    

    addbookitem=(event)=>{
        event.preventDefault();
        let ps = this.state.password;
        if(ps!==""){
            console.log(ps);
            if(ps!=="ali123" && ps !==""){
                alert("Invalid Password");
            }
            else{
                this.handlecloseform();
                this.setState({
                    passsword:"",
                    addbooklogin:true
                })
            }

        }
        
        
    }

    modaltoggle=()=>{
        this.setState({
            showform:!this.showform
        })
    }

    

    chunk = (arr, chunkSize = 1, cache = []) => {
        const tmp = [...arr];
        if (chunkSize <= 0) return cache
        while (tmp.length) cache.push(tmp.splice(0, chunkSize))
        return cache
      }

      chunk1 = (arr, chunkSize = 1, cache = []) => {
        const tmp = [...arr];
        if (chunkSize <= 0) return cache
        while (tmp.length) cache.push(tmp.splice(0, chunkSize))
        return cache
      }

    getallbooks = ()=>{
        //console.log("api running");
        instance.get('/api/books').then(res=>{
            //console.log(res.data);
            this.setState({
                allresults: res.data
            })
            const cache = this.chunk(this.state.allresults,4);
                //console.log(cache);
                this.setState({
                    finalarr:cache,
                })

            //console.log(this.state.books);
        }).catch(err=>console.log(err));
    }

    handlesubmitupdateform=(event)=>{
        event.preventDefault();
        let ps = this.state.updateformpass;
        if(ps!==""){
            //console.log(ps);
            if(ps!=="ali123" && ps !==""){
                alert("Invalid Password");
            }
            
            else{
                
                let id = this.state.updateformbookid;
                let url = "/api/books/updateinventory/"+id;
                let userdata={
                    count:this.state.updateforminventory,
                    action:this.state.updateformaction.toLowerCase(),
                }
                instance.post(url,userdata).then(res=>{
                    
                    //console.log(res.data);
                    if(res.data==="null"){
                        alert("Invalid Book Id");
                    }
                    else{
                        this.handlecloseupdateform();
                        this.setState({
                            updateformpass:" ",
                            updateforminventory:1,
                            updateformaction:"",
                            updateformbookid:"",
                            
                        })
                        alert("Inventory updated successfully");
                        this.getallbooks();

                    }
                }).catch(err=>{
                    if(err){
                        throw(err);
                    }
                    
                })
                
            }

        }

    }

    handlesubmitdeleteform=(event)=>{
        event.preventDefault();
        let ps = this.state.deleteformpass;
        if(ps!==""){
            //console.log(ps);
            if(ps!=="ali123" && ps !==""){
                alert("Invalid Password");
            }
            else{
                
                let id = this.state.deleteformid;
                let url = "/api/books/deleteinventory/"+id;
                //console.log(url);
                
                instance.post(url).then(res=>{
                    
                    //console.log(res.data);
                    if(res.data==="null"){
                        alert("Invalid Book Id");
                    }
                    else{
                        this.handleclosedeleteform();
                        this.setState({
                            deleteformpass:" ",
                            deleteformid:"",
                            
                        })
                        alert("Inventory deleted successfully");
                        this.getallbooks();

                    }
                }).catch(err=>{
                    if(err){
                        throw(err);
                    }
                    
                })
                
            }

        }

    }

    handlesubmitsearchform=(event)=>{
        event.preventDefault();

        instance.get('/api/books').then(res=>{
            //console.log(res.data.length);
            let ud = {}
            
            for(let i=0;i<res.data.length;i++){
                ud[[res.data[i].title,res.data[i].author]] = res.data[i].count;
                //console.log("Inside for loop");
                
            }
            this.setState({
                searchformdict:ud
            });
            

        }).catch(err=>{
            if(err) throw err;
        });
        const url = "https://www.googleapis.com/books/v1/volumes?q="
        let x1=  this.state.searchvalue;
        let rx1 = x1.replaceAll(" ","+");
        const fur1 = url+rx1+"&key=AIzaSyCeUVLi-7wSrosOtX7HNosszvYBqB6vu_U&maxResults=10";

        instance.get(fur1).then(res=>{
            //console.log(res.data.items);
            this.setState({
                searchresults:res.data.items,
            })
            const cac = this.chunk1(this.state.searchresults,4);
            //console.log("cache");
            //console.log(cache);
            this.setState({
                finalsearchres:cac,
                searchredirect:true,

            })
        }).catch(err=>{
            if(err) throw err;
        })


    }
    render(){
        if(this.state.addbooklogin){
            this.setState({
                addbooklogin:false
            });
            return <Redirect to='/addbook' />

        }
        if(this.state.searchredirect){
            //console.log(this.state.finalsearchres);
            return <Redirect to={{
                pathname:"/searchbook",
                state:{fs:this.state.finalsearchres,dbvalues:this.state.searchformdict}
            }}/>
        }

        
        
        return(
            <div>
                <Modal show={this.state.showform} onHide={this.modaltoggle}>
                    <Modal.Header>
                    <Modal.Title>Enter Admin Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                           
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Your Password:</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleinputchange}  placeholder="Enter Password" />
                            </Form.Group>
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button outline color="danger" className="mb-10" size="sm" onClick={this.handlecloseform}>
                        Close
                    </Button>
                    <Button outline color="primary" className="mb-10" size="sm" onClick={this.addbookitem}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.updateform} onHide={this.handlecloseupdateform}>
                    <Modal.Header>
                    <Modal.Title>Update Inventory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                           
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Your Password:</Form.Label>
                                <Form.Control type="password" name="updateformpass" value={this.state.password} onChange={this.handleinputchange}  placeholder="Enter Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Book Id:</Form.Label>
                                <Form.Control type="text" name="updateformbookid" value={this.state.updateformbookid} onChange={this.handleinputchange}  placeholder="Enter Book Id" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Number of Books:</Form.Label>
                                <Form.Control type="number" name="updateforminventory" value={this.state.updateforminventory} onChange={this.handleinputchange}  placeholder="Enter No of books to be added or removed" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Action:</Form.Label>
                                <Form.Control type="text" name="updateformaction" value={this.state.updateformaction} onChange={this.handleinputchange}  placeholder="Enter 'add' to add to inventory or 'remove' to remove from inventory " />
                            </Form.Group>
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button outline color="danger" className="mb-10" size="sm" onClick={this.handlecloseupdateform}>
                        Close
                    </Button>
                    <Button outline color="primary" className="mb-10" size="sm" onClick={this.handlesubmitupdateform}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.deleteform} onHide={this.handleclosedeleteform}>
                    <Modal.Header>
                    <Modal.Title>Delete Inventory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                           
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Your Password:</Form.Label>
                                <Form.Control type="password" name="deleteformpass" value={this.state.deleteformpass} onChange={this.handleinputchange}  placeholder="Enter Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Book Id:</Form.Label>
                                <Form.Control type="text" name="deleteformid" value={this.state.deleteformid} onChange={this.handleinputchange}  placeholder="Enter Book Id" />
                            </Form.Group>
                            
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button outline color="danger" className="mb-10" size="sm" onClick={this.handleclosedeleteform}>
                        Close
                    </Button>
                    <Button outline color="primary" className="mb-10" size="sm" onClick={this.handlesubmitdeleteform}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>
                
            <Container>
            
            <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">IMS</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link onClick={this.modaltoggle}>Add Book</Nav.Link>
                    <Nav.Link onClick={this.handleshowupdateform}>Update Inventory</Nav.Link>
                    <Nav.Link onClick={this.handleshowdeleteform}>Delete Inventory</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" name="searchvalue" value={this.state.searchvalue} onChange={this.handleinputchange} placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info" onClick={this.handlesubmitsearchform}>Search</Button>
                    </Form>
                    
            </Navbar>

                
                {this.state.finalarr.map((eachrow)=>{
                return(
                    <Row xs="4" style={{marginBottom:10,marginTop:20}}>
                        {eachrow.map((eachvalue)=>(
                            <Col >
                        <Card key={eachvalue.id}>
                        <CardHeader>
                            <div>
                                <div>
                                {eachvalue.count>0?("Available "):"Not Available"}
                                </div>
                                <div>
                                 {eachvalue._id}
                                </div>
                            </div>
                            
                        </CardHeader>
    
                        <CardImg top width="100%" height="200px" src={eachvalue.thumbnail} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle height="100px">Title: {eachvalue.title}</CardTitle>
                                    <CardText height="50px">Author: {eachvalue.author}</CardText>
                                    <CardText height="50px">Publisher: {eachvalue.publisher}</CardText>
                                    
                                </CardBody>
                                
                                </Card>
                            </Col>

                        ))}
                        
                    </Row>
                )
            })}
            </Container>
            </div>
            
        )
    }
    
}
export default BookList;