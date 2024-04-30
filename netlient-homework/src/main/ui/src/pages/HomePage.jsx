import {Button, Card, CardBody, Form} from "react-bootstrap";
import React from "react";


export default function HomePage() {
    return (
            <div className={"flexbox center"}>
                <Card id="login-card" style={{width: '20rem'}}>
                    <CardBody>
                        <Form style={{textAlign : "center"}} className="d-flex flex-column justify-content-center">
                            <Form.Group className="mb-3" controlId="username-input">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email" placeholder="My-Username"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password-input">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="******"/>
                            </Form.Group>

                            <Button style={{marginTop : "15px", marginBottom: "10px", backgroundColor : "#6F42F2"}}>Log in</Button>
                        </Form>
                    </CardBody>
                </Card>

            </div>
    )
}
