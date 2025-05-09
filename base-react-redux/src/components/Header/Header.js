import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { toast } from 'react-toastify';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(doLogout());
        toast.success("Log out success")
        navigate('/')
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="/">Minh Quân</Navbar.Brand> */}
                <NavLink to="/" className="navbar-brand">
                    Minh Quân
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/users" className="nav-link">
                            User
                        </NavLink>
                        <NavLink to="/admins" className="nav-link">
                            Admin
                        </NavLink>
                        {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="users">User</Nav.Link>
            <Nav.Link href="admins">Admin</Nav.Link> */}
                    </Nav>
                    <Nav>
                        {/* <NavLink to='/login'>
            <button className='btn-login'>Log in</button>
            </NavLink> */}
                        {isAuthenticated === false ? 
                            <>
                                <button className="btn-login" onClick={() => handleLogin()}>Log in</button>
                                <button className="btn-signup" onClick={() => navigate("/signup")}>Sign up</button>
                            </>
                            : 
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>handleLogout()}>Log out</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
