import Highlighter from "react-highlight-words";
import {Table} from "react-bootstrap";

export default function DataBaseTable ({dataList, sortTable, searchInput}) {


    return (
        <Table style={{marginTop:"0",marginBottom:"0"}} striped bordered hover variant="dark">
            <thead>
            <tr>
                <th onClick={() => {
                    sortTable("id")
                }} id="id">Cikkszám
                </th>
                <th onClick={() => {
                    sortTable("name")
                }} id="name">Cikk Megnevezése
                </th>
                <th id="price" onClick={() => {
                    sortTable("price")
                }}>Nettó Ár
                </th>
                <th onClick={() => {
                    sortTable("vat")
                }} id="vat">Áfa
                </th>
            </tr>
            </thead>
            <tbody>
            {dataList?.map((record) => (
                <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[`${searchInput}`]}
                            caseSensitive={false}
                            autoEscape={true}
                            textToHighlight={`${record.name}`}
                            highlightStyle={{backgroundColor: "#f5bc42"}}
                        />
                    </td>
                    <td>{record.price}</td>
                    <td>{record.vat}</td>

                </tr>

            ))}
            </tbody>
        </Table>
    )
}
