const tableStrings = {
    cart : "cartTable",
    customer: "customerTable",
    inventory : "inventoryTable",
    invoice : "invoiceTable",
    orderRequests : "order_requestsTable",
    orderUPCs : "orderUPCs",
    price : "priceTable",
    supplier : "supplierTable",
    unreceivedOrders : "unreceivedOrders",
    employee: "employeeTable",
    loggedIn: "username",
    salesReport: "salesReport",
    empLogin : "employeeLogIn",
    reportdata: "reportdataTable"
}

const tableData = {
    cart : JSON.parse(localStorage.getItem(tableStrings.cart)),
    customer : JSON.parse(localStorage.getItem(tableStrings.customer)),
    inventory : JSON.parse(localStorage.getItem(tableStrings.inventory)),
    invoice : JSON.parse(localStorage.getItem(tableStrings.invoice)),
    orderRequest : JSON.parse(localStorage.getItem(tableStrings.orderRequests)),
    orderUPCs : JSON.parse(localStorage.getItem(tableStrings.orderUPCs)),
    price : JSON.parse(localStorage.getItem(tableStrings.price)),
    supplier : JSON.parse(localStorage.getItem(tableStrings.supplier)),
    unreceivedOrders : JSON.parse(localStorage.getItem(tableStrings.unreceivedOrders)),
    employee : JSON.parse(localStorage.getItem(tableStrings.employee)),
    loggedIn : JSON.parse(localStorage.getItem(tableStrings.loggedIn)),
    salesReport : JSON.parse(localStorage.getItem(tableStrings.salesReport)),
    empLogin : JSON.parse(localStorage.getItem(tableStrings.empLogin)),
    report : JSON.parse(localStorage.getItem(tableStrings.reportdata))
}

const updateTableData = {
    cart : function setCart(cartObjectArray){
        localStorage.setItem(tableStrings.cart, JSON.stringify(cartObjectArray));
    },
    customer : function setCustomer(customerObjectArray){
        localStorage.setItem(tableStrings.customer, JSON.stringify(customerObjectArray));
    },
    inventory : function setInventory(inventoryObjectArray){
        localStorage.setItem(tableStrings.inventory, JSON.stringify(inventoryObjectArray));
    },
    invoice : function setInventory(invoiceObjectArray){
        localStorage.setItem(tableStrings.invoice, JSON.stringify(invoiceObjectArray));
    },
    orderRequests : function setOrderRequests(orderRequestObjArray){
        localStorage.setItem(tableStrings.orderRequests, JSON.stringify(orderRequestObjArray));
    },
    orderUPCs : function setOrderUPCs(upcArray){
        localStorage.setItem(tableStrings.orderUPCs, JSON.stringify(upcArray));
    },
    price : function setPrice(priceArray){
        localStorage.setItem(tableStrings.price, JSON.stringify(priceArray));
    },
    supplier : function setSupplier(supplierArray){
        localStorage.setItem(tableStrings.supplier, JSON.stringify(supplierArray));
    },
    unreceivedOrders : function setUnreceivedOrders(ordersArray){
        localStorage.setItem(tableStrings.unreceivedOrders, JSON.stringify(ordersArray));
    },
    employee : function setEmployee(employeeArray){
        localStorage.setItem(tableStrings.employee, JSON.stringify(employeeArray));
    },
    loggedIn : function setLoggedIn(loggedInArray){
        localStorage.setItem(tableStrings.loggedIn, JSON.stringify(loggedInArray));
    },
    salesReport : function setSalesReport(salesReportArray){
        localStorage.setItem(tableStrings.salesReport, JSON.stringify(salesReportArray));
    },    
    report : function report(reportArray){
        localStorage.setItem(tableStrings.reportdata, JSON.stringify(reportArray));
    }
}

const updateFields = {
    price : {
        SupplierNameByID : function() {
            let priceData = tableData.price;
            for(let i = 0; i < priceData.length; i++){
                priceData[i].Supplier = searchTableData.supplier.SupplierExistingData(supplierData, priceData[i].SupplierID)[0].SupplierName;
            }
            updateTableData.price(priceData);
        }
    }
}

