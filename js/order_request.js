//Field Variables
let inventoryNames = [];
let unreceivedOrdersString = tableStrings.unreceivedOrders;
let orderData = tableData.orderUPCs;
let upcData = tableData.orderUPCs;
let inventoryData = tableData.inventory;
let test = tableData.orderRequest;
let orderRequestNumber = Math.max(...test.map(s => parseInt(s.RequestID))) + 1;
let unreceivedOrders = tableData.unreceivedOrders;

if (unreceivedOrders === null){
    updateTableData.unreceivedOrders(JSON.stringify([]));
}

//Populate INT IDENTITY ID
document.getElementById('lblID').innerHTML =  orderRequestNumber;
populateDivs();
loggedInUser();
//Populate Div with items
function populateDivs(){
    let htmlTest = "";
    let tabindex = 110  ;
    if(upcData !== null){
        for(let i = 0; i < upcData.length; i++){
            inventoryNames.push(inventoryData.filter(x => x.UPC == upcData[i])[0].Name);
            htmlTest += `<label><b>Item Name: </b></label>`;
            htmlTest += `<label class="label">${inventoryNames[i]} </label>`;
            htmlTest += `<label><b>Include Item: </b></label>`;
            htmlTest += `<input type="checkbox" class="chkIsSelected" tabindex="${tabindex}" name="checkbox" id="checkbox_id${i}" value="${upcData[i]}" checked>`;
            htmlTest += `<label><b>Quantity: </b></label>`;
            htmlTest += `<select tabindex="210" class="cboQuantity" id="formCbo${upcData[i]}" name="UPC" required>`;
            for(var j = 1; j < 21; j++){
                htmlTest += `<option VALUE="${[j]}">${j}</option>`; 
            }
            htmlTest +=`</select> <br/><br/>`
            tabindex +3;
        }
        document.getElementById('itemDiv').innerHTML = htmlTest;
    }
}

function populateCboBox(){
    let supplierData = JSON.parse(localStorage.getItem("supplierTable"));
    let cboHtml = `<select tabindex="210" class="cboSupName" id="formCboPriceSupplier" name="cboStock" required>` +
        `   <option>Choose a supplier:</option>`;
    
    for(var i = 0; i < supplierData.length; i++){
        cboHtml += `<option VALUE="${supplierData[i].SupplierID}">${supplierData[i].SupplierName}</option>`; 
    }
    cboHtml += `</select>` ;
    document.getElementById("cboDiv").innerHTML = cboHtml;
}

function clearUPC(){
    updateTableData.orderUPCs(JSON.stringify([]));
    location.reload();
}

function submitOrder(){
    let description = document.getElementById("txtDescription").value;
    if(description == ""){
        alert("Please enter a description.");
    }else if (upcData == ""){
        alert('Please go back to the inventory page, and select an item to add to your order.');
    }else {
        let upcArray = [];
        let stockArray = [];
        $("input:checkbox[name=checkbox]:checked").each(function(){
            upcArray.push($(this).val());
            console.log(upcArray);
        });
        $("select").each(function(){
            stockArray.push($(this).val())
            console.log(stockArray);
        });
        let orderToSend = [{'RequestID':orderRequestNumber, 'UPCarr':upcArray, 'StockArr':stockArray}];
        let oldData = JSON.parse(localStorage.getItem(unreceivedOrdersString));
        localStorage.setItem(unreceivedOrdersString, JSON.stringify(oldData.concat(orderToSend)));
        let orderToAdd = {'RequestID':orderRequestNumber, 'OrderItems':'Array', 'OrderItemIDs':upcArray, 'OrderDescription':description, 'OrderCost':0, 'OrderSent':'Not Sent', 'OrderReceived':'', 'OrderNumber':''};
        let oldOrderData = JSON.parse(localStorage.getItem(orderStorageString));
        localStorage.setItem(orderStorageString, JSON.stringify(oldOrderData.concat(orderToAdd)));
        alert("Order Request has been sent successfully!");
        refreshNames();
        clearUPC();
    }
}

function refreshNames(){

    let unalteredOrderData = JSON.parse(localStorage.getItem(orderStorageString));
    for(let i = 0; i < unalteredOrderData.length; i++){
        let itemNames = "";
        for(let j = 0; j < unalteredOrderData[i].OrderItemIDs.length; j++){
            itemNames += inventoryData.filter(x => x.UPC == unalteredOrderData[i].OrderItemIDs[j])[0].Name + ", ";
        }
        unalteredOrderData[i].OrderItems = itemNames.slice(0, -2);
        console.log(unalteredOrderData);
    }
    localStorage.setItem(orderStorageString, JSON.stringify(unalteredOrderData));
}