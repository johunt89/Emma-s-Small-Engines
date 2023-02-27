//Requires JQUERY <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//Requires variables <script src="js/variables.js"></script> 

//Html elements
let btnContainterElement = document.getElementById('pagination-wrapper'); 
let pageTable = document.getElementById('myTable');
let pageTableCheckout = document.getElementById('myTableCheckout');
let userSearch = document.getElementById('search-text');

//page data
let inventoryData = tableData.inventory;
let priceData = tableData.price;
let cartData = tableData.cart === null ? [] : tableData.cart;
let invoiceData = tableData.invoice === null ? [] : tableData.invoice;

//js variables
let pageIndex = 1;
let tableSize = 6;
let focusUPC;
let objectToUpdate;
let addEdit;

//boolean flags
let searchIsFocus = false;
let modalVisible = false;
let focusTrapped = false;
let navigateToInvoice = false;

//Payment Variables
let cash = 0;
let debit = 0;
let credit = 0;
let cheque = 0;

//initial page load
tableBuilder.posInventoryTable(inventoryData, pageTable, btnContainterElement, pageIndex, tableSize);
tableBuilder.checkoutTable(cartData, pageTableCheckout);
calculateTotal();
loggedInUser();


//search function inventory table
function searchTable(searchString, inventoryArray, htmlTable, buttonContainer, currentPage){
    let data = searchTableData.inventory.NameExistingData(inventoryArray, searchString);
    tableBuilder.posInventoryTable(data, htmlTable, buttonContainer, currentPage, tableSize);
}

//event handlers
//on click navigate to paging index inventory
$(document).on('click', ".pageButton", function(){
    $('#myTable').empty();
    pageIndex = $(this).val();
    searchTable(userSearch.value, inventoryData,  pageTable, btnContainterElement, pageIndex);
})

//event (filter) for when text input #userSearch recieves a key-up
$('#search-text').on('keyup', function(){
    searchTable($(this).val(), inventoryData,  pageTable, btnContainterElement, pageIndex);
    if (pageTable.innerHTML == "") {
        pageIndex = 1;
        searchTable($(this).val(), inventoryData,  pageTable, btnContainterElement, pageIndex);
    }
})

$(document).on('click', ".btnAddToCart", async function(){
    resume();
    let itemToAddUPC = $(this).val();
    let objectToAdd = findObject.inventory.UPC(itemToAddUPC);
    let checkExists = cartData.find(x => x.UPC == itemToAddUPC);
    if (objectToAdd.Stock == 0) {
        alert("Item is out of stock, please submit an order request for the designated item.");
    }
    else if (checkExists == undefined) {
        cartData = cartData.concat(objectToAdd);
        updateTableData.cart(cartData);
        tableBuilder.checkoutTable(cartData, pageTableCheckout);
        calculateTotal();
        $('#divCart').removeClass("badBorder");
    }
    else {
        alert("Item is already in cart.");
    }
})

$(document).on('click', ".btnRemove", function(){
    cartData = cartData.filter(x => x.UPC != $(this).val()) 
    updateTableData.cart(cartData);
    tableBuilder.checkoutTable(cartData, pageTableCheckout);
    calculateTotal();
})

$(document).on('click', ".btnAddQnt", function(){
    let nbrBox = document.getElementById($(this).val());
    let upc = $(this).val().substring(3);
    if(findObject.inventory.UPC(upc).Stock == nbrBox.value * 1){
        alert("Item has no more stock to add.");
    }
    else {
        nbrBox.value = nbrBox.value * 1 + 1;
    }
    calculateTotal();
})

$(document).on('click', ".btnMinusQnt", function(){
    let nbrBox = document.getElementById($(this).val());
    if(nbrBox.value != 0){
        nbrBox.value = nbrBox.value * 1 - 1;
        calculateTotal();
    }
})

function calculateTotal(){
    if(cartData !== null){
        let runTotal = 0;
        cartData.forEach( item => {
            runTotal += item.PriceRetail * document.getElementById(`nbr${item.UPC}`).value;
        })
        document.getElementById("lblSubtotal").innerHTML = `$${runTotal.toFixed(2)}`;
        document.getElementById("lblTax").innerHTML = `$${(runTotal * .13).toFixed(2)}`;
        document.getElementById("lblTotal").innerHTML = `$${(runTotal * 1.13).toFixed(2)}`;
    }
}