const searchTableData = {
    customer :{
        Customer : function filterSupplier(searchString){
            return searchString != "" ? tableData.customer.filter(x=> x.CustomerID == searchString || 
                x.CustomerFirst.toLowerCase().includes(searchString.toLowerCase()) || 
                x.CustomerLast.toLowerCase().includes(searchString.toLowerCase())) : tableData.customer;
        },
        CustomerExistingData : function filterSupplier(existingData, searchString){
            return searchString != "" ? existingData.filter(x=> x.CustomerID == searchString || 
                x.CustomerFirst.toLowerCase().includes(searchString.toLowerCase()) || 
                x.CustomerLast.toLowerCase().includes(searchString.toLowerCase())) : existingData;
        }
    },
    inventory : { 
        Name : function filterInventory(searchString){
            return tableData.inventory.filter(d => d.Name.toLowerCase().includes(searchString.toLowerCase()));
        },
        NameExistingData : function filterInventory(existingData, searchString){
            return searchString != "" ? existingData.filter(x=> x.UPC.includes(searchString) || 
                x.Name.toLowerCase().includes(searchString.toLowerCase())) : existingData;
        }
    },
    supplier : {
        Supplier : function filterSupplier(searchString){
            return searchString != "" ? tableData.supplier.filter(x=> x.SupplierID == searchString || 
                x.SupplierName.toLowerCase().includes(searchString.toLowerCase()) || 
                x.SupplierEmail.toLowerCase().includes(searchString.toLowerCase()) ||
                x.SupplierPhone.includes(searchString) ||
                x.SupplierAddress.toLowerCase().includes(searchString.toLowerCase())) : existingData;
        },
        SupplierExistingData : function filterSupplier(existingData, searchString){
            return searchString != "" ? existingData.filter(x=> x.SupplierID == searchString || 
                x.SupplierName.toLowerCase().includes(searchString.toLowerCase()) || 
                x.SupplierEmail.toLowerCase().includes(searchString.toLowerCase()) ||
                x.SupplierPhone.includes(searchString) ||
                x.SupplierAddress.toLowerCase().includes(searchString.toLowerCase())) : existingData;
        }
    },
    orderRequest : {
        OrderRequest : function filterSupplier(existingData, searchString){
            return searchString != "" ? tableData.orderRequest.filter(x=> x.RequestID == searchString || 
            x.OrderItems.toLowerCase().includes(searchString.toLowerCase()) || 
            x.OrderSent.toLowerCase().includes(searchString.toLowerCase())) : existingData;
        },
        OrderRequestExistingData : function filterSupplier(existingData, searchString){
                return searchString != "" ? existingData.filter(x=> x.RequestID == searchString || 
                x.OrderItems.toLowerCase().includes(searchString.toLowerCase()) || 
                x.OrderSent.toLowerCase().includes(searchString.toLowerCase())) : existingData;
        }
    }
}

const findObject = {
    cart : {
        UPC : function findCartItemByUPC(UPC){
            return tableData.cart.find(x => x.UPC == UPC)
        }
    },
    customer : {
        CustomerID : function findCustomerByID(CustomerID){
            return tableData.customer.find(x => x.CustomerID == CustomerID)
        },
        EmployeeID : function findEmployeeByID(EmployeeID){
            return tableData.employee.find(x => x.EmployeeID == EmployeeID)
        }
    }
    ,
    inventory : {
        UPC : function findInventoryByUPC(UPC){
            return tableData.inventory.find(x => x.UPC == UPC)
        }
    }
}

const pageKeyStrings = {
    price : "priceUPC"
}

const pageKeyData = {
    price : localStorage.getItem(pageKeyStrings.price)
}

const updatePageKeyData = {
    price : function setPriceKey(key) {
        localStorage.setItem(pageKeyStrings.price, key);
    }
}

