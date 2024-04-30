import {Outlet} from "react-router-dom";
import {Navbar} from "react-bootstrap";

function NavBar () {



    return (
        <>
            <Navbar style={{backgroundColor : "#FFF4E8FF", fontSize: 44, margin: 0, padding:0}}>Netlient Homework - Gágó Róbert</Navbar>

            <Outlet/>
        </>
    )


}
export default NavBar;
