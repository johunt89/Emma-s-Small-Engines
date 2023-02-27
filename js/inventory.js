//Requires JQUERY <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//Requires variables <script src="js/variables.js"></script> 

//Html elements
let btnContainterElement = document.getElementById('pagination-wrapper'); 
let pageTable = document.getElementById('myTable');
let userSearch = document.getElementById('searchText');

//page data
let inventoryData = tableData.inventory;
let UPCs = tableData.orderUPCs === null ? [] : tableData.orderUPCs;

//js variables
let pageIndex = 1;
let focusUPC;
let objectToUpdate;
let addEdit;

//boolean flags
let searchIsFocus = false;
let modalVisible = false;
let focusTrapped = false;

//initial page load
tableBuilder.inventoryTable(inventoryData, pageTable, btnContainterElement, pageIndex, 5);
loggedInUser();

//search function
function searchTable(searchString, inventoryArray, htmlTable, buttonContainer, currentPage){
    let data = searchTableData.inventory.NameExistingData(inventoryArray, searchString);
    tableBuilder.inventoryTable(data, htmlTable, buttonContainer, currentPage, 5);
}

//event handlers
//on click navigate to paging index
$(document).on('click', ".pageButton", function(){
    $('#myTable').empty();
    pageIndex = $(this).val();
    searchTable(userSearch.value, inventoryData,  pageTable, btnContainterElement, pageIndex);
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
    sortHeaderFields(inventoryData, $(this));
    searchTable(userSearch.value, inventoryData, pageTable, btnContainterElement, pageIndex);
})

//event (filter) for when text input #userSearch recieves a key-up
$('#searchText').on('keyup', function(){
    searchTable($(this).val(), inventoryData,  pageTable, btnContainterElement, pageIndex);
    if (pageTable.innerHTML == "") {
        pageIndex = 1;
        searchTable($(this).val(), inventoryData,  pageTable, btnContainterElement, pageIndex);
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
    } else if(event.keyCode) { 
        addEdit = "Add";
        document.getElementById("btn_add_popup").click();
    }
});

//sort headers on focus enter key
$('th').on('keydown', function(event){
    if(event.keyCode == 13){
        $('#myTable').empty();
        sortHeaderFields(inventoryData, $(this));
        searchTable(userSearch.value, inventoryData, pageTable, btnContainterElement, pageIndex);
    }
})
//#endregion

//#region Focus
async function FocusTableRow(tableRow){
    tableRow.focus();
    focusUPC = $(":focus").data('id');
    await timeout.custom(50);
    console.log(focusUPC)
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

document.getElementById('searchText').addEventListener("focusout", SearchLeaveFocus());

function AddItem(){
    ClearForm();
    addEdit = "Add";
    modalVisible = true;
}

function ProcessForm(form){
    if (addEdit == "Add"){
        if(confirm("Ensure that all the product detials you have entered are correct. Press OK to continue"))
        {
        AddInventory(form);
        }
    }else if (addEdit == "Edit"){
        if(confirm("Ensure that all the product detials you have entered are correct. Press OK to continue"))
        {
        EditInventory();
        }
    }
}

function AddInventory(form){
    let formData = new FormData(form);
    let newInventoryItem = Object.fromEntries(formData);
    newInventoryItem['PriceAVG'] = 0;
    newInventoryItem['PriceRetail'] = 0;
    newInventoryItem['Current'] = 'Y';
    newInventoryItem['Stock'] = 0;
    updateTableData.inventory(inventoryData.concat(newInventoryItem));
    modalVisible = false;
}

function EditItem(){
    objectToUpdate = findObject.inventory.UPC(focusUPC);
    document.getElementById("formUPC").value = focusUPC;
    document.getElementById("formName").value = objectToUpdate.Name;
    document.getElementById("formSize").value = objectToUpdate.Size;
    document.getElementById("formQuantity").value = objectToUpdate.Quantity;
    addEdit = "Edit";
    modalVisible = true;
    document.getElementById('modalContainter').focus();
}

function EditInventory(){
    objectToUpdate.UPC = document.getElementById("formUPC").value;
    objectToUpdate.Name = document.getElementById("formName").value;
    objectToUpdate.Size = document.getElementById("formSize").value;
    objectToUpdate.Quantity = document.getElementById("formQuantity").value;
    inventoryData[inventoryData.findIndex(x => x.UPC == focusUPC)] = objectToUpdate;
    let newData = JSON.stringify(inventoryData);
    localStorage.setItem(tableStrings.inventory, newData);
    modalVisible = false;
}

function PopulateFormDataByUPC(){
    objectToUpdate = findObject.inventory.UPC(focusUPC);
    document.getElementById("formUPC").value = focusUPC;
    document.getElementById("formName").value = objectToUpdate.Name;
    document.getElementById("formSize").value = objectToUpdate.Size;
    document.getElementById("formQuantity").value = objectToUpdate.Quantity;
}

function ClearForm(){
    document.getElementById("formUPC").value = "";
    document.getElementById("formName").value = "";
    document.getElementById("formSize").value = "";
    document.getElementById("formQuantity").value = "";
}

function focusForm(){
    document.getElementById('formUPC').focus();
}

function focusInventory(){
    document.getElementById('tr140').focus();
}

function AddToOrderRequest(){
    if(focusUPC == "000-0000-0") {alert("You cannot add 'House' to order.");}
    else if(UPCs.includes(focusUPC)) {alert('Item is already in the order request.');}
    else 
    {
        alert('Added to request!');
        updateTableData.orderUPCs(UPCs.concat(focusUPC));
        UPCs = tableData.orderUPCs;
    }
}

console.log(tableData.orderUPCs)