const tableBuilder = {
    state : function state(objArr, currentPage, rows)
    {
        return {
            'querySet':objArr,
            'page':currentPage,
            'rows':rows
        }
    },
    pagination : function pagination(objArr, currentPage, rows){
        let stateObj = tableBuilder.state(objArr, currentPage, rows);
        let trimStart = (stateObj.page - 1) * stateObj.rows;
        let trimEnd = trimStart + stateObj.rows;
        let trimmedData = stateObj.querySet.slice(trimStart, trimEnd);
    
        let pages = Math.ceil(stateObj.querySet.length / stateObj.rows);
        return {
            'querySet':trimmedData,
            'pages':pages
        };
    },
    pageButtons : function pageButtons(pageNumbers, containerElement, currentPage){
        let wrapper = containerElement;
        wrapper.innerHTML = '';
        let minPage = currentPage - 2 > 0 ? currentPage -2 : 1 ;
        //let maxPage = currentPage + 2 < pageNumbers ? currentPage + 2 : pageNumbers;
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
            wrapper.innerHTML += `<button disabled value=0 class="pageButton btn btn-sm btn-info">0</button>`;
        }
    },
    checkoutTable : function buildTable(tableData, htmlTable){
        let data = tableData;
        htmlTable.innerHTML = "";
        let counter = 250;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].UPC}" name="trID" tabindex="${counter}" class="table-hover">
                            <td name="Name-${data[i].UPC}">${data[i].Name}</td>
                            <td name="PriceRetail-${data[i].UPC}">$${(data[i].PriceRetail).toFixed(2)}</td>
                            <td name="Quantity-${data[i].UPC}">
                                <div class="quantity-container">
                                    <button name="${data[i].UPC}" value="nbr${data[i].UPC}" tabindex="${counter + 1}" class="btnMinusQnt">-</button>
                                    <input type="number" id="nbr${data[i].UPC}" class="nmbQuantity" value="1" name="nmbQuantity" min="0"  max="5">
                                    <button name="${data[i].UPC}" value="nbr${data[i].UPC}" tabindex="${counter + 2}" class="btnAddQnt">+</button>
                                </div>
                            </td>
                            <td name="Remove-${data[i].UPC}"><button value="${data[i].UPC}" tabindex="${counter+3}" class="btnRemove">X</button></td>
                      </tr>`;
                      counter += 4;
                      htmlTable.innerHTML += row;
        }
    },
    customerTable : function buildTable(tableData, htmlTable, buttonContainer, currentPage, rows){
        let paginationObj = tableBuilder.pagination(tableData, currentPage, rows);
        let data = paginationObj.querySet;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].CustomerID}" name="trID" tabindex="${counter}" onclick="FocusTableRow(this);" onfocus="FocusTableRow(this  )" onfocusout="LeaveFocus()" class="table-hover">
                            <td name="CustomerID-${data[i].CustomerID}" data-id="${data[i].CustomerID}">${data[i].CustomerID}</td>
                            <td name="CustomerFirst-${data[i].CustomerID}">${data[i].CustomerFirst}</td>
                            <td name="CustomerLast-${data[i].CustomerID}">${data[i].CustomerLast}</td>
                            <td name="CustomerAddress-${data[i].CustomerID}">${data[i].CustomerAddress}</td>
                            <td name="CustomerCity-${data[i].CustomerID}">${data[i].CustomerCity}</td>
                            <td name="CustomerProvince-${data[i].CustomerID}">${data[i].CustomerProvince}</td>
                            <td name="CustomerPostal-${data[i].CustomerID}">${data[i].CustomerPostal}</td>
                            <td name="CustomerPhone-${data[i].CustomerID}">${data[i].CustomerPhone}</td>
                      </tr>`;
                      counter += 2;
                      htmlTable.innerHTML += row;
        }
        tableBuilder.pageButtons(paginationObj.pages, buttonContainer, currentPage);
    },
    inventoryTable : function buildTable(tableData, htmlTable, buttonContainer, currentPage, rows){
        let paginationObj = tableBuilder.pagination(tableData, currentPage, rows);
        let data = paginationObj.querySet;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].UPC}" name="trID" tabindex="${counter}" onclick="FocusTableRow(this);" onfocus="FocusTableRow(this  )" onfocusout="LeaveFocus()" class="table-hover">
                            <td name="UPC-${data[i].UPC}" data-id="${data[i].UPC}">${data[i].UPC}</td>
                            <td name="Name-${data[i].UPC}">${data[i].Name}</td>
                            <td name="Size-${data[i].UPC}">${data[i].Size}</td>
                            <td name="Quantity-${data[i].UPC}">${data[i].Quantity}</td>
                            <td name="PriceAVG-${data[i].UPC}"><button tabindex="${counter + 1}" value="${data[i].UPC}" class="price" type="button">$${(data[i].PriceAVG).toFixed(2)}</button></td>
                            <td name="PriceRetail-${data[i].UPC}">$${(data[i].PriceRetail).toFixed(2)}</td>
                            <td name="Current-${data[i].UPC}">${data[i].Current}</td>
                            <td name="Stock-${data[i].UPC}">${data[i].Stock}</td>
                      </tr>`;
                      counter += 2;
                      htmlTable.innerHTML += row;
        }
        tableBuilder.pageButtons(paginationObj.pages, buttonContainer, currentPage);
    },
    invoiceTable : function buildTable(tableData, htmlTable){
        let data = tableData;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].UPC}">
                            <td name="Name-${data[i].UPC}">${data[i].Name}</td>
                            <td name="PriceRetail-${data[i].UPC}">$${(data[i].PriceRetail).toFixed(2)}</td>
                            <td name="Quantity-${data[i].UPC}">${data[i].ItemQuantity}</td>
                            <td name="Total-${data[i].UPC}">$${(data[i].PriceRetail * data[i].ItemQuantity).toFixed(2)}</td>
                      </tr>`;
                      counter += 3;
                      htmlTable.innerHTML += row;
        }
    },
    orderRequestTable : function buildTable(tableData, htmlTable, buttonContainer, currentPage, rows){
        let paginationObj = tableBuilder.pagination(tableData, currentPage, rows);
        let data = paginationObj.querySet;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].RequestID}" name="trID" tabindex="${counter}" onclick="FocusTableRow(this);" onfocus="FocusTableRow(this  )" onfocusout="LeaveFocus()" class="table-hover">
                            <td name="RequestID-${data[i].RequestID}" data-id="${data[i].RequestID}">${data[i].RequestID}</td>
                            <td name="OrderItems-${data[i].RequestID}">${data[i].OrderItems}</td>
                            <td name="OrderDescription-${data[i].RequestID}">${data[i].OrderDescription}</td>
                            <td name="OrderCost-${data[i].RequestID}">$${data[i].OrderCost.toFixed(2)}</td>
                            <td name="OrderSent-${data[i].RequestID}">${(data[i].OrderSent)}</td>
                            <td name="OrderReceived-${data[i].RequestID}">${(data[i].OrderReceived)}</td>
                            <td name="OrderNumber-${data[i].RequestID}">${data[i].OrderNumber}</td>
                      </tr>`;
                      counter += 2;
                      htmlTable.innerHTML += row;
        }
        tableBuilder.pageButtons(paginationObj.pages, buttonContainer, currentPage);
    },
    posInventoryTable : function buildTable(tableData, htmlTable, buttonContainer, currentPage, rows){
        let paginationObj = tableBuilder.pagination(tableData, currentPage, rows);
        let data = paginationObj.querySet;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].UPC}" name="trID" tabindex="${counter}" class="table-hover">
                            <td name="UPC-${data[i].UPC}" data-id="${data[i].UPC}">${data[i].UPC}</td>
                            <td name="Name-${data[i].UPC}">${data[i].Name}</td>
                            <td name="Size-${data[i].UPC}">${data[i].Size}</td>
                            <td name="PriceRetail-${data[i].UPC}">$${(data[i].PriceRetail).toFixed(2)}</td>
                            <td name="Stock-${data[i].UPC}">${data[i].Stock}</td>
                            <td name="Stock-${data[i].UPC}"><button value="${data[i].UPC}" name="${data[i].UPC}" tabindex="${counter + 1}" class="btnAddToCart">&#x2B</button></td>
                      </tr>`;
                      counter += 2;
                      htmlTable.innerHTML += row;
        }
        tableBuilder.pageButtons(paginationObj.pages, buttonContainer, currentPage);
    },
    supplierTable : function buildTable(tableData, htmlTable, buttonContainer, currentPage, rows){
        let paginationObj = tableBuilder.pagination(tableData, currentPage, rows);
        let data = paginationObj.querySet;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].SupplierID}" name="trID" tabindex="${counter}" onclick="FocusTableRow(this);" onfocus="FocusTableRow(this  )" onfocusout="LeaveFocus()" class="table-hover">
                            <td name="SupplierID-${data[i].SupplierID}">${data[i].SupplierID}</td>
                            <td name="SupplierName-${data[i].SupplierID}" data-id="${data[i].SupplierID}">${data[i].SupplierName}</td>
                            <td name="SupplierPhone-${data[i].SupplierID}">${data[i].SupplierPhone}</td>
                            <td name="SupplierEmail-${data[i].SupplierID}"><button type="button">${data[i].SupplierEmail}</button></td>
                            <td name="SupplierAddress-${data[i].SupplierID}">${data[i].SupplierAddress}</td>
                            <td name="SupplierCity-${data[i].SupplierID}">${data[i].SupplierCity}</td>
                            <td name="SupplierProvince-${data[i].SupplierID}">${data[i].SupplierProvince}</td>
                            <td name="SupplierPostal-${data[i].SupplierID}">${data[i].SupplierPostal}</td>
                    </tr>`;
                    counter+= 2;
                    htmlTable.innerHTML += row;
        }
        tableBuilder.pageButtons(paginationObj.pages, buttonContainer, currentPage);
    },
    employeeTable : function buildTable(tableData, htmlTable, buttonContainer, currentPage, rows){
        let paginationObj = tableBuilder.pagination(tableData, currentPage, rows);
        let data = paginationObj.querySet;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].EmployeeID}" name="trID" tabindex="${counter}" onclick="FocusTableRow(this);" onfocus="FocusTableRow(this  )" onfocusout="LeaveFocus()" class="table-hover">
                            <td name="EmployeeID-${data[i].EmployeeID}" data-id="${data[i].EmployeeID}">${data[i].EmployeeID}</td>
                            <td name="EmployeeFirst-${data[i].EmployeeID}">${data[i].EmployeeFirst}</td>
                            <td name="EmployeeLast-${data[i].EmployeeID}">${data[i].EmployeeLast}</td>
                            <td name="EmployeeUsername-${data[i].EmployeeID}">${data[i].EmployeeAddress}</td>
                            <td name="EmployeePassword-${data[i].EmployeeID}">${data[i].EmployeeCity}</td>
                            
                    </tr>`;
                    counter += 2;
                    htmlTable.innerHTML += row;
        }
        tableBuilder.pageButtons(paginationObj.pages, buttonContainer, currentPage);
    },
    salesReport : function buildTable(tableData, htmlTable, buttonContainer, currentPage, rows){
        let paginationObj = tableBuilder.pagination(tableData, currentPage, rows);
        let data = paginationObj.querySet;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].srepID}" name="trID" tabindex="${counter}" onclick="FocusTableRow(this);" onfocus="FocusTableRow(this  )" onfocusout="LeaveFocus()" class="table-hover">
                            <td name="sRepID-${data[i].sRepID}" data-id="${data[i].sRepID}">${data[i].sRepID}</td>
                            <td name="StartDate-${data[i].StartDate}">${data[i].StartDate}</td>
                            <td name="EndDate-${data[i].EndDate}">${data[i].EndDate}</td>
                            <td name="EmployeeLast-${data[i].EmployeeID}">${data[i].EmployeeLast}</td>
                            <td name="EmployeeUsername-${data[i].EmployeeID}">${data[i].EmployeeAddress}</td>
                            <td name="EmployeePassword-${data[i].EmployeeID}">${data[i].EmployeeCity}</td>
                            
                    </tr>`;
                    counter += 2;
                    htmlTable.innerHTML += row;
        }
        tableBuilder.pageButtons(paginationObj.pages, buttonContainer, currentPage);
    },
    employeeLogIn : function buildTable(tableData, htmlTable){
        let data = tableData;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].logId}" name="trID" tabindex="${counter}">
                            <td name="EmployeeID-${data[i].logginID}" >${data[i].EmployeeID}</td>
                            <td name="EmployeeName-${data[i].logginID}">${data[i].Name}</td>
                            <td name="SignIn-${data[i].logginID}">${data[i].Date}</td>
                            <td name="SignOut-${data[i].logginID}">${data[i].HoursWorked}</td>
                            <td name="SignIn-${data[i].logginID}">${data[i].SignIn}</td>
                            <td name="SignOut-${data[i].logginID}">${data[i].SignOut}</td>
                    </tr>`;
                    counter += 2;
                    htmlTable.innerHTML += row;
        }
    },
    employeeLogInAgg : function buildTable(tableData, htmlTable){
        let data = tableData;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].logId}" name="trID" tabindex="${counter}">
                            <td name="EmployeeID-${data[i].logginID}" >${data[i].EmployeeID}</td>
                            <td name="EmployeeName-${data[i].logginID}">${data[i].Name}</td>
                            <td name="SignIn-${data[i].logginID}">${data[i].Date}</td>
                            <td name="SignOut-${data[i].logginID}">${data[i].HoursWorked}</td>
                    </tr>`;
                    counter += 2;
                    htmlTable.innerHTML += row;
        }
    },
    employeeTable : function buildTable(tableData, htmlTable){
        let data = tableData;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].EmployeeID}" name="trID" tabindex="${counter}" class="table-hover">
                            <td name="ID-${data[i].EmployeeID}" data-id="${data[i].EmployeeID}">${data[i].EmployeeID}</td>
                            <td name="Name-${data[i].EmployeeID}">${data[i].EmployeeFirst} ${data[i].EmployeeLast}</td>
                            <td name="Stock-${data[i].EmployeeID}">${data[i].PositionID.join(', ')}</td>
                            <td name="Remove-${data[i].EmployeeID}"><button value="${data[i].EmployeeID}" tabindex="${counter+3}" style="float: right; margin-right: 1rem;" class="btnEdit">Edit</button></td>
                      </tr>`;
                      counter += 3;
                      htmlTable.innerHTML += row;
        }
    },
    rolesTable : function buildTable(employee, htmlTable){
        let roles = ["Admin", "Sales", "Technician", "Ordering"];
        htmlTable.innerHTML =   `<tr name="trID${employee.EmployeeID}" tabindex="100" class="table-hover">
                                    <td><input tabindex="101" type="checkbox" name="roles" value="Owner" Disabled ${employee.PositionID.includes("Owner") ?"checked": ""}/>Owner</td>
                                    <td><input tabindex="102" type="checkbox" name="roles" value="Admin" ${employee.PositionID.includes("Admin") ?"checked": ""}/>Admin</td>
                                    <td><input tabindex="103" type="checkbox" name="roles" value="Sales" ${employee.PositionID.includes("Sales") ?"checked": ""}/>Sales</td>
                                    <td><input tabindex="104" type="checkbox" name="roles" value="Technician" ${employee.PositionID.includes("Technician") ?"checked": ""}/>Technician</td>
                                    <td><input tabindex="105" type="checkbox" name="roles" value="Ordering" ${employee.PositionID.includes("Ordering") ?"checked": ""}/>Ordering</td>
                                    <td><button value="${employee.EmployeeID}" style="float: right; margin-right: 1rem;" class="btnEdit">Confirm</button></td>
                                </tr>`;
    },
    reportdataTable : function buildTable(tableData, htmlTable, buttonContainer, currentPage, rows){
        let paginationObj = tableBuilder.pagination(tableData, currentPage, rows);
        let data = paginationObj.querySet;
        htmlTable.innerHTML = "";
        let counter = 140;
        for(let i = 0; i < data.length; i++){
            var row = `<tr id="tr${counter}" data-id="${data[i].RepId}" name="trID" tabindex="${counter}">
                            <td name="ReportName-${data[i].RepId}">${data[i].ReportName}</td>
                            <td name="DateStart-${data[i].RepId}">${data[i].DateStart}</td>
                            <td name="DateEnd-${data[i].RepId}">${data[i].DateEnd}</td>
                            <td name="SelectedCriteria-${data[i].RepId}">${data[i].SelectedCriteria}</td> 
                            <td><button value=${data[i].RepID} style="float: right; margin-right: 1rem;" onclick="deleteReport(this)" class="btnEdit">Remove</button>
                            <button value="${data[i].RepID}" data-start="${data[i].DateStart}" data-end="${data[i].DateEnd}" data-type="${data[i].ReportType}" data-criteria="${data[i].SelectedCriteria}" style="float: right; margin-right: .3rem;" onclick="viewReport(this)" class="btnEdit">View Report</button></td> 
                    </tr>`;
                    counter += 2;
                    htmlTable.innerHTML += row;
        }
        tableBuilder.pageButtons(paginationObj.pages, buttonContainer, currentPage);
    }
}

