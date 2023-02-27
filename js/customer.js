//Requires JQUERY <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//Requires variables <script src="js/variables.js"></script> 

//Html elements
let btnContainterElement = document.getElementById('pagination-wrapper'); 
let pageTable = document.getElementById('myTable');
let userSearch = document.getElementById('searchText');

//page data
let customerData = tableData.customer;
//let UPCs = tableData.orderUPCs === null ? [] : tableData.orderUPCs;

//js variables
let pageIndex = 1;
let focusID;
let objectToUpdate;
let addEdit;

//boolean flags
let searchIsFocus = false;
let modalVisible = false;
let focusTrapped = false;

let test = tableData.customer;
var num = Math.max(...test.map(s => parseInt(s.CustomerID))) + 1;
console.log(num);
//initial page load
tableBuilder.customerTable(customerData, pageTable, btnContainterElement, pageIndex, 5);
loggedInUser();

//search function
function searchTable(searchString, customerArray, htmlTable, buttonContainer, currentPage){
    let data = searchTableData.customer.CustomerExistingData(customerArray, searchString);
    tableBuilder.customerTable(data, htmlTable, buttonContainer, currentPage, 5);
}

//event handlers
//on click navigate to paging index
$(document).on('click', ".pageButton", function(){
    $('#myTable').empty();
    pageIndex = $(this).val();
    searchTable(userSearch.value, customerData,  pageTable, btnContainterElement, pageIndex);
})

//on click navigate to prices
$(document).on('click', ".price", function(){
    let btnUPC = $(this).val();
    updatePageKeyData.price(btnUPC);
    navigation.price();
})

//on click, search by table heading
$('th').on('click', function(){
    $('#myTable').empty();
    sortHeaderFields(customerData, $(this));
    searchTable(userSearch.value, customerData, pageTable, btnContainterElement, pageIndex);
})

//event (filter) for when text input #userSearch recieves a key-up
$('#searchText').on('keyup', function(){
    searchTable($(this).val(), customerData,  pageTable, btnContainterElement, pageIndex);
    if (pageTable.innerHTML == "") {
        pageIndex = 1;
        searchTable($(this).val(), customerData,  pageTable, btnContainterElement, pageIndex);
    }
})

$(document).on('keydown', '.table-hover', function(event) {
    if (event.keyCode == 69){
        document.getElementById("btnEdit").click();
    } else if(event.keyCode == 65) { 
        document.getElementById("btn_add_popup").click();
    }
});

//sort headers on focus enter key
$('th').on('keydown', function(event){
    if(event.keyCode == 13){
        $('#myTable').empty();
        sortHeaderFields(customerData, $(this));
        searchTable(userSearch.value, customerData, pageTable, btnContainterElement, pageIndex);
    }
})
//#endregion

//#region Focus
async function FocusTableRow(tableRow){
    tableRow.focus();
    focusID = $(":focus").data('id');
    await timeout.custom(50);
    console.log(focusID)
    document.getElementById("btnEdit").hidden = false;
}

async function LeaveFocus(){
   await timeout.custom(101);
   document.getElementById("btnEdit").hidden = true;
}

function SearchFocus(){
    searchIsFocus = true;
}

function SearchLeaveFocus(){
    searchIsFocus = false;
}

function AddItem(){
    ClearForm();
    addEdit = "Add";
    modalVisible = true;
}

function ProcessForm(form){
    if (addEdit == "Add"){
        if(confirm("Ensure that all the customer detials you have entered are correct. Press OK to continue"))
        {
        AddInventory(form);
        }
    }else if (addEdit == "Edit"){
        if(confirm("Ensure that all the customer detials you have entered are correct. Press OK to continue"))
        {
        EditCustomer();
        }
    }
}

function AddInventory(form){
    let formData = new FormData(form);
    let newCustomer = Object.fromEntries(formData);
    newCustomer['CustomerID'] = Math.max(...test.map(s => parseInt(s.CustomerID))) + 1;
    newCustomer['CustomerFirst'] = document.getElementById("formCustomerFirst").value;
    newCustomer['CustomerLast'] = document.getElementById("formCustomerLast").value; 
    updateTableData.customer(customerData.concat(newCustomer));
    modalVisible = false;
}

function EditItem(){
    objectToUpdate = findObject.customer.CustomerID(focusID);
    document.getElementById("formCustomerFirst").value = objectToUpdate.CustomerFirst;
    document.getElementById("formCustomerLast").value = objectToUpdate.CustomerLast;
    document.getElementById("formCustomerPhone").value = objectToUpdate.CustomerPhone;
    document.getElementById("formCustomerAddress").value = objectToUpdate.CustomerAddress;
    document.getElementById("formCustomerCity").value = objectToUpdate.CustomerCity;
    document.getElementById("formCustomerProvince").value = objectToUpdate.CustomerProvince;
    document.getElementById("formCustomerPostal").value = objectToUpdate.CustomerPostal;
    addEdit = "Edit";
    modalVisible = true;
    document.getElementById('modalContainter').focus();
}

function EditCustomer(){
    objectToUpdate.CustomerFirst = document.getElementById("formCustomerFirst").value;
    objectToUpdate.CustomerLast = document.getElementById("formCustomerLast").value;
    objectToUpdate.CustomerAddress = document.getElementById("formCustomerAddress").value;
    objectToUpdate.CustomerCity = document.getElementById("formCustomerCity").value;
    objectToUpdate.CustomerProvince = document.getElementById("formCustomerProvince").value;
    objectToUpdate.CustomerPostal = document.getElementById("formCustomerPostal").value;
    objectToUpdate.CustomerPhone = document.getElementById("formCustomerPhone").value;
    customerData[customerData.findIndex(x => x.CustomerID == focusID)] = objectToUpdate;
    updateTableData.customer(customerData);
    modalVisible = false;
}

function ClearForm(){
    document.getElementById("formCustomerFirst").value = "";
    document.getElementById("formCustomerLast").value = "";
    document.getElementById("formCustomerPhone").value = "";
    document.getElementById("formCustomerAddress").value = "";
    document.getElementById("formCustomerCity").value = "";
    document.getElementById("formCustomerProvince").value = "";
    document.getElementById("formCustomerPostal").value = "";
}

function focusForm(){
    document.getElementById('formCustomerFirst').focus();
}

function focusCustomer(){
    document.getElementById('tr140').focus();
}