import {Collapse} from "react-bootstrap";
import React from "react";

export default function CollapseMessage({wrongInput,registerMessage}) {
    return (
        <>
            <Collapse in={wrongInput}>
                <div style={{color: "#8d0000", fontWeight: "bold"}}>
                    Ellenőrízd a megadott adatokat!
                </div>
            </Collapse>
            <Collapse in={registerMessage}>
                <div style={{color: "green", fontWeight: "bold"}}>
                    Sikeresen Regisztrálva!
                </div>
            </Collapse>
        </>
    )
}