const navigation = {
    home : function toHome(){
        window.location.href = 'home.html';
    },
    index : function toIndex(){
        window.location.href = 'index.html';
    },
    invoice : function toInvoice(){
        window.location.href = 'invoice.html';
    },
    invoiceNewWindow : function toInvoice(){
        window.open(
            'invoice.html',
            '_blank'
          );
    },
    inventory : function toInventory(){
        window.location.href = 'inventory.html';
    },
    orderRequest : function toOrderRequest(){
        window.location.href = 'order_request.html';
    },
    orderRequests : function toOrderRequests(){
        window.location.href = 'order_requests.html';
    },
    price : function toPrice(){
        window.location.href = 'price.html';
    },
    supplier : function toSupplier(){
        window.location.href = 'supplier.html';
    },
    rolesEdit : function toRolesEdit(){
        window.location.href = 'manage_users_edit.html';
    },
    rolesMaster : function toRolesMaster(){
        window.location.href = 'manage_users.html';
    },
    cogs : function toCogs(){
        window.location.href = 'cogs.html';
    },
    sales : function toSales(){
        window.location.href = 'SalesReport.html';
    },
    hourly : function toHourly(){
        window.location.href = 'HourlyReport.html';
    }
}

//make into a utilities page eventually
const timeout = {
    custom : async function customTimeout(msValue){
        await new Promise(resolve => setTimeout(resolve, msValue));
    }
}//must include the await keyword when called **

