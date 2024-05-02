import {Button, FloatingLabel, Form, FormGroup, Navbar, Pagination, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import PageNavigation from "../components/PageNavigation.jsx";

export default function DataListPage() {
    const [pageNumber, setPageNumber] = useState(0);
    const [recordPerPage, setRecordPerPage] = useState(25);
    const [dataList, setDataList] = useState([]);
    const [maxPages, setMaxPages] = useState(0);
    const [paginationItems, setPaginationItems] = useState([]);
    const [databaseSize, setDatabaseSize] = useState(0);
    const [sorted, setSorted] = useState(false);
    const [asc, setAsc] = useState(false);
    const [lastCategory, setLastCategory] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [filtered, setFiltered] = useState(false);


    async function fetchDataList() {
        const response = await fetch(`api/adat?page=${pageNumber}&size=${recordPerPage}`);
        const dataArray = await response.json();
        setDataList(dataArray.content);
        setDatabaseSize(dataArray.totalElements);
        setMaxPages(dataArray.totalPages)
        return dataArray
    }

    async function fetchSortedDataList(columnName) {
        const response = await fetch(`api/adat/sorted?page=${pageNumber}&size=${recordPerPage}&asc=${asc}&category=${columnName}`);
        const dataArray = await response.json();
        setDataList(dataArray.content);
        return dataArray
    }

    async function fetchFilteredDataList() {
        const response = await fetch(`api/adat/search?page=${pageNumber}&size=${recordPerPage}&namePart=${searchInput}`);
        const dataArray = await response.json();
        setDataList(dataArray.content);
        setDatabaseSize(dataArray.totalElements);
        setMaxPages(dataArray.totalPages)
        return dataArray
    }

    async function fetchFilteredSortedDataList(columnName) {
        const response = await fetch(`api/adat/search-sorted?page=${pageNumber}&size=${recordPerPage}&asc=${asc}&category=${columnName}&namePart=${searchInput}`);
        const dataArray = await response.json();
        setDataList(dataArray.content);
        return dataArray
    }

    function sortTable(columnName) {
        setAsc(!asc)
        setSorted(true);
        setLastCategory(columnName);
    }

    function createPagination() {
        let items = [];
        for (let i = 0; i < maxPages; i++) {
            items.push(
                <Pagination.Item key={i + 1} active={i + 1 === pageNumber + 1}>
                    {i + 1}
                </Pagination.Item>,
            );
        }
        setPaginationItems(items);
    }

    useEffect(() => {
        if (!filtered) {
            if (!sorted) {
                fetchDataList();
            }else{
                fetchSortedDataList(lastCategory);
            }
        }else{
            if (sorted) {
                fetchFilteredSortedDataList(lastCategory)
            } else {
                fetchFilteredDataList()
            }
        }
        createPagination()
    }, [pageNumber, recordPerPage])

    useEffect(() => {
        if(!filtered){
            if (sorted) {
                fetchSortedDataList(lastCategory);
            }
        }else{
            if (sorted) {
                fetchFilteredSortedDataList(lastCategory)
            } else {
                fetchFilteredDataList()
            }
        }
    }, [asc, lastCategory]);

    useEffect(() => {
        createPagination()
    }, [maxPages])

    useEffect(() => {
        setPageNumber(0)
        if(searchInput.length < 1){
            setFiltered(false);
        }else{
            setFiltered(true);
        }
        if (sorted) {
            fetchFilteredSortedDataList(lastCategory)
        } else {
            fetchFilteredDataList()
        }
    }, [searchInput])

    function handleSizeSelect(e) {
        setPageNumber(0);
        const selectedValue = e.target.value;
        if (selectedValue === "all") {
            setRecordPerPage(databaseSize);
        } else {
            setRecordPerPage(parseInt(selectedValue));
        }
        setSorted(false);
    }

    return (
        <>
            <Navbar>
                {dataList?.length > 0 && <PageNavigation
                    items={paginationItems}
                    setPageNumber={setPageNumber}
                />}
                <Form>
                    <Form.Select onChange={(e) => handleSizeSelect(e)}>
                        <option selected={true} disabled={true}>Sorok Száma oldalanként</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="all">Összes Elem</option>
                    </Form.Select>
                </Form>
                <Form style={{marginLeft: "10px"}}>
                    <Form.Group className="mb-3" controlId="search-input">
                        <FloatingLabel
                            controlId="floating-search"
                            label="Keresés"
                            className="mb-3"
                        >
                            <Form.Control onChange={(e) => setSearchInput(e.target.value)} type="text"
                                          placeholder="Keresés"/>
                        </FloatingLabel>
                    </Form.Group>
                </Form>
            </Navbar>

            {dataList?.length > 0 ? <div>
                    <Table striped bordered hover variant="dark">
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
                                <td>{record.name}</td>
                                <td>{record.price}</td>
                                <td>{record.vat}</td>
                            </tr>))}
                        </tbody>
                    </Table>
                    <PageNavigation
                        items={paginationItems}
                        setPageNumber={setPageNumber}
                    /></div>
                :
                <>LOADING...</>

            }

            <Link to={"/"}><Button>Log out</Button></Link>
        </>
    )
}
