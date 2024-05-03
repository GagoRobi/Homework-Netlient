import {Button, FloatingLabel, Form, FormGroup, Navbar, Pagination, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import PageNavigation from "../components/PageNavigation.jsx";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Highlighter from "react-highlight-words";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default function DataListPage() {
    const [pageNumber, setPageNumber] = useState(0);
    const [recordPerPage, setRecordPerPage] = useState(25);
    const [dataList, setDataList] = useState([]);
    const [maxPages, setMaxPages] = useState(0);
    const [paginationItems, setPaginationItems] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [asc, setAsc] = useState(false);
    const [lastCategory, setLastCategory] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [filtered, setFiltered] = useState(false);
    const [arrayToPrint, setArrayToPrint] = useState([
        [
        {text: 'Cikkszám', style: 'tableHeader'},
        {text: 'Cikk Megnevezése', style: 'tableHeader'},
        {text: 'Nettó Ár', style: 'tableHeader'},
        {text: 'Áfa', style: 'tableHeader'}
    ]
    ]);
    const [totalElements, setTotalElements] = useState(0);
    const [loadedElements, setLoadedElements] = useState(0);
    const [lastUrl, setLastUrl] = useState(null);




    const generateAndDownloadPDF = async () => {
        const printBody = await printAllPagesOfResults();
        const docDefinition = {
            content: [
                {text: 'Találatok PDF-be convertálva', style: 'header'},
                {
                    style: 'table',
                    table: {
                        body: printBody
                    }
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                table: {
                    margin: 5
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        };
        console.log(printBody)
        console.log(docDefinition.content)
        pdfMake.createPdf(docDefinition).download("results.pdf");
    };

    const printAllPagesOfResults = async () => {
        const response = await fetch(`${lastUrl}`);
        const dataPage = await response.json();
        const tableContent = await dataPage.content
        const array = tableContent.map((elem) => [{text : elem.id}, {text: elem.name}, {text: elem.price}, {text: elem.vat}]);
        console.log([...arrayToPrint,array])
        return [
            [{text: 'Cikkszám', style: 'tableHeader'},
            {text: 'Cikk Megnevezése', style: 'tableHeader'},
            {text: 'Nettó Ár', style: 'tableHeader'},
            {text: 'Áfa', style: 'tableHeader'}]
        ,...array];
    };


    async function fetchDataList() {
        const response = await fetch(`api/adat?page=${pageNumber}&size=${recordPerPage}`);
        const dataArray = await response.json();
        console.log(dataArray)
        setDataList(dataArray.content);
        setMaxPages(dataArray.totalPages);
        setTotalElements(dataArray.totalElements);
        setLoadedElements(dataArray.numberOfElements);
        setLastUrl(`api/adat?page=0&size=${dataArray.totalElements}`)
        return dataArray
    }

    async function fetchSortedDataList(columnName) {
        const response = await fetch(`api/adat/sorted?page=${pageNumber}&size=${recordPerPage}&asc=${asc}&category=${columnName}`);
        const dataArray = await response.json();
        setDataList(dataArray.content);
        setTotalElements(dataArray.totalElements);
        setLoadedElements(dataArray.numberOfElements);
        setLastUrl(`api/adat/sorted?page=0&size=${dataArray.totalElements}&asc=${asc}&category=${columnName}`)
        console.log(dataArray)
        return dataArray
    }

    async function fetchFilteredDataList() {
        const response = await fetch(`api/adat/search?page=${pageNumber}&size=${recordPerPage}&namePart=${searchInput}`);
        const dataArray = await response.json();
        setDataList(dataArray.content);
        setTotalElements(dataArray.totalElements);
        setLoadedElements(dataArray.numberOfElements);
        setLastUrl(`api/adat/search?page=0&size=${dataArray.totalElements}&namePart=${searchInput}`)
        console.log(dataArray)
        setMaxPages(dataArray.totalPages)
        return dataArray
    }

    async function fetchFilteredSortedDataList(columnName) {
        const response = await fetch(`api/adat/search-sorted?page=${pageNumber}&size=${recordPerPage}&asc=${asc}&category=${columnName}&namePart=${searchInput}`);
        const dataArray = await response.json();
        setTotalElements(dataArray.totalElements);
        setLoadedElements(dataArray.numberOfElements);
        setLastUrl(`api/adat/search-sorted?page=0&size=${dataArray.totalElements}&asc=${asc}&category=${columnName}&namePart=${searchInput}`)
        console.log(dataArray)
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
            } else {
                fetchSortedDataList(lastCategory);
            }
        } else {
            if (sorted) {
                fetchFilteredSortedDataList(lastCategory)
            } else {
                fetchFilteredDataList()
            }
        }
        createPagination()
    }, [pageNumber, recordPerPage])

    useEffect(() => {
        if (!filtered) {
            if (sorted) {
                fetchSortedDataList(lastCategory);
            }
        } else {
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
        if (searchInput.length < 1) {
            setFiltered(false);
        } else {
            setFiltered(true);
        }
        if (sorted) {
            fetchFilteredSortedDataList(lastCategory)
        } else {
            console.log("asd1")
            fetchFilteredDataList()
        }
    }, [searchInput])

    function handleSizeSelect(e) {
        setPageNumber(0);
        const selectedValue = e.target.value;
        if (selectedValue === "all") {
            setRecordPerPage(totalElements);
        } else {
            setRecordPerPage(parseInt(selectedValue));
        }
        setSorted(false);
    }

    useEffect(() => {

    }, [dataList])


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

                                <td><Highlighter
                                    highlightClassName="YourHighlightClass"
                                    searchWords={[`${searchInput}`]}
                                    caseSensitive={false}
                                    autoEscape={true}
                                    textToHighlight={`${record.name}`}
                                /></td>
                                <td>{record.price}</td>
                                <td>{record.vat}</td>

                            </tr>

                        ))}
                        </tbody>
                    </Table>
                    <PageNavigation
                        items={paginationItems}
                        setPageNumber={setPageNumber}
                    /></div>
                :
                <>LOADING...</>

            }
            <Button onClick={generateAndDownloadPDF}>Download NEW PDF</Button>
            <Button onClick={generateAndDownloadPDF}>Download PDF</Button>
            <Link to={"/"}><Button>Log out</Button></Link>
        </>
    )
}