function sortHeaderFields(classLevelData, thElement){
    let column = thElement.data('column');
    let order = thElement.data('order');

    if (order == 'desc'){
        thElement.data('order', 'asc');
        classLevelData = classLevelData.sort((a,b) => a[column] > b[column] ? 1 : -1);
    } else {
        thElement.data('order', 'desc');
        classLevelData = classLevelData.sort((a,b) => a[column] < b[column] ? 1 : -1);
    }
}

const tableObject = {
    
}

//note that some fields are not included in constructor because they are calculated later
class inventory{
    //constructor
    constructor(upc, name, size, quantity, current){
        this._UPC = function(){
            if (!/^[0-9]{3}-[0-9]{4}-[0-9]$/.test(upc)){
                throw new Error('UPC must match the pattern "###-####-#".');
            }
            else if (findObject.inventory.UPC(upc) != undefined){
                throw new Error('UPC already in system.');
            }
            else {
                return upc;
            }
        }(),
        this._name = function(){
            if (name.length == 0 || name.length > 50){
                throw new Error('Item name must be between 1 and 50 characters.');
            }
            else {
                return name;
            }
        },
        this._size = function(){
            if (size.length > 50){
                throw new Error('Item size must be less than 50 characters.');
            }
            else if (size.length == 0){
                return 'N/A';
            }
            else {
                return size;
            }
        }(),
        this._quantity = function(){
            if (quantity.length > 20){
                throw new Error('Item quantity must be less than 20 characters.');
            }
            else if (quantity.length == 0){
                return 'N/A';
            }
            else {
                return quantity;
            }
        }(),
        this._priceavg = 0,
        this._priceRetail = 0,
        this._current = function(){
            current = current.toUpperCase();
            if(current.Current != 1 && !(current == 'Y' || current == 'N')){
                throw new Error('Please enter either "Y" (yes) or "N" (No) to indicate if an item is current or not.');
            }
            else {
                return current;
            }
        }(),
        this._stock = 0
    }

