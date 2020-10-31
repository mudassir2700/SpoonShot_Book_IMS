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



class SearchBook extends Component{
    constructor(props){
        super(props)
        console.log(this.props.location.state.fs);
        console.log(this.props.location.state.dbvalues);
        this.state={
            finalarr:this.props.location.state.fs,
            dbvalues:this.props.location.state.dbvalues,
        }
    }

    

    

    

    
    

    render(){
        return(
            <div>
            <AppNavBar/>
            <Container>
                
            {this.state.finalarr.map((eachrow)=>{
                return(
                    <Row xs="4" style={{marginBottom:10}}>
                        {eachrow.map((eachvalue)=>(
                            <Col >
                        <Card key={eachvalue.id}>
                        <CardHeader>
                            <div>
                                <div>
                                {this.state.dbvalues[[eachvalue.volumeInfo.title,eachvalue.volumeInfo.authors]]>0?"Available":"Not Available"}
                                </div>
                                
                            </div>
                            
                        </CardHeader>
    
                        <CardImg top width="100%" height="200px" src={eachvalue.volumeInfo.imageLinks.thumbnail} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle height="100px">Title: {eachvalue.volumeInfo.title}</CardTitle>
                                    <CardText height="50px">Author: {eachvalue.volumeInfo.authors}</CardText>
            
                                    <CardText height="50px">Publisher: {eachvalue.volumeInfo.publisher}</CardText>
                                    
                                
                                
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

export default SearchBook;