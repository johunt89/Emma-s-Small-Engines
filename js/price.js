//Html elements
let btnContainterElement = document.getElementById('pagination-wrapper'); 
let pageTable = document.getElementById('myTable');
let userSearch = document.getElementById('searchText');


let pageIndex = 1;
let lastFocusPriceID;
let addEditFlag;
let objectToUpdate;
let trapFocus = false;
let modalVisibleFlag = false;
let searchIsFocus = false;
let supplierData = tableData.supplier;
let priceData = tableData.price;
let incomingUPC = pageKeyData.price;
let UPCPriceData = priceData.filter(x=> x.UPC == incomingUPC);
//#endregion

//#region SeedData

//retrieve storage data file and store it inside parsedData
for(let i = 0; i < UPCPriceData.length; i++){
    UPCPriceData[i].Supplier = supplierData.filter(x=> x.SupplierID == UPCPriceData[i].SupplierID)[0].SupplierName;
}
//console.log(localStorage.getItem(tableStrings.price));

//initial page load
buildTable(UPCPriceData, pageTable, btnContainterElement, pageIndex);
loggedInUser();

//populate combo-box with suppliers
function populateCboBox(){
    let cboHtml = `<select tabindex="210" class="cboSupName" id="formCboPriceSupplier" name="SupplierID" required>` +
        `   <option>Choose a supplier:</option>`;
    
    for(var i = 0; i < supplierData.length; i++){
        cboHtml += `<option VALUE="${supplierData[i].SupplierID}">${supplierData[i].SupplierName}</option>`; 
    }
    cboHtml += `</select>` ;
    document.getElementById("cboDiv").innerHTML = cboHtml;
}
//#endregion

//#region Methods

//#region Pagination and Buttons

//page state object
function state(objArr, currentPage)
{
    return {
        'querySet':objArr,
        'page':currentPage,
        'rows':7
    }
}

//page data object
function pagination(objArr, currentPage){
    let stateObj = state(objArr, currentPage);
    let trimStart = (stateObj.page - 1) * stateObj.rows;
    let trimEnd = trimStart + stateObj.rows;

    let trimmedData = stateObj.querySet.slice(trimStart, trimEnd);

    let pages = Math.ceil(stateObj.querySet.length / stateObj.rows);
    return {
        'querySet':trimmedData,
        'pages':pages
    };
}

//page button injector
function addPageButtons(pageNumbers, containerElement, currentPage){
    let wrapper = containerElement;
    wrapper.innerHTML = '';
    let minPage = currentPage - 2 > 0 ? currentPage -2 : 1 ;
    let maxPage = currentPage + 2 < pageNumbers ? currentPage + 2 : pageNumbers;
    let counter = 161;
    while (minPage <= pageNumbers){
        wrapper.innerHTML += `<button tabindex="${counter}" value=${minPage} class="pageButton btn btn-sm btn-info">${minPage}</button>`;
        minPage++;
        counter++;
    }
    if(currentPage != 1){
        wrapper.innerHTML = `<button tabindex="160" value=${1} class="pageButton btn btn-sm btn-info">First</button>` + wrapper.innerHTML;
    }else if (currentPage != pageNumbers && pageNumbers != 0) {
        wrapper.innerHTML += `<button tabindex="170" value=${pageNumbers} class="pageButton btn btn-sm btn-info">Last</button>`;
    }
    if(pageNumbers == 0){
        wrapper.innerHTML += `<button disabled value=${0} class="pageButton btn btn-sm btn-info">0</button>`;
    }
}
//#endregion

//#region Table Creation
function buildTable(arr, htmlTable, buttonContainer, currentPage){
    let table = htmlTable;
    let paginationObj = pagination(arr, currentPage);
    let data = paginationObj.querySet;
    table.innerHTML = "";
    let counter = 140;
    for(d of data){
        var row = `<tr id="tr${counter}" data-id="${d.OrderNumber}" name="trID" tabindex="${counter}" onclick="FocusTableRow(this);" onfocus="FocusTableRow(this  )" onfocusout="LeaveFocus()" class="table-hover">
                        <td name="Supplier-${d.UPC}" data-id="${d.UPC}">${d.Supplier}</td>
                        <td name="OrderNumber-${d.UPC}">${d.OrderNumber}</td>
                        <td name="PurchaseDate-${d.UPC}">${d.PurchaseDate}</td>
                        <td name="PurchasePrice-${d.UPC}">$${(d.PurchasePrice).toFixed(2)}</td>
                        <td name="Stock-${d.UPC}">${d.Stock}</td>
                  </tr>`;
                  counter++;
        table.innerHTML += row;
    }
    addPageButtons(paginationObj.pages, buttonContainer, currentPage);
}
//#endregion

