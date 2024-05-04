import {Form} from "react-bootstrap";

export default function PaginationSizeSelect({handleSelect}) {

    return (
        <Form>
            <Form.Select onChange={(e) => {
                handleSelect(e);
            }}>
                <option selected={true} disabled={true}>Sorok Száma oldalanként</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="all">Összes Elem</option>
            </Form.Select>
        </Form>
    )
}
