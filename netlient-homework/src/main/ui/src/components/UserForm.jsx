import {Form} from "react-bootstrap";
import React from "react";

export default function UserForm({setUserName, setPassword}) {

    return (
        <div>
            <Form.Group className="mb-3" controlId="username-input">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="My-Username"
                              onChange={(e) => setUserName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password-input">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="******"
                              onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
        </div>
    )
}
