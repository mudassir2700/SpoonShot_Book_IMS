import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Button
} from 'reactstrap';



class AddBookNavbar extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false
        }
        console.log(this.props.temp);
    }
    toggle = ()=>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                    <NavbarBrand href="/">Home</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button color="link" onClick={this.props.closeform} >
                                    Add Another Book

                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
export default AddBookNavbar; 