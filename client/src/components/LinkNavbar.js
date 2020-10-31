import React, {Component} from 'react';
import {Form, FormControl,Nav,Navbar,Button} from'react-bootstrap';




class BookListLinkNavbar extends Component{
    constructor(props){
        super(props);
        
        
    }
   
    render(){
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">IMS</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Add Book</Nav.Link>
                    <Nav.Link href="#features">Update Inventory</Nav.Link>
                    <Nav.Link href="#pricing">Delete Inventory</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Form>
                    
                </Navbar>
            </div>
        )
    }
}
export default BookListLinkNavbar; 