var customers = tableData.customer;
var filteredCustomers = [...customers];
var htmlList = document.getElementById('customer-names');

function populatCustomers(){
    htmlList.innerHTML = "";
    filteredCustomers.forEach(function(item){
        let option = `<option data-value="${item.CustomerID}" name="custOption" value="${item.CustomerFirst} ${item.CustomerLast}"></option>`
        htmlList.innerHTML += option;
     });
}

populatCustomers();

$( ".customer-list" ).change(function() {
    resume();
    document.getElementById("lblCart").innerHTML = `${$(".customer-list").val()}'s Cart`;
    $('#customer-list').removeClass("badBorder");
    if($(this).val() == "") {document.getElementById("lblCart").innerHTML = `Cart`;}
    else if (!filteredCustomers.map(x=> x.CustomerFirst + ' ' + x.CustomerLast).includes($(".customer-list").val()))
    {
        document.getElementById("lblCart").innerHTML = `Cart`;
        alert("Invalid Customer Selection. Please choose a customers from the list.");
        document.getElementById('customer-list').value = "";
    }
});

async function Checkout(){
    let amountElement = document.getElementById('txtAmount');
    let paymentAmount = amountElement.value * 1;
    let totalAmount = document.getElementById('lblTotal').innerHTML.substring(1) * 1;
    let payElement = document.getElementById("lblPaid");
    let paid = payElement.innerHTML.substring(1) * 1;
    let payType = $('input[name="chkPay"]:checked').val();
    if(navigateToInvoice){
        navigation.invoiceNewWindow();
    }else {
        if($(".customer-list").val() == ""){
            $('#customer-list').addClass("badInput badBorder");

            setTimeout(function() {
                $('#customer-list').removeClass('badInput');
            }, 500);
        }
        else if (cartData.length == 0){
            $('#divCart').addClass("badInput badBorder");

            setTimeout(function() {
                $('#divCart').removeClass('badInput');
            }, 500);
        }
        else if ($('input[name="chkPay"]:checked').length == 0){
            $('.payment-containter').addClass("badInput badBorder");
            setTimeout(function() {
                $('.payment-containter').removeClass('badInput');
            }, 500);
        }
        else {
            if(paymentAmount == "") {
                $('#txtAmount').addClass("badInput badBorder");
                setTimeout(function() {
                    $('#txtAmount').removeClass('badInput');
                }, 500);
            }
            else if (isNaN(paymentAmount)){
                alert("Payment amount entered is invalid, please check that the information is correct.");
                $('#txtAmount').addClass("badInput badBorder");
                setTimeout(function() {
                    $('#txtAmount').removeClass('badInput');
                }, 500);
            }
            else if (paymentAmount < totalAmount - paid){
                if(confirm("Payment amount is less than total, would you like to do a split tender? If no, press cancel to go back, and enter the correct amount.")){
                    if(payType == "Cash"){
                        cash += paymentAmount;
                        payElement.innerHTML = `$${(paid + paymentAmount).toFixed(2)}`;
                    } else if (payType == "Credit"){
                        credit += paymentAmount;
                        payElement.innerHTML = `$${(paid + paymentAmount).toFixed(2)}`;
                    }else if (payType == "Debit"){
                        debit += paymentAmount;
                        payElement.innerHTML = `$${(paid + paymentAmount).toFixed(2)}`;
                    }else if (payType == "Cheque") {
                        cheque += paymentAmount;
                        payElement.innerHTML = `$${(paid + paymentAmount).toFixed(2)}`;
                    }
                    document.getElementById('lblChangeHeader').innerHTML = "Remainder: "
                    document.getElementById('lblChange').innerHTML = '$' + (totalAmount - cash - debit - credit - cheque).toFixed(2); 
                }
            }
            else if (payType != "Cash" && paymentAmount > totalAmount - paid){
                alert("For any payment method that is not cash, please ensure that payment amount does not exceed the remaining total.");
                $('#txtAmount').addClass("badInput badBorder");
                setTimeout(function() {
                    $('#txtAmount').removeClass('badInput');
                }, 500);
            }
            else 
            {
                if(confirm("Ensure that cart items and payment details are correct. Press 'ok' to confirm transaction.?")){
                    if(payType == "Cash"){
                        cash += totalAmount - paid;
                        payElement.innerHTML = `$${(paid + paymentAmount).toFixed(2)}`;
                        makeChange((document.getElementById('txtAmount').value * 1) - cash);
                    } else if (payType == "Credit"){
                        credit += totalAmount - paid;
                        payElement.innerHTML = `$${(paid + paymentAmount).toFixed(2)}`;
                        makeChange(0);
                    }else if (payType == "Debit"){
                        debit += totalAmount - paid;
                        payElement.innerHTML = `$${(paid + paymentAmount).toFixed(2)}`;
                        makeChange(0);
                    }else if (payType == "Cheque") {
                        cheque += totalAmount - paid;
                        payElement.innerHTML = `$${(paid + paymentAmount).toFixed(2)}`;
                        makeChange(0);
                    }
                    var cartItems = [];
                    cartData.forEach(item => {
                        item['ItemQuantity'] = document.getElementById(`nbr${item.UPC}`).value * 1;
                        cartItems.push(item);
                    })
                    var payTypes = [{'Type': "Cash", 'Amount': cash}, {'Type': "Credit", 'Amount' : credit}, 
                        {'Type': "Debit", 'Amount': debit}, {'Type': "Cheque", 'Amount' : cheque}].filter(x => x.Amount != 0);
                    console.log(payTypes);
                    let itemsToAdd = cartItems.filter(x => x.ItemQuantity != 0);

                    let invoiceObject = {'InvoiceNumber' : document.getElementById("lblOrderNumber").innerHTML.substring(1) * 1,
                        'CustomerName' : $(".customer-list").val(),
                        'CustomerID' : $('#customer-names [value="' + $(".customer-list").val() + '"]').data('value'),
                        'InvoiceItems' : itemsToAdd,
                        'InvoiceSubTotal' : document.getElementById("lblSubtotal").innerHTML.substring(1) * 1,
                        'InvoiceTax' : document.getElementById('lblTax').innerHTML.substring(1) * 1,
                        'InvoiceTotal' : document.getElementById('lblTotal').innerHTML.substring(1) * 1,
                        'InvoiceDateTime' : document.getElementById('datetime').innerHTML,
                        'Appreciation' : (document.getElementById("lblSubtotal").innerHTML.substring(1) * 1 * 0.02).toFixed(2) * 1,
                        'PaymentType' : payTypes
                    }
                    console.log(invoiceObject);
                    invoiceData = invoiceData.concat(invoiceObject);
                    updateTableData.invoice(invoiceData);
                    navigateToInvoice = true;
                    document.getElementById('btnCheckout').innerHTML = "View Invoice";  
                    document.getElementById('lblCart').innerHTML = "Cart";
                    document.getElementById("txtAmount").value = "";
                    $('input[name="chkPay"]:checked').prop("checked", false);
                    document.getElementById('customer-list').value = "";
                    document.getElementById("txtPhoneSearch").value = "";


                    for(let i = 0; i < itemsToAdd.length; i++){
                        var filteredPrices = priceData.filter(x => x.UPC == itemsToAdd[i].UPC).filter(x => x.Stock > 0)
                        var remainder = itemsToAdd[i].ItemQuantity;
                        for (let j = 0; j < filteredPrices.length; j++){
                            if (remainder ==0 ) break;
                            if(filteredPrices[j].Stock >= remainder){
                                filteredPrices[j].Stock = filteredPrices[j].Stock - remainder;
                                priceData[priceData.map(x => x.PriceID).indexOf(filteredPrices[j].PriceID)] = filteredPrices[j];
                                console.log(priceData[priceData.map(x => x.PriceID).indexOf(filteredPrices[j].PriceID)]);
                                updateTableData.price(priceData); 
                                break;
                            }else {
                                remainder = remainder - filteredPrices[j].Stock;
                                filteredPrices[j].Stock = 0; 
                            }
                            priceData[priceData.map(x => x.PriceID).indexOf(filteredPrices[j].PriceID)] = filteredPrices[j];
                            console.log(priceData[priceData.map(x => x.PriceID).indexOf(filteredPrices[j].PriceID)]);
                            updateTableData.price(priceData);
                        }
                    }
                    updateTableData.price(priceData);

                    for(let i = 0; i < inventoryData.length; i++){
                        inventoryData[i].Stock = priceData.filter(x=> x.UPC == inventoryData[i].UPC).reduce((total, next) => total + next.Stock, 0);
                    }

                    cartData = []; 
                    updateTableData.cart(cartData);
                    tableBuilder.checkoutTable(cartData, pageTableCheckout);
                    tableBuilder.posInventoryTable(inventoryData, pageTable, btnContainterElement, pageIndex, tableSize);
                }
                else {
        
                }
            }
        }
    }
}

