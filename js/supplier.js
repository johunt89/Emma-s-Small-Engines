//Requires JQUERY <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//Requires variables <script src="js/variables.js"></script> 

//Html elements
let btnContainterElement = document.getElementById('pagination-wrapper'); 
let pageTable = document.getElementById('myTable');
let userSearch = document.getElementById('searchText');

//page data
let supplierData = tableData.supplier;

//js variables
let focusID;
let addEdit;
let objectToUpdate;
let pageIndex = 1;
let modalVisibleFlag = false;

//boolean flags
let focusTrapped = false;
let modalVisible = false;
let searchIsFocus = false;

//initial page load
tableBuilder.supplierTable(supplierData, pageTable, btnContainterElement, pageIndex, 5);
loggedInUser();

//search function
function searchTable(searchString, supplierArray, htmlTable, buttonContainer, currentPage){
    let data = searchTableData.supplier.SupplierExistingData(supplierArray, searchString);
    tableBuilder.supplierTable(data, htmlTable, buttonContainer, currentPage, 5);
}

//#region Event Handlers

$(document).on('click', ".pageButton", function(){
    $('#myTable').empty();
    pageIndex = $(this).val();
    searchTable(userSearch.value, supplierData,  pageTable, btnContainterElement, pageIndex);
})

//event (sort) for when *any* column header is clicked
$('th').on('click', function(){
    $('#myTable').empty();
    sortHeaderFields(supplierData, $(this));
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
    if(event.keyCode == 79) { 
       let focusElementID = $(":focus").data('id');
       let name = $(`td[name="Name-${focusElementID}"]`).html();
       alert(`${name} has been added to order request.`);
    }else if (event.keyCode == 69){
        addEdit = "Edit";
        document.getElementById("btnEdit").click();
    } else if(event.keyCode == 65 && !modalVisibleFlag && !searchIsFocus) {
        addEdit = "Add"; 
        document.getElementById("btn_add_popup").click();
    }
});


//sort headers on focus enter key
$('th').on('keydown', function(event){
    if(event.keyCode == 13){
        $('#myTable').empty();
        sortHeaderFields(supplierData, $(this));
        searchTable(userSearch.value, supplierData, pageTable, btnContainterElement, pageIndex);
    }
})
//#endregion

//#region Focus
async function FocusTableRow(tableRow){
    tableRow.focus();
    lastFocusSupplierID = $(":focus").data('id');
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
    addEditFlag = "Add";
    modalVisibleFlag = true;
}

function ProcessForm(form){
    if (addEditFlag == "Add"){
        if(confirm("Ensure that all the Supplier detials you have entered are correct. Press OK to continue"))
        {
        AddInventory(form);
        }
    }else if (addEditFlag == "Edit"){
        if(confirm("Ensure that all the supplier detials you have entered are correct. Press OK to continue"))
        {
        EditInventory();
        }
    }
}

function AddInventory(form){
    let formData = new FormData(form);
    let newSupplierItem = Object.fromEntries(formData);
    newSupplierItem['SupplierID'] = Math.max(...supplierData.map(s => parseInt(s.SupplierID))) + 1; //simulate INT IDENTITY
    let testArr = JSON.stringify(supplierData.concat(newSupplierItem));
    localStorage.setItem(tableStrings.supplier, testArr);
    supplierData = JSON.parse(localStorage.getItem(tableStrings.supplier));
    modalVisibleFlag = false;
}

function EditItem(){
    objectToUpdate = supplierData.find(x => x.SupplierID == lastFocusSupplierID);
    document.getElementById("formSupplierName").value = objectToUpdate.SupplierName;
    document.getElementById("formSupplierPhone").value = objectToUpdate.SupplierPhone;
    document.getElementById("formSupplierEmail").value = objectToUpdate.SupplierEmail;
    document.getElementById("formSupplierAddress").value = objectToUpdate.SupplierAddress;
    document.getElementById("formSupplierCity").value = objectToUpdate.SupplierCity;
    document.getElementById("formSupplierProvince").value = objectToUpdate.SupplierProvince;
    document.getElementById("formSupplierPostal").value = objectToUpdate.SupplierPostal;
    addEditFlag = "Edit";
    modalVisibleFlag = true;
    document.getElementById('modalContainter').focus();
}

function EditInventory(){
    objectToUpdate.SupplierName = document.getElementById("formSupplierName").value;
    objectToUpdate.SupplierPhone = document.getElementById("formSupplierPhone").value;
    objectToUpdate.SupplierEmail = document.getElementById("formSupplierEmail").value;
    objectToUpdate.SupplierAddress = document.getElementById("formSupplierAddress").value;
    objectToUpdate.SupplierCity = document.getElementById("formSupplierCity").value;
    objectToUpdate.SupplierProvince = document.getElementById("formSupplierProvince").value;
    objectToUpdate.SupplierPostal = document.getElementById("formSupplierPostal").value;
    supplierData[supplierData.map(o => o.SupplierID).indexOf(lastFocusSupplierID)] = objectToUpdate;
    let newData = JSON.stringify(supplierData);
    localStorage.setItem(tableStrings.supplier, newData);
    supplierData = JSON.parse(localStorage.getItem(tableStrings.supplier));
    modalVisibleFlag = false;
}

function PopulateFormDataBySupplierID(){
    let objectToUpdate = supplierData.find(x => x.SupplierID == lastFocusSupplierID);
    document.getElementById("formSupplierID").value = lastFocusSupplierID;
    document.getElementById("formSupplierName").value = objectToUpdate.SupplierID;
    document.getElementById("formSupplierPhone").value = objectToUpdate.SupplierPhone;
    document.getElementById("formQuantity").value = objectToUpdate.Quantity;
}

function ClearForm(){
    document.getElementById("formSupplierName").value = "";
    document.getElementById("formSupplierPhone").value = "";
    document.getElementById("formSupplierEmail").value = "";
    document.getElementById("formSupplierAddress").value = "";
}

function focusForm(){
    document.getElementById('formSupplierName').focus();
}

function focusInventory(){
    document.getElementById('tr140').focus();
}
//#endregion

//#endregion