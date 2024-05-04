import {Button, Card, CardBody, Form, Spinner} from "react-bootstrap";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import UserForm from "../components/UserForm.jsx";
import CollapseMessage from "../components/CollapseMessage.jsx";

export default function HomePage() {
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showWrongInputMessage, setShowWrongInputMessage] = useState(false);
    const [showRegisterMessage, setShowRegisterMessage] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit() {
        setLoading(true);
        const exist = await authenticateUser();
        if (exist) {
            navigate("/data");
        } else {
            setShowWrongInputMessage(true);
            setLoading(false);
        }
    }

    async function authenticateUser() {
        const response = await fetch("api/user/auth", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: userName, password})
        });
        const exists = await response.json();
        return exists;
    }

    async function registerUser() {
        const response = await fetch("api/user/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: userName, password})
        });
        if(response.ok){
            setShowRegisterMessage(true);
            setShowWrongInputMessage(false);
        }

    }


    return (
        <div className={"flexbox center"}>
            <Card id="login-card" style={{width: '20rem'}}>
                <CardBody>
                    <Form style={{textAlign: "center"}} className="d-flex flex-column justify-content-center">

                        <UserForm
                            setUserName={setUserName}
                            setPassword={setPassword}
                        />

                        <Button onClick={handleSubmit}
                                style={{marginTop: "15px", marginBottom: "10px", backgroundColor: "#6F42F2"}}>
                            Bejelentkezés
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                style={{marginLeft: "5px"}}
                                hidden={!loading}
                            /></Button>

                        <Button type={"submit"} style={{backgroundColor: "#6d3ef8"}} onClick={(e) => {
                            e.preventDefault();
                            registerUser();
                        }}>Regisztráció</Button>

                        <CollapseMessage
                            wrongInput={showWrongInputMessage}
                            registerMessage={showRegisterMessage}
                        />
                    </Form>
                </CardBody>
            </Card>

        </div>
    )
}