function makeChange(num){
    if(document.getElementById('lblChangeHeader').innerHTML != "Change"){
        document.getElementById('lblChangeHeader').innerHTML = "Change";
    }    
    document.getElementById('lblChange').innerHTML = '$' + num.toFixed(2); 
}

//handle checkboxes
$(".chkPayment").change(function () {
    resume();
    $(".chkPayment").not(this).prop('checked', false);
    $('.payment-containter').removeClass("badBorder");
});

$("#txtPhoneSearch").on('keyup', function () {
    filteredCustomers = customers.filter(x => x.CustomerPhone.substring(8).includes(document.getElementById("txtPhoneSearch").value))
    populatCustomers();
});

function resume(){
    navigateToInvoice = false;
    document.getElementById('btnCheckout').innerHTML = "Checkout";
}

function clearPos(){
    console.log("mayb");
    navigateToInvoice = false;
    document.getElementById('btnCheckout').innerHTML = "Checkout";  
    document.getElementById('lblCart').innerHTML = "Cart";
    document.getElementById("txtAmount").value = "";
    $('input[name="chkPay"]:checked').prop("checked", false);
    document.getElementById('customer-list').value = "";
    document.getElementById("txtPhoneSearch").value = "";
    cartData = []; 
    cash = 0;
    credit = 0;
    cheque = 0;
    debit = 0;
    updateTableData.cart(cartData);
    tableBuilder.checkoutTable(cartData, pageTableCheckout);
    document.getElementById('txtAmount').value = "";
    document.getElementById('lblChange').innerHTML = (0).toFixed(2);
    document.getElementById('lblSubtotal').innerHTML = (0).toFixed(2);
    document.getElementById('lblTax').innerHTML = (0).toFixed(2);
    document.getElementById('lblTotal').innerHTML = (0).toFixed(2);
    document.getElementById('lblPaid').innerHTML = (0).toFixed(2);
}

