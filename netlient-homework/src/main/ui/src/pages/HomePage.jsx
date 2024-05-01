import {Button, Card, CardBody, Collapse, Form, Spinner} from "react-bootstrap";
import React, {useState, useSyncExternalStore} from "react";
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] =useState(false)
    const [wrongInput, setWrongInput] =useState(false)
    const navigate = useNavigate();

    async function handleSubmit(){
        setLoading(true);
        const exist = await authenticateUser();
        if(exist){
            navigate("/data");
        }else{
            setWrongInput(true);
            setLoading(false);
        }
    }
    async function authenticateUser() {
        const response = await fetch("api/user/auth", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: userName , password})
        });
        const exists = await response.json();
        return exists;
    }


    return (
            <div className={"flexbox center"}>
                <Card id="login-card" style={{width: '20rem'}}>
                    <CardBody>
                        <Form style={{textAlign : "center"}} className="d-flex flex-column justify-content-center">
                            <Form.Group className="mb-3" controlId="username-input">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email" placeholder="My-Username" onChange={(e)=> setUserName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password-input">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="******" onChange={(e)=> setPassword(e.target.value)} />
                            </Form.Group>
                                 <Button onClick={handleSubmit} style={{marginTop: "15px", marginBottom: "10px", backgroundColor: "#6F42F2"}}>
                                     Log in
                                     <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    style={{marginLeft: "5px"}}
                                    hidden={!loading}
                                /></Button>
                                <Collapse in={wrongInput}>
                                    <div style={{color : "red"}}>
                                        Check the fields again!
                                    </div>
                                </Collapse>
                        </Form>
                    </CardBody>
                </Card>

            </div>
    )
}