    //property methods
    get UPC() {
        return this._UPC;
    }

    set UPC(upc) {
        if (!/^[0-9]{3}-[0-9]{4}-[0-9]$/.test(upc)){
            throw new Error('UPC must match the pattern "###-####-#".');
        }
        else if (findObject.inventory.UPC(upc) != undefined){
            throw new Error('UPC already in system.');
        }
        else {
            this._UPC = upc;
        }
    }

    get Name() {
        return this._name;
    }

    set Name(name) {
        if (name.length == 0 || name.length > 50){
            throw new Error('Item name must be between 1 and 50 characters.');
        }
        else {
            this._name = name;
        }
    }

    get Size() {
        return this._size;
    }

    set Size(size) {
        if (size.length > 50){
            throw new Error('Item size must be less than 50 characters.');
        }
        else if (size.length == 0){
            this._size = 'N/A';
        }
        else {
            this._size = size;
        }
    }

    get Quantity() {
        return this._quantity;
    }

    set Quantity(quantity){
        if (quantity.length > 20){
            throw new Error('Item quantity must be less than 20 characters.');
        }
        else if (quantity.length == 0){
            this._quantity = 'N/A';
        }
        else {
            this._quantity = quantity;
        }
    }

    get Current() {
        return this._current;
    }

    set Current(current) {
        current = current.toUpperCase();
        if(current.Current != 1 && !(current == 'Y' || current == 'N')){
            throw new Error('Please enter either "Y" (yes) or "N" (No) to indicate if an item is current or not.');
        }
        else {
            this._current = current;
        }
    }
}

class supplier{
    constructor(supname, supphone, supemail,supaddress){
        this._supplierName = function(){
            if (supname.length == 0 || supname.length > 80){
                throw new Error('Supplier name must be between 1 and 80 characters.');
            }
            else {
                return supname;
            }
        }(),
        this._supplierPhone = function(){
            if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(supphone)){
                throw new Error('Phone must match the pattern "###-###-####".');
            }
            else {
                return supphone;
            }
        }(),
        this._supplierEmail = function(){
            if (!/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([(a-z)]{2,20})$/.test(supemail)){
                throw new Error('Email must match the pattern "abc@abcded.com"');
            }
            else {
                return supemail;
            }
        }(),
        this._supplierAddress = function(){
            if (supaddress.length == 0 || supaddress.length > 100){
                throw new Error('Supplier address must be between 1 and 100 characters.');
            }
            else {
                return supaddress;
            }
        }()
    }
    //property methods
    get SupplierName() {
        return this._supplierName;
    }

    set  SupplierName(supname) {
        if (supname.length == 0 || supname.length > 80){
            throw new Error('Supplier name must be between 1 and 80 characters.');
        }
        else {
            this._supplierName = supname;
        }
    }

    get SupplierPhone() {
        return this._supplierPhone;
    }

    set SupplierPhone(supphone) {
        if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(supphone)){
            throw new Error('Phone must match the pattern "###-####-####".');
        }
        else {
            this._supplierPhone = supphone;
        }
    }

    get SupplierEmail() {
        return this._supplierPhone;
    }

    set SupplierEmail(supemail) {
        if (!/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([(a-z)]{2,20})/.test(supphosupemailne)){
            throw new Error('Email must match the pattern "abc@abcded.com"');
        }
        else {
            this._supplierEmail = supemail;
        }
    }
    get SupplierAddress() {
        return this._supplierAddress;
    }

    set SupplierAddress(supaddress) {
        if (supaddress.length == 0 || supaddress.length > 100){
            throw new Error('Supplier Address must be between 1 and 100 characters.');
        }
        else {
            this._supplierAddress = supaddress;
        }
    }     
}

$('input').on('keyup', floatingPlaceholder)
$('button').on('click', floatingPlaceholder)

function floatingPlaceholder(){
    document.querySelectorAll("input[placeholder]").forEach((input) => {
        try{
            if(input.value != "" && input.nextElementSibling.innerHTML != input.placeholder){
                if(input.id == "searchText"){
                    input.insertAdjacentHTML('afterend', `<label name="delete-later" class="floating-search-placeholder">${input.placeholder}</label>`);
                }
                else {
                    input.insertAdjacentHTML('afterend', `<label name="delete-later" class="floating-placeholder">${input.placeholder}</label>`);
                }
            }
        }
        catch{
            try { //this nested try catch is so accomodate for the externally created html that is injected into the document. It cannot read the .innerHTML of these properties
                if(input.id == "searchText"){
                    input.insertAdjacentHTML('afterend', `<label name="delete-later" class="floating-search-placeholder">${input.placeholder}</label>`);
                }
                else if(input.id == "txtPhoneSearch"){
                    input.insertAdjacentHTML('afterend', `<label name="delete-later" style="margin-bottom: 0px;" class="floating-placeholder">${input.placeholder}</label>`);
                }
                else {
                    input.insertAdjacentHTML('afterend', `<label name="delete-later" style="margin-bottom: 22px;" class="floating-placeholder">${input.placeholder}</label>`);
                }
            }
            catch{

            }
        }
      });
    var elements = document.getElementsByName("delete-later");
    for(var i=elements.length-1;i>=0;i--)
    {
        if(elements[i].previousElementSibling.value == "")
            elements[i].parentNode.removeChild(elements[i]);
    }
}
//log in
function loggedInUser() {
    let savedUsername = tableData.loggedIn;
    let greeting = document.querySelector("#greeting");
    let greetingTooltip = document.querySelector("#greetingTooltip");

    function paintGreetings(username) {
        greeting.innerText = `Hello ${username.EmployeeFirst}`;
        greetingTooltip.innerHTML = username.EmployeeFirst;
    }

    function employeeAccess() {
        if(savedUsername.PositionID.includes("Owner")){
            
        }
        else if(savedUsername.PositionID.includes("Admin")){

        }
        else if(savedUsername.PositionID.includes("Sales")){
            document.getElementById('liAnalytics').style.display = "none";
            document.getElementById('liUserSettings').style.display = "none";
            document.getElementById('liOrderRequests').style.display = "none";
            if(document.URL.includes("order_requests.html") || document.URL.includes("report.html")||
            document.URL.includes("manage_users.html") || document.URL.includes("manage_users_edit.html")){
                navigation.home();
            }
        }
        else if(savedUsername.PositionID.includes("Ordering")){
            document.getElementById('liPOS').style.display = "none";
            document.getElementById('liAnalytics').style.display = "none";
            document.getElementById('liCustomers').style.display = "none";
            document.getElementById('liUserSettings').style.display = "none";
            if(document.URL.includes("pos.html") || document.URL.includes("report.html")||
            document.URL.includes("manage_users.html") || document.URL.includes("manage_users_edit.html")
            || document.URL.includes("customers.html")){
                navigation.home();
            }
        }
        else if(savedUsername.PositionID.includes("Technician")){
            document.getElementById('liPOS').style.display = "none";
            document.getElementById('liAnalytics').style.display = "none";
            document.getElementById('liCustomers').style.display = "none";
            document.getElementById('liUserSettings').style.display = "none";
            if(document.URL.includes("pos.html") || document.URL.includes("report.html")||
            document.URL.includes("manage_users.html") || document.URL.includes("manage_users_edit.html")
            || document.URL.includes("customers.html")){
                navigation.home();
            }
        }
    }

    if (savedUsername === null || savedUsername == "") {
        greeting.innerText = `Hello `;
        navigation.index();
    } else{
        employeeAccess();
        paintGreetings(savedUsername);
    }
}
//log out
function loggingOut() {
    let answer = confirm('Do you want to log out?');
    if (answer) {
        updateTableData.loggedIn("");
        window.location.href = 'index.html';
    } 
}



