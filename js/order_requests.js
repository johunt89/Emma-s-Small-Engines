//Requires JQUERY <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//Requires variables <script src="js/variables.js"></script> 

//HTML Elements
let btnContainterElement = document.getElementById('pagination-wrapper'); 
let pageTable = document.getElementById('myTable');
let userSearch = document.getElementById('searchText');

//Page Data
let supplierData = tableData.orderRequest;
let storageString = "order_requestsTable";
let inventoryStorageString = "inventoryTable";
let orderStorageString = "order_requestsTable";

//Js varaibles
let addEdit;
let focusID;
let objectToUpdate;
let pageIndex = 1;

//Boolean Flags
let modalVisibleFlag = false;
let searchIsFocus = false;
let trapFocus = false;

//initial page load
tableBuilder.orderRequestTable(supplierData, pageTable, btnContainterElement, pageIndex, 5);
loggedInUser();

//Search Method
function searchTable(searchString, orderArray, htmlTable, buttonContainer, currentPage){
    let data = searchTableData.orderRequest.OrderRequestExistingData(orderArray, searchString);
    tableBuilder.orderRequestTable(data, htmlTable, buttonContainer, currentPage, 5);
}

//sort methods
function sortHeaderFields(thElement){
    let column = thElement.data('column');
    let order = thElement.data('order');

    if (order == 'desc'){
        thElement.data('order', 'asc');
        supplierData = supplierData.sort((a,b) => a[column] > b[column] ? 1 : -1);
    } else {
        thElement.data('order', 'desc');
        supplierData = supplierData.sort((a,b) => a[column] < b[column] ? 1 : -1);
    }
}

//navigate to paging
$(document).on('click', ".pageButton", function(){
    $('#myTable').empty();
    pageIndex = $(this).val();
    //buildTable(supplierData, pageTable, btnContainterElement, pageIndex);
    searchTable(userSearch.value, supplierData,  pageTable, btnContainterElement, pageIndex);
})

//event (sort) for when *any* column header is clicked
$('th').on('click', function(){
    $('#myTable').empty();
    sortHeaderFields($(this));
    //buildTable(supplierData, pageTable, btnContainterElement, btnContainterElement);
    searchTable(userSearch.value, supplierData, pageTable, btnContainterElement, pageIndex);
})

//event (filter) for when text input #userSearch recieves a key-up
$('#searchText').on('keyup', function(){
    searchTable($(this).val(), supplierData,  pageTable, btnContainterElement, pageIndex);
    if (pageTable.innerHTML == "") {
        pageIndex = 1;
        searchTable($(this).val(), supplierData,  pageTable, btnContainterElement, pageIndex);
    }
})

$(document).on('keydown', '.table-hover', function(event) {
    if (event.keyCode == 69){
        addEdit = "Edit";
        document.getElementById("btnEdit").click();
    }
});

$(document).on('keydown', function(event) {
    objectToUpdate = supplierData.find(x => x.RequestID == focusID);
    if(event.keyCode == 82 && !modalVisibleFlag && !searchIsFocus) { 
        if(objectToUpdate.OrderSent != "Not Sent")
            document.getElementById("btn_add_popup").click();
        else {
            alert("Cannot receive an order that has not yet been sent.");
        }
    } else if (event.keyCode == 83 && !modalVisibleFlag && !searchIsFocus){
        if(objectToUpdate.OrderSent != "Not Sent")
            alert("Cannot send an order that has already been sent.");
        else {
            SendOrder();
            alert("Order Sent Successfully.");
        }
    }
});

//sort headers on focus enter key
$('th').on('keydown', function(event){
    if(event.keyCode == 13){
        $('#myTable').empty();
        sortHeaderFields($(this));
        searchTable(userSearch.value, supplierData, pageTable, btnContainterElement, pageIndex);
    }
})
//#endregion

//#region Focus
async function FocusTableRow(tableRow){
    tableRow.focus();
    focusID = $(":focus").data('id');
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
//#endregionaddinventor

//#region CRUD
function AddItem(){
    ClearForm();
    addEdit = "Add";
    modalVisibleFlag = true;
}


function ProcessForm(form){
    let addEdit = document.getElementById('add_edit').innerHTML;
    if (addEdit == "Receive Order"){
        AddInventory(form);
    }else if (addEdit == "EDIT ORDER"){
        EditInventory();
    }
}

function AddInventory(form){ //look here
    if(confirm("Are you sure you the details for the received order are correct?")){
        let data = tableData.orderRequest;
        let orderIDs = data.map(x => x.RequestID);
        data[orderIDs.indexOf(focusID * 1)].OrderReceived = "12/15/2022";
        data[orderIDs.indexOf(focusID * 1)].OrderNumber = document.getElementById('formOrderNumber').value * 1;
        updateTableData.orderRequests(data);
        alert("Order Added successfully");
    }
    else {
        alert("Order received cancelled.");
    }
}

function EditItem(){
    objectToUpdate = supplierData.find(x => x.RequestID == focusID);
    if(objectToUpdate.OrderSent == "Not Sent"){
        document.getElementById('orderNumberDiv').innerHTML = "";
        populateOrderItems();
        document.getElementById("formDescription").value = objectToUpdate.OrderDescription;
    }else {
        document.getElementById('itemDiv').innerHTML = "";
        populateOrderNumber();
        document.getElementById("formDescription").value = objectToUpdate.OrderDescription;
        document.getElementById("formOrderNumber").value = objectToUpdate.OrderNumber;
    }
    addEdit = "Edit";
    modalVisibleFlag = true;
    document.getElementById('modalContainter').focus();
}

function EditInventory(){
    if(objectToUpdate.OrderSent == "Not Sent"){
        let upcArray = [];
        //right now this kind of errors out but it is okay because it prevents the user from having 0 items in the order.
        $("input:checkbox[name=checkbox]:checked").each(function(){
            upcArray.push($(this).val());
            objectToUpdate.OrderItemIDs = upcArray;
            objectToUpdate.OrderDescription = document.getElementById("formDescription").value;
        });
    }else {
        objectToUpdate.OrderDescription = document.getElementById("formDescription").value;
        objectToUpdate.OrderNumber = document.getElementById("formOrderNumber").value;
    }
    supplierData[supplierData.map(o => o.RequestID).indexOf(focusID)] = objectToUpdate;
    try {
        updateTableData.orderRequests(supplierData);
    }
    catch (e) {
        alert(e);
    }
    modalVisibleFlag = false;
}

function PopulateFormDataByRequestID(){
    let objectToUpdate = supplierData.find(x => x.RequestID == focusID);
    document.getElementById("formRequestID").value = focusID;
    document.getElementById("formOrderItemIDs").value = objectToUpdate.OrderItemIDs;
    document.getElementById("formOrderDescription").value = objectToUpdate.OrderDescription;
    document.getElementById("formOrderCost").value = objectToUpdate.OrderCost;
}

function ClearForm(){
    document.getElementById("formRequestID").value = "";
    document.getElementById("formOrderItemIDs").value = "";
    document.getElementById("formOrderDescription").value = "";
    document.getElementById("formOrderCost").value = "";
}

function focusForm(){
    document.getElementById('modalContainter').focus();
}

function focusInventory(){
    document.getElementById('tr140').focus();
}
//#endregion

//#endregion

function SendOrder(){
    const date = new Date();
    objectToUpdate = supplierData.find(x => x.RequestID == focusID);
    if(objectToUpdate.OrderSent == "Not Sent"){
        objectToUpdate.OrderSent = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        supplierData[supplierData.map(o => o.RequestID).indexOf(focusID)] = objectToUpdate;
        let newData = JSON.stringify(supplierData);
        localStorage.setItem(storageString, newData);
        supplierData = JSON.parse(localStorage.getItem(storageString));
        location.reload();
    }
}

function populateOrderItems(){
    let selectedOrder = supplierData.filter(x => x.RequestID == focusID)[0];
    let orderItems = selectedOrder.OrderItems.split(", ");
    let tabindex = 211;
    let orderNumberHtml = `<label class="margin-top-22" id="orderItems"><b>Order Items</b></label><br>`;
    for(let i = 0; i < selectedOrder.OrderItemIDs.length; i++){
        console.log(selectedOrder.OrderItemIDs[i]);
        orderNumberHtml += `<label class="margin-top-22" for="checkbox_id">${orderItems[i]}</label>`;
        orderNumberHtml += `<input type="checkbox" tabindex="${tabindex}" name="checkbox" id="checkbox_id${i}" value="${selectedOrder.OrderItemIDs[i]}" checked><br/>`;
        tabindex ++;
    }
    orderNumberHtml += "<br/>"
    document.getElementById("itemDiv").innerHTML = orderNumberHtml;
}

function populateOrderNumber(){
    let orderNumberHtml = `<label class="margin-top-22"><b>Order Number</b></label>
    <input class="no-bottom-margin" tabindex="230" type="text" placeholder="ex. ###, ####, or #####..." id="formOrderNumber" name="OrderNumber" required>`;
    document.getElementById("orderNumberDiv").innerHTML = orderNumberHtml;
}

function refreshOrderItemValues(){
    let unalteredOrderData = JSON.parse(localStorage.getItem(orderStorageString));
    let unalteredInventoryData = JSON.parse(localStorage.getItem(inventoryStorageString));
    //let priceData = JSON.parse(localStorage.getItem(priceStorageString));
    for(let i = 0; i < unalteredOrderData.length; i++){
        let itemNames = "";
        for(let j = 0; j < unalteredOrderData[i].OrderItemIDs.length; j++){
            itemNames += unalteredInventoryData.filter(x => x.UPC == unalteredOrderData[i].OrderItemIDs[j])[0].Name + ", ";
        }
        unalteredOrderData[i].OrderItems = itemNames.slice(0, -2);
    }
    localStorage.setItem(orderStorageString, JSON.stringify(unalteredOrderData));
}

function ReceiveItem(){
    const date = new Date();
    objectToUpdate = tableData.orderRequest.find(x => x.RequestID == focusID);
        if(objectToUpdate.OrderReceived != ""){
            alert("Cannot receive an order that has already been received.");
        }
        else {
            populateOrderNumber();
            populateSuppliers();
            document.getElementById("formDescription").value = objectToUpdate.OrderDescription;
            document.querySelector('.bg_popup').style.display = 'flex';
        }
}

function populateSuppliers(){
    let selectedOrder = tableData.orderRequest.filter(x => x.RequestID == focusID)[0];
    let orderItems = selectedOrder.OrderItems.split(", ");
    let tabindex = 211;
    let supplierData = JSON.parse(localStorage.getItem("supplierTable"));
    let supplierHtml = `<label class="label-space" id="orderItems"><b>Order Items</b></label><br>`;
    for(let i = 0; i < selectedOrder.OrderItemIDs.length; i++){
        supplierHtml += `<label">${orderItems[i]}</label>`;
        supplierHtml += `<select tabindex="210" class="cboSupName" id="formCboPriceSupplier" name="SupplierID" required>`;
        for(var j = 0; j < supplierData.length; j++){
            supplierHtml += `<option VALUE="${supplierData[j].SupplierID}">${supplierData[j].SupplierName}</option>`; 
        }
        supplierHtml += `</select>` ;
        supplierHtml += `<input class="no-bottom-margin" pattern="[0-9]{1,5}" required tabindex="211" type="text" placeholder="Enter a Price." name="txtPrice">`;
        supplierHtml += `<input class="no-bottom-margin" pattern="[0-9]{1,5}" required tabindex="212" type="text" placeholder="Enter a Quantity." name="txtQuantity">`;    
        tabindex += 2;
    }
    supplierHtml += "<br/>"
    document.getElementById("supplierDiv").innerHTML = supplierHtml;
}
