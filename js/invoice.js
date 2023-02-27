//Requires JQUERY <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//Requires variables <script src="js/variables.js"></script> 
let pageTable = document.getElementById('myTable');
let invoiceData = tableData.invoice;
let customerData = tableData.customer;
customerData = customerData.filter(x => x.CustomerID == invoiceData[invoiceData.length - 1].CustomerID)[0];
console.log(customerData);
console.log(invoiceData[invoiceData.length - 1])



//build the display table
tableBuilder.invoiceTable(invoiceData[invoiceData.length - 1].InvoiceItems, pageTable);

//assign the variables
document.getElementById('lblCustomerName').innerHTML = customerData.CustomerFirst + ' ' + customerData.CustomerLast;
document.getElementById('lblCustomerAddress').innerHTML = customerData.CustomerAddress + ', ' +
customerData.CustomerCity + ', ' + customerData.CustomerProvince;
document.getElementById('lblCustomerPhone').innerHTML = '(' + customerData.CustomerPhone.substring(0,3) + ")" + " - " +
    customerData.CustomerPhone.substring(4,7) + ' - ' + customerData.CustomerPhone.substring(8);
document.getElementById('lblDate').innerHTML = invoiceData[invoiceData.length - 1].InvoiceDateTime;
document.getElementById('lblPaymentType').innerHTML = invoiceData[invoiceData.length - 1].PaymentType.map(x => x.Type).join(", ");
document.getElementById('tdSubTotal').innerHTML = '$' + invoiceData[invoiceData.length - 1].InvoiceSubTotal;
document.getElementById('tdTax').innerHTML = '$' + invoiceData[invoiceData.length - 1].InvoiceTax;
document.getElementById('tdTotal').innerHTML = '$' + invoiceData[invoiceData.length - 1].InvoiceTotal;