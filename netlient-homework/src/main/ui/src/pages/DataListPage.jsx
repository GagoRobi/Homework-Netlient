import {Button, Card, Navbar, Pagination} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    fetchDataList,
    fetchFilteredDataList,
    fetchFilteredSortedDataList,
    fetchSortedDataList
} from '../api/apiService';
import PageNavigation from "../components/PageNavigation.jsx";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import PaginationSizeSelect from "../components/PaginationSizeSelect.jsx";
import SearchInputField from "../components/SearchInputField.jsx";
import DataBaseTable from "../components/DataBaseTable.jsx";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default function DataListPage() {
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [recordPerPage, setRecordPerPage] = useState(25);
    const [dataList, setDataList] = useState([]);
    const [numberOfTotalPages, setNumberOfTotalPages] = useState(0);
    const [paginationItems, setPaginationItems] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [asc, setAsc] = useState(false);
    const [lastCategory, setLastCategory] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [filtered, setFiltered] = useState(false);
    const [totalElements, setTotalElements] = useState(0);
    const [lastUrl, setLastUrl] = useState(null);
    const [dbSize, setDBSize] = useState(0)

    //For The pdf I used pdfmake(https://www.npmjs.com/package/pdfmake), first I tried with jsPDF(https://www.npmjs.com/package/jspdf)
    //But jsPDF does not support utf-8 so (for example Szőlő in database would print szQlQ)
    const downloadAllResultsToPDF = async () => {
        const printBody = await getPrintContentWithAllResults();
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
        pdfMake.createPdf(docDefinition).download("results.pdf");
    };

    const getPrintContentWithAllResults = async () => {
        const response = await fetch(`${lastUrl}`);
        const dataPage = await response.json();
        const tableContentFromDB = await dataPage.content
        const tableHeaderRow = [
            {text: 'Cikkszám', style: 'tableHeader'},
            {text: 'Cikk Megnevezése', style: 'tableHeader'},
            {text: 'Nettó Ár', style: 'tableHeader'},
            {text: 'Áfa', style: 'tableHeader'}]
        const tableRows = tableContentFromDB.map((elem) => [{text: elem.id}, {text: elem.name}, {text: elem.price}, {text: elem.vat}]);

        return [tableHeaderRow, ...tableRows];
    };

    function sortTable(columnName) {
        setAsc(!asc)
        setSorted(true);
        setLastCategory(columnName);
    }

    function fetchFilteredLists() {
        if (sorted) {
            fetchFilteredSortedDataList(lastCategory, currentPageNumber, recordPerPage, asc, setDataList, setTotalElements, setLastUrl, searchInput, setNumberOfTotalPages)
        } else {
            fetchFilteredDataList(currentPageNumber, recordPerPage, searchInput, setDataList, setTotalElements, setLastUrl, setNumberOfTotalPages)
        }
    }

    function updateDatabase() {
        if (!filtered) {
            if (sorted) {
                fetchSortedDataList(lastCategory, currentPageNumber, recordPerPage, asc, setDataList, setTotalElements, setLastUrl, setNumberOfTotalPages);
            }
        } else {
            fetchFilteredLists();
        }
        //createPagination()
    }



function createPagination() {
    let items = [];
    for (let i = 0; i < numberOfTotalPages; i++) {
        console.log(i + " index")
        items.push(
            <Pagination.Item key={i + 1} active={i + 1 === currentPageNumber + 1}>
                {i + 1}
            </Pagination.Item>,
        );
    }

    setPaginationItems(items);
}

useEffect(() => {
    fetchDataList(currentPageNumber, recordPerPage, setDataList, setNumberOfTotalPages, setTotalElements, setLastUrl, setDBSize);
}, []);

useEffect(() => {
        updateDatabase();
    },[currentPageNumber, recordPerPage,]);

useEffect(() => {
    updateDatabase();
}, [asc, lastCategory]);


useEffect(() => {
    setCurrentPageNumber(0)
    if (searchInput.length < 1) {
        console.log(totalElements + " totalELements")
        console.log(numberOfTotalPages + " numberOfTotalPages")
        console.log(recordPerPage + " recordPerPage")
        setFiltered(false);
    } else {
        setFiltered(true);
    }
    fetchFilteredLists();
    //createPagination();
}, [searchInput]);

useEffect(() => {
    createPagination();
}, [numberOfTotalPages, currentPageNumber])

function handleSizeSelect(e) {
    setCurrentPageNumber(0);
    const selectedValue = e.target.value;
    if (selectedValue === "all") {
        setRecordPerPage(dbSize);
    } else {
        setRecordPerPage(parseInt(selectedValue));
    }
    setSorted(false);
}

return (
    <div style={{minHeight: "100vh", background: "#fab114"}}>
        <Navbar style={{
            margin: "0",
            padding: "10px",
            background: "#fab114",
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <div style={{float: "left"}}>
                <SearchInputField
                    setSearchInput={setSearchInput}
                />
            </div>
            <Button style={{background: "#7a11fa", color: "#fab114", fontWeight: "bold"}}
                    onClick={downloadAllResultsToPDF}>Találatok Letöltése</Button>
            <div style={{float: "right"}}>
                <PaginationSizeSelect
                    handleSelect={handleSizeSelect}
                    totalElements={totalElements}
                    setCurrentPageNumber={setCurrentPageNumber}
                    setRecordPerPage={setRecordPerPage}
                    setSorted={setSorted}
                />
                {dataList?.length > 0 &&
                    <PageNavigation
                        items={paginationItems}
                        setPageNumber={setCurrentPageNumber}
                    />
                }
            </div>
        </Navbar>

        {dataList?.length > 0 ?
            <div>
                <DataBaseTable
                    dataList={dataList}
                    sortTable={sortTable}
                    searchInput={searchInput}
                />
            </div>
            :
            <div>
                <Card style={{maxWidth: "fit-content", padding: "5px", margin: "auto"}}>
                    <p style={{fontSize: "x-large", fontWeight: "bold"}}>
                        No Record Found
                    </p>
                </Card>
            </div>
        }

        <Navbar style={{padding: "12px", paddingTop: "0", display: 'flex', justifyContent: 'space-between'}}>
            <Link to={"/"}>
                <Button style={{
                    background: "#7a11fa",
                    color: "#fab114",
                    fontWeight: "bold",
                    float: "left"
                }}>Kijelentkezés</Button>
            </Link>
            <div style={{maxWidth: "fit-content", marginTop: "10px", float: "right"}}>
                <PageNavigation
                    items={paginationItems}
                    setPageNumber={setCurrentPageNumber}
                />
            </div>
        </Navbar>
    </div>
)
}