function populateCustomerData(){
    var customer = tableData.customer.find(x => x.CustomerID == $('#customer-names [value="' + $(".customer-list").val() + '"]').data('value'));
    document.getElementById('formName').value = `${customer.CustomerFirst} ${customer.CustomerLast}`;
    document.getElementById('formPhone').value = customer.CustomerPhone;
    document.getElementById('formAddress').value = `${customer.CustomerAddress}, ${customer.CustomerCity}, ${customer.CustomerProvince} `;
    document.getElementById('formPostal').value = customer.CustomerPostal;
}

function customerAdd() {
    document.querySelector('.secondPopup').style.display = 'flex';
    document.getElementById('formCustomerFirst').focus();
}

function closePopup(){
    document.querySelector('.secondPopup').style.display = 'none';
    ClearForm();
}

function addCustomerCrud(){
    customers = tableData.customer;
    let id = Math.max(...customers.map(s => parseInt(s.CustomerID))) + 1;
    let first = document.getElementById("formCustomerFirst").value;
    let last = document.getElementById("formCustomerLast").value; 
    let phone = document.getElementById("formCustomerPhone").value;
    let address = document.getElementById("formCustomerAddress").value;
    let city = document.getElementById("formCustomerCity").value;
    let postal = document.getElementById("formCustomerPostal").value;
    let newCustomer = [{"CustomerID":id, 'CustomerFirst':first, 'CustomerLast':last, 'CustomerPhone':phone, 'CustomerAddress':address, 'CustomerCity':city, 'CustomerPostal': postal}]
    updateTableData.customer(customers.concat(newCustomer));
    customers = customers.concat(newCustomer);
    filteredCustomers = filteredCustomers.concat(newCustomer);
    htmlList.innerHTML += `<option data-value="${id}" name="custOption" value="${first} ${last}"></option>`;
    document.getElementById('customer-names').selectedIndex = customers.length;
    document.querySelector('.secondPopup').style.display = 'none';
    ClearForm();
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

function focusForm() {
    document.getElementById('formCustomerFirst').focus();
}