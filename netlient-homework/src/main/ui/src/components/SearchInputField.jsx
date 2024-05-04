import {FloatingLabel, Form} from "react-bootstrap";

export default function SearchInputField({setSearchInput}) {


    return (
        <Form style={{margin : "8px"}}>
            <Form.Group className="mb-3" controlId="search-input">
                <FloatingLabel
                    controlId="floating-search"
                    label="Keresés"
                    className="mb-3"
                >
                    {/*toLowerCase is necessary, because of a bug in Springs IgnoreCase method. Sometimes it does not ignore the uppercases. It's used in DataRepository : 10.row*/}
                    <Form.Control onChange={(e) => setSearchInput(e.target.value.toLowerCase())} type="text"
                                  placeholder="Keresés"/>
                </FloatingLabel>
            </Form.Group>
        </Form>
    )
}