//#region Filter and Sort
function searchInventory(searchValue, data){
    let filteredData = [];
    return data.filter(d => d.OrderNumber.toString().includes(searchValue) || d.Supplier.toLowerCase().includes(searchValue));
}

function searchTable(searchString, arr, htmlTable, buttonContainer, currentPage){
    let data = searchInventory(searchString, arr);
    buildTable(data, htmlTable, buttonContainer, currentPage);
}

//sort methods
function sortHeaderFields(thElement){
    let column = thElement.data('column');
    let order = thElement.data('order');

    if (order == 'desc'){
        thElement.data('order', 'asc');
        UPCPriceData = UPCPriceData.sort((a,b) => a[column] > b[column] ? 1 : -1);
    } else {
        thElement.data('order', 'desc');
        UPCPriceData = UPCPriceData.sort((a,b) => a[column] < b[column] ? 1 : -1);
    }
}
//#endregion

//#region Event Handlers
//navigate to paging
$(document).on('click', ".pageButton", function(){
    $('#myTable').empty();
    pageIndex = $(this).val();
    //buildTable(parsedData, pageTable, btnContainterElement, pageIndex);
    searchTable(userSearch.value, UPCPriceData,  pageTable, btnContainterElement, pageIndex);
})

//event (sort) for when *any* column header is clicked
$('th').on('click', function(){
    $('#myTable').empty();
    sortHeaderFields($(this));
    //buildTable(parsedData, pageTable, btnContainterElement, btnContainterElement);
    searchTable(userSearch.value, UPCPriceData, pageTable, btnContainterElement, pageIndex);
})

//event (filter) for when text input #userSearch recieves a key-up
$('#searchText').on('keyup', function(){
    searchTable($(this).val(), UPCPriceData,  pageTable, btnContainterElement, pageIndex);
    if (pageTable.innerHTML == "") {
        pageIndex = 1;
        searchTable($(this).val(), UPCPriceData,  pageTable, btnContainterElement, pageIndex);
    }
})

$(document).on('keydown', '.table-hover', function(event) {
    if(event.keyCode == 79) { 
       let focusElementID = $(":focus").data('id');
       let name = $(`td[name="Name-${focusElementID}"]`).html();
       alert(`${name} has been added to order request.`);
    }else if (event.keyCode == 69){
        document.getElementById("btnEdit").click();
    }
});

$(document).on('keydown', function(event) {
    if(event.keyCode == 65 && !modalVisibleFlag && !searchIsFocus) { 
        document.getElementById("btn_add_popup").click();
    }
});

//sort headers on focus enter key
$('th').on('keydown', function(event){
    if(event.keyCode == 13){
        $('#myTable').empty();
        sortHeaderFields($(this));
        searchTable(userSearch.value, UPCPriceData, pageTable, btnContainterElement, pageIndex);
    }
})
//#endregion

//#region Focus
async function FocusTableRow(tableRow){
    tableRow.focus();
    lastFocusPriceID = $(":focus").data('id');
    await new Promise(resolve => setTimeout(resolve, 101));
    document.getElementById("btnEdit").hidden = false;
}

async function LeaveFocus(){
    await new Promise(resolve => setTimeout(resolve, 100));
   document.getElementById("btnEdit").hidden = true;
}

function SearchFocus(){
    searchIsFocus = true;
}

function SearchLeaveFocus(){
    searchIsFocus = false;
}

document.getElementById('searchText').addEventListener("focusout", SearchLeaveFocus());
//#endregion

//#region CRUD
function AddItem(){
    ClearForm();
    populateCboBox();
    addEditFlag = "Add";
    modalVisibleFlag = true;
}

function ProcessForm(form){
    if (addEditFlag == "Add"){
        if(confirm("Ensure that all the Product detials you have entered are correct. Press OK to continue"))
        {
        AddInventory(form);
        }
    }else if (addEditFlag == "Edit"){
        if(confirm("Ensure that all the Product detials you have entered are correct. Press OK to continue"))
        {
        EditInventory();
        }
    }
}

async function AddInventory(form){
    let formData = new FormData(form);
    let newInventoryItem = Object.fromEntries(formData);
    newInventoryItem['UPC'] = incomingUPC;
    newInventoryItem['Supplier'] = supplierData.filter(x=> x.SupplierID == newInventoryItem.SupplierID)[0].SupplierName;
    newInventoryItem['PriceID'] = Math.max(...priceData.map(s => parseInt(s.PriceID))) + 1;
    newInventoryItem['PurchasePrice'] = parseFloat(newInventoryItem['PurchasePrice']);
    let testArr = JSON.stringify(priceData.concat(newInventoryItem));
    localStorage.setItem(tableStrings.price, testArr);
    UPCPriceData = JSON.parse(localStorage.getItem(tableStrings.price));
    modalVisibleFlag = false;
    UpdateInventoryTable();
}

function EditItem(){
    objectToUpdate = UPCPriceData.find(x => x.OrderNumber == lastFocusPriceID);
    populateCboBox();
    document.querySelector('#formCboPriceSupplier').value = objectToUpdate.SupplierID;
    document.getElementById("formOrderNumber").value = objectToUpdate.OrderNumber;
    document.getElementById("formPurchaseDate").value = objectToUpdate.PurchaseDate;
    document.getElementById("formPurchasePrice").value = objectToUpdate.PurchasePrice.toFixed(2);
    document.getElementById("formStock").value = objectToUpdate.Stock;
    addEditFlag = "Edit";
    modalVisibleFlag = true;
    document.getElementById('modalContainter').focus();
}

function EditInventory(){
    objectToUpdate.SupplierID = document.querySelector('#formCboPriceSupplier').value;
    objectToUpdate.OrderNumber = document.getElementById("formOrderNumber").value;
    objectToUpdate.PurchaseDate = document.getElementById("formPurchaseDate").value;
    objectToUpdate.PurchasePrice = parseFloat(document.getElementById("formPurchasePrice").value);
    objectToUpdate.Stock = parseFloat(document.getElementById("formStock").value);
    priceData[UPCPriceData.map(o => o.PriceID).indexOf(lastFocusPriceID)] = objectToUpdate;
    let newData = JSON.stringify(priceData);
    localStorage.setItem(tableStrings.price, newData);
    UPCPriceData = JSON.parse(localStorage.getItem(tableStrings.price));
    modalVisibleFlag = false;
    UpdateInventoryTable();
}
/*
function PopulateFormDataByUPC(){
    let objectToUpdate = parsedData.find(x => x.UPC == lastFocusUPC);
    document.getElementById("formUPC").value = lastFocusUPC;
    document.getElementById("formOrderNumber").value = objectToUpdate.OrderNumber;
    document.getElementById("formPurchaseDate").value = objectToUpdate.PurchaseDate;
    document.getElementById("formQuantity").value = objectToUpdate.Quantity;
}*/

function ClearForm(){
    document.getElementById("formOrderNumber").value = "";
    document.getElementById("formOrderNumber").value = "";
    document.getElementById("formPurchaseDate").value = "";
    document.getElementById("formPurchasePrice").value = "";
    document.getElementById("formStock").value = "";
}

function focusForm(){
    document.getElementById('modalContainter').focus();
}

function focusInventory(){
    document.getElementById('tr140').focus();
}
//#endregion
//#endregion
function UpdateInventoryTable(){
    let unalteredInventoryData = JSON.parse(localStorage.getItem(tableStrings.inventory));
    let priceData = JSON.parse(localStorage.getItem(tableStrings.price));
    //Modify the data | AveragePrices
    for(let i = 0; i < unalteredInventoryData.length; i++){
        unalteredInventoryData[i].PriceAVG = priceData.filter(x=> x.UPC == unalteredInventoryData[i].UPC).reduce((total, next) => total + (next.PurchasePrice * next.Stock), 0) / (priceData.filter(x=> x.UPC == unalteredInventoryData[i].UPC).reduce((total, next) => total + next.Stock, 0) != 0? priceData.filter(x=> x.UPC == unalteredInventoryData[i].UPC).reduce((total, next) => total + next.Stock, 0): 1);
        unalteredInventoryData[i].PriceRetail = unalteredInventoryData[i].PriceAVG * 1.23;
        unalteredInventoryData[i].Stock = priceData.filter(x=> x.UPC == unalteredInventoryData[i].UPC).reduce((total, next) => total + next.Stock, 0);
    }
    //Store the modified data
    localStorage.setItem(tableStrings.inventory, JSON.stringify(unalteredInventoryData));
}