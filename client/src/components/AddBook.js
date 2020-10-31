import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Card,CardTitle, CardText,CardBody, CardLink, CardHeader, CardFooter,CardImg ,Row, Col } from 'reactstrap';
//importing axios instance
import instance from '../axios';
import AppNavBar from './navbar.js';
import AddBookNavbar from './AddBookNavbar'
import {
    Container,Button
} from 'reactstrap';
import { Redirect } from 'react-router-dom';


class AddBook extends Component{
    constructor(props){
        super(props)
        this.state={
            addbookform:true,
            booktitle:"",
            bookauthor:"",
            bookpublisher:"",
            allresults:[],
            finalarr:[],
            showresults:false,
            backtohome:false,
            inventorycount:1,
        }
    }

    handleshowaddbookform=()=>{
        this.setState({
            addbookform:true
        })
    }

    handlecloseaddbookform=()=>{
        this.setState({
            addbookform:false
        })
    }

    handleinputchangeaddbook=(event)=>{
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    chunk = (arr, chunkSize = 1, cache = []) => {
        const tmp = [...arr];
        if (chunkSize <= 0) return cache
        while (tmp.length) cache.push(tmp.splice(0, chunkSize))
        return cache
      }

    handlesubmitaddbook=(event)=>{
        event.preventDefault();
        const url = "https://www.googleapis.com/books/v1/volumes?q="
        let x1 = this.state.booktitle;
        if(x1===""){
            alert("Please enter Book Title name");
        }
        else{
            let rx1 = x1.replaceAll(" ","+");
            let x2 = this.state.bookauthor;
            let rx2= x2.replaceAll(" ","+");
            let x3 = this.state.bookpublisher;
            let rx3 = x3.replaceAll(" ","+");
            let ur1="", ur2="", ur3="";
            let furi="";
            furi = furi+url;
            if(rx1!==""){
                ur1 = "intitle:"+rx1;
                //ur1="Fundamentals+of+programming";
                furi = furi+ur1;
            }
            if(rx2!==""){
                ur2 = "inauthor:"+rx2;
                furi = furi+"+"+ur2
            }
            if(rx3!==""){
                ur3 = "inpublisher:"+rx3;
                furi = furi+"+"+ur3;
            }
            //let k = "AIzaSyCeUVLi-7wSrosOtX7HNosszvYBqB6vu_U";
            furi = furi+"&key=yourApIKey";
            console.log(ur1);
            console.log(ur2);
            console.log(ur3);
            console.log(furi);
            instance.get(furi).then((res)=>{
                console.log(res.data.items);
                this.setState({
                    allresults:res.data.items
                });
                const cache = this.chunk(this.state.allresults,4);
                console.log(cache);
                this.setState({
                    finalarr:cache,
                    showresults:true,
                })
                


            }).catch(err=>{
                if(err) throw err;
            })
            this.handlecloseaddbookform();


        }
    }

    backtobeginning=()=>{
        this.setState({
            addbookform:true,
            booktitle:"",
            bookauthor:"",
            bookpublisher:"",
            allresults:[],
            finalarr:[],
            showresults:false,
            backtohome:false,
            inventorycount:1,
        })
    }
    addbookbackend=(bid)=>{
        //event.preventDefault();
        for(let i=0;i<10;i++){
            let z = this.state.allresults[i]
            if(z.id===bid){
                const userdata={
                    id:bid,
                    title:z.volumeInfo.title,
                    authors:z.volumeInfo.authors,
                    publisher:z.volumeInfo.publisher,
                    published_date:z.volumeInfo.publishedDate,
                    description:z.volumeInfo.description,
                    thumbnail:z.volumeInfo.imageLinks.thumbnail,
                    count: this.state.inventorycount,


                }
                instance.post('/api/books/add',userdata).then(res=>{
                    this.setState({
                        booktitle:"",
                        bookauthor:"",
                        bookpublisher:"",
                        
                    })
                    alert(`Book added successfully Your Book Id is ${res.data._id}`);
                    
                })
                
            }
        }
    }

    render(){
        return(
            <div>
            <AppNavBar/>
            <Container>
            <Modal show={this.state.addbookform} onHide={this.handlecloseaddbookform}>
                    <Modal.Header>
                    <Modal.Title>Enter Book Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                           
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Book Title:</Form.Label>
                                <Form.Control type="text" name="booktitle" value={this.state.booktitle} onChange={this.handleinputchangeaddbook}  placeholder="Enter Book Title" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Book Author:</Form.Label>
                                <Form.Control type="text" name="bookauthor" value={this.state.bookauthor} onChange={this.handleinputchangeaddbook}  placeholder="Multiple authors separated with commas" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Book Title:</Form.Label>
                                <Form.Control type="text" name="bookpublisher" value={this.state.bookpublisher} onChange={this.handleinputchangeaddbook}  placeholder="Enter Book Publisher" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Number of Books:</Form.Label>
                                <Form.Control type="number" name="inventorycount" value={this.state.inventorycount} onChange={this.handleinputchangeaddbook}  placeholder="Enter Book Publisher" />
                            </Form.Group>
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button outline color="danger" className="mb-10" size="sm" onClick={this.handlecloseaddbookform}>
                        Close
                    </Button>
                    <Button outline color="primary" className="mb-10" size="sm" onClick={this.handlesubmitaddbook}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>
                {this.state.addbookform?"":(<AddBookNavbar temp="ali" closeform = {()=>this.backtobeginning()}/>)}
                

                
            
            {this.state.finalarr.map((eachrow)=>{
                return(
                    <Row xs="4" style={{marginBottom:10}}>
                        {eachrow.map((eachvalue)=>(
                            <Col >
                        <Card key={eachvalue.id}>
    
                        <CardImg top width="100%" height="200px" src={eachvalue.volumeInfo.imageLinks.thumbnail} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle height="100px">Title: {eachvalue.volumeInfo.title}</CardTitle>
                                    <CardText height="50px">Author: {eachvalue.volumeInfo.authors}</CardText>
                                    <CardText height="50px">Publisher: {eachvalue.volumeInfo.publisher}</CardText>
                                    
                                
                                
                                <Button
                                    className="remove-btn"
                                    color="primary"
                                    size="sm"
                                    onClick={()=>this.addbookbackend(eachvalue.id)}
                                >Add Book</Button>
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

export default AddBook;