import {Pagination} from "react-bootstrap";

export default function PageNavigation({items, setPageNumber}) {
    return (
        <div>
            <Pagination style={{maxWidth: "fit-content", margin: "10px"}}
                        onClick={(e) => setPageNumber(Number(e.target.innerText[0]) - 1)}>
                {items.map((e,i) => (
                <div key={`pagination-item-${i}`} >
                    {e}
                </div>
            ))}</Pagination>
        </div>
    )
}
