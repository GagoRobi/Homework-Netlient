//This fetch runs when the table is neither sorted or filtered by the search field
export async function fetchDataList(pageNumber, recordPerPage, setDataList, setNumberOfTotalPages, setTotalElements,  setLastUrl, setDBSize) {
    const response = await fetch(`api/adat?page=${pageNumber}&size=${recordPerPage}`);
    const dataArray = await response.json();
    setDataList(dataArray.content);
    setNumberOfTotalPages(dataArray.totalPages);
    setDBSize(dataArray.totalElements);
    setTotalElements(dataArray.totalElements);
    setLastUrl(`api/adat?page=0&size=${dataArray.totalElements}`)
    return dataArray
}

//This fetch runs when the table is sorted but there's nothing in the search field
export async function fetchSortedDataList(columnName, pageNumber, recordPerPage, asc, setDataList,  setTotalElements,  setLastUrl, setNumberOfTotalPages) {
    const response = await fetch(`api/adat/sorted?page=${pageNumber}&size=${recordPerPage}&asc=${asc}&category=${columnName}`);
    const dataArray = await response.json();
    setDataList(dataArray.content);
    setNumberOfTotalPages(dataArray.totalPages);
    setTotalElements(dataArray.totalElements);
    setLastUrl(`api/adat/sorted?page=0&size=${dataArray.totalElements}&asc=${asc}&category=${columnName}`)
    return dataArray
}

//This fetch runs when the table is NOT sorted and there's something in the search field
export async function fetchFilteredDataList(pageNumber, recordPerPage, searchInput, setDataList, setTotalElements,  setLastUrl, setNumberOfTotalPages) {
    const response = await fetch(`api/adat/search?page=${pageNumber}&size=${recordPerPage}&namePart=${searchInput}`);
    const dataArray = await response.json();
    setDataList(dataArray.content);
    setTotalElements(dataArray.totalElements);
    setLastUrl(`api/adat/search?page=0&size=${dataArray.totalElements}&namePart=${searchInput}`)
    setNumberOfTotalPages(dataArray.totalPages)
    return dataArray
}

//This fetch runs when the table is sorted and there's something in the search field
export async function fetchFilteredSortedDataList(columnName, pageNumber, recordPerPage, asc, setDataList,  setTotalElements,  setLastUrl ,searchInput, setNumberOfTotalPages) {
    const response = await fetch(`api/adat/search-sorted?page=${pageNumber}&size=${recordPerPage}&asc=${asc}&category=${columnName}&namePart=${searchInput}`);
    const dataArray = await response.json();
    setTotalElements(dataArray.totalElements);
    setLastUrl(`api/adat/search-sorted?page=0&size=${dataArray.totalElements}&asc=${asc}&category=${columnName}&namePart=${searchInput}`)
    setDataList(dataArray.content);
    setNumberOfTotalPages(dataArray.totalPages);
    return dataArray
}