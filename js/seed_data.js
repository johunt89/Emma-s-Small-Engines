//localStorage.clear();
//#region Local Storage Variables
let supplierStorageString = tableStrings.supplier;
let priceStorageString = tableStrings.price;
let inventoryStorageString = tableStrings.inventory;
let orderStorageString = tableStrings.orderRequests;
let customerStorageString = tableStrings.customer;
let employeeStorageString = tableStrings.employee;
let salesReportString = tableStrings.salesReport;
let emploginStorageString = tableStrings.empLogin;
let reportdataStorageString = tableStrings.reportdata;
//#endregion

//#region Supplier Seed Data
let supplierArray = [
    {'SupplierID':'1', 'SupplierName':'House', 'SupplierPhone':'000-000-0000', 'SupplierEmail':'N/A', 'SupplierAddress':'N/A','SupplierCity':'N/A', 'SupplierProvince':'N/A', 'SupplierPostal':'N/A'},
    {'SupplierID':'2', 'SupplierName':'John Deere', 'SupplierPhone':'289-989-1909', 'SupplierEmail':'jdeere@domain.ca', 'SupplierAddress':'111 Brock St','SupplierCity':'Pewter', 'SupplierProvince':'ON', 'SupplierPostal':'L3C 7A7'},
    {'SupplierID':'3', 'SupplierName':'All Mowers', 'SupplierPhone':'519-111-1111', 'SupplierEmail':'amowers@domain.ca', 'SupplierAddress':'202 Misty Lane','SupplierCity':'Cerulean', 'SupplierProvince':'ON', 'SupplierPostal':'N2B 2P5'},
    {'SupplierID':'4', 'SupplierName':'Green Lawn inc.', 'SupplierPhone':'289-299-2110', 'SupplierEmail':'greenlawninc@domain.ca', 'SupplierAddress':'6 Sabrina Blvd','SupplierCity':'Saffron', 'SupplierProvince':'ON', 'SupplierPostal':'N2Z 5L5'},
    {'SupplierID':'5', 'SupplierName':'Order Place', 'SupplierPhone':'905-303-3033', 'SupplierEmail':'orderplacemowers@domain.ca', 'SupplierAddress':'88 Giovanni Place','SupplierCity':'Veridian', 'SupplierProvince':'ON','SupplierPostal':'L5N 2P4'},
    {'SupplierID':'6', 'SupplierName':'Farm Meadows', 'SupplierPhone':'289-477-4444', 'SupplierEmail':'FarmMeadowGroup@domain.ca', 'SupplierAddress':'4444 Erica Cres','SupplierCity':'Celedon','SupplierProvince':'ON', 'SupplierPostal':'L4B 1P9'},
    {'SupplierID':'7', 'SupplierName':'John and Sons', 'SupplierPhone':'905-553-5255', 'SupplierEmail':'johnandsons@domain.ca', 'SupplierAddress':'55555 Koga Blf', 'SupplierCity':'Fuchsia', 'SupplierProvince':'ON', 'SupplierPostal':'N2B 2P5'},
    {'SupplierID':'8', 'SupplierName':'Engines and More', 'SupplierPhone':'905-212-5544', 'SupplierEmail':'enginesandmore@domain.ca', 'SupplierAddress':'77777 Blaine Way', 'SupplierCity':'Cinnabar Island','SupplierProvince':'ON','SupplierPostal':' N2Z 3P8'},
    {'SupplierID':'9', 'SupplierName':'Shocking Electronics', 'SupplierPhone':'905-111-0001', 'SupplierEmail':'ltShock@domain.ca', 'SupplierAddress':'33 Surge Lt', 'SupplierCity':'Vermilion','SupplierProvince':'ON', 'SupplierPostal':'L5V 8Z7'}
]

//initialize local storage if exists
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem(supplierStorageString) == null){
        localStorage.setItem(supplierStorageString, JSON.stringify(supplierArray));
    }
} else {
    console.log("There is no web storage support for this browser.");
}
//#endregion

//#region Price Seed Data
let priceArray = [
    {'PriceID':'1', 'UPC':'000-0000-0', 'Supplier':' ', 'SupplierID':'1', 'OrderNumber':0, 'PurchaseDate':'01/01/2020', 'PurchasePrice':24.39024, 'Stock':999},

    {'PriceID':'2', 'UPC':'060-5910-0', 'Supplier':' ', 'SupplierID':'1', 'OrderNumber':201, 'PurchaseDate':'01/12/2021', 'PurchasePrice':8, 'Stock':0},
    {'PriceID':'3', 'UPC':'060-5910-0', 'Supplier':' ', 'SupplierID':'2', 'OrderNumber':202, 'PurchaseDate':'03/06/2022', 'PurchasePrice':9.21, 'Stock':0},
    {'PriceID':'4', 'UPC':'060-5910-0', 'Supplier':' ', 'SupplierID':'3', 'OrderNumber':203, 'PurchaseDate':'07/06/2022', 'PurchasePrice':7.55, 'Stock':0},
    {'PriceID':'5', 'UPC':'060-5910-0', 'Supplier':' ', 'SupplierID':'4', 'OrderNumber':204, 'PurchaseDate':'10/07/2022', 'PurchasePrice':9, 'Stock':0},
    {'PriceID':'6', 'UPC':'060-5910-0', 'Supplier':' ', 'SupplierID':'5', 'OrderNumber':205, 'PurchaseDate':'22/08/2022', 'PurchasePrice':12, 'Stock':5},
    {'PriceID':'7', 'UPC':'060-5910-0', 'Supplier':' ', 'SupplierID':'6', 'OrderNumber':206, 'PurchaseDate':'01/09/2022', 'PurchasePrice':10.11, 'Stock':8},

    {'PriceID':'8', 'UPC':'063-5210-5', 'Supplier':' ', 'SupplierID':'4', 'OrderNumber':201, 'PurchaseDate':'01/12/2021', 'PurchasePrice':12, 'Stock':0},
    {'PriceID':'9', 'UPC':'063-5210-5', 'Supplier':' ', 'SupplierID':'2', 'OrderNumber':202, 'PurchaseDate':'03/06/2022', 'PurchasePrice':13, 'Stock':0},
    {'PriceID':'10', 'UPC':'063-5210-5', 'Supplier':' ', 'SupplierID':'1', 'OrderNumber':203, 'PurchaseDate':'07/06/2022', 'PurchasePrice':12.25, 'Stock':0},
    {'PriceID':'11', 'UPC':'063-5210-5', 'Supplier':' ', 'SupplierID':'4', 'OrderNumber':204, 'PurchaseDate':'10/07/2022', 'PurchasePrice':15, 'Stock':0},
    {'PriceID':'12', 'UPC':'063-5210-5', 'Supplier':' ', 'SupplierID':'3', 'OrderNumber':205, 'PurchaseDate':'22/08/2022', 'PurchasePrice':13, 'Stock':4},
    
    {'PriceID':'13', 'UPC':'060-7007-0', 'Supplier':' ', 'SupplierID':'5', 'OrderNumber':201, 'PurchaseDate':'01/12/2021', 'PurchasePrice':5.99, 'Stock':1},
    {'PriceID':'14', 'UPC':'060-7007-0', 'Supplier':' ', 'SupplierID':'2', 'OrderNumber':202, 'PurchaseDate':'03/06/2022', 'PurchasePrice':7.11, 'Stock':5},
    

    {'PriceID':'15', 'UPC':'060-6410-4', 'Supplier':' ', 'SupplierID':'5', 'OrderNumber':201, 'PurchaseDate':'01/12/2021', 'PurchasePrice':80, 'Stock':0},
    {'PriceID':'16', 'UPC':'060-6410-4', 'Supplier':' ', 'SupplierID':'6', 'OrderNumber':202, 'PurchaseDate':'03/06/2022', 'PurchasePrice':87, 'Stock':0},
    {'PriceID':'17', 'UPC':'060-6410-4', 'Supplier':' ', 'SupplierID':'2', 'OrderNumber':203, 'PurchaseDate':'07/06/2022', 'PurchasePrice':95, 'Stock':3},
    {'PriceID':'18', 'UPC':'060-6410-4', 'Supplier':' ', 'SupplierID':'4', 'OrderNumber':204, 'PurchaseDate':'10/07/2022', 'PurchasePrice':102, 'Stock':2},

    {'PriceID':'19', 'UPC':'060-7410-3', 'Supplier':' ', 'SupplierID':'6', 'OrderNumber':201, 'PurchaseDate':'01/12/2021', 'PurchasePrice':3.4, 'Stock':0},
    {'PriceID':'20', 'UPC':'060-7410-3', 'Supplier':' ', 'SupplierID':'1', 'OrderNumber':202, 'PurchaseDate':'03/06/2022', 'PurchasePrice':5.1, 'Stock':0},
    {'PriceID':'21', 'UPC':'060-7410-3', 'Supplier':' ', 'SupplierID':'4', 'OrderNumber':203, 'PurchaseDate':'07/06/2022', 'PurchasePrice':4.4, 'Stock':0}
];

let supplierData = JSON.parse(localStorage.getItem(supplierStorageString));
//initialize local storage if exists
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem(priceStorageString) == null){
        for(let i = 0; i < priceArray.length; i++){
            priceArray[i].Supplier = supplierData.filter(x=> x.SupplierID == priceArray[i].SupplierID)[0].SupplierName;
        }
        localStorage.setItem(priceStorageString, JSON.stringify(priceArray));
    }
} else {
    console.log("There is no web storage support for this browser.");
}
//#endregion

//#region Inventory Seed Data
let inventoryArray = [
    {'UPC':'000-0000-0', 'Name':'House', 'Size':'N/A', 'Quantity':'N/A', 'PriceAVG':30, 'PriceRetail':30, 'Current':'Y', 'Stock':999},
    {'UPC':'060-5910-0', 'Name':'Mower Blade (S)', 'Size':'(S) - 8" Length x 4" Width', 'Quantity':'3-Pack', 'PriceAVG':80, 'PriceRetail':98, 'Current':'Y', 'Stock':5},
    {'UPC':'063-5210-5', 'Name':'Saw Blade', 'Size':'(L) - 12" Length x 5" Width', 'Quantity':'3-Pack', 'PriceAVG':90, 'PriceRetail':110.7, 'Current':'Y', 'Stock':2},
    {'UPC':'060-7007-0', 'Name':'Atlas Lawnmower Engine Brake Cable', 'Size':' 54" (137 cm) cable', 'Quantity':'1', 'PriceAVG':19.99, 'PriceRetail':24.59, 'Current':'Y', 'Stock':10},
    {'UPC':'060-6410-4', 'Name':'Champion 224cc OHV Horizontal Gas Engine', 'Size':'Shaft dimensions (D x L): 2.4 D x 3/4" D', 'Quantity':'1', 'PriceAVG':249.99, 'PriceRetail':307.49, 'Current':'Y', 'Stock':2},
    {'UPC':'060-7410-3', 'Name':'MTD Replacement Blade Adapter', 'Size':'Fits 7/8" crankshaft with 3/16" key', 'Quantity':'1', 'PriceAVG':19.99, 'PriceRetail':24.59, 'Current':'Y', 'Stock':20}
]

//initialize local storage if exists
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem(inventoryStorageString) == null){
        localStorage.setItem(inventoryStorageString, JSON.stringify(inventoryArray));
    }
} else {
    console.log("There is no web storage support for this browser.");
}

//Configure Inventory Data
//Retrieve the data table.
let unalteredInventoryData = JSON.parse(localStorage.getItem(inventoryStorageString));
let priceData = JSON.parse(localStorage.getItem(priceStorageString));
//Modify the data | AveragePrices
for(let i = 0; i < unalteredInventoryData.length; i++){
        unalteredInventoryData[i].PriceAVG = priceData.filter(x=> x.UPC == unalteredInventoryData[i].UPC).reduce((total, next) => total + (next.PurchasePrice * next.Stock), 0) / (priceData.filter(x=> x.UPC == unalteredInventoryData[i].UPC).reduce((total, next) => total + next.Stock, 0) != 0 ? priceData.filter(x=> x.UPC == unalteredInventoryData[i].UPC).reduce((total, next) => total + next.Stock, 0) : 1);
        unalteredInventoryData[i].PriceRetail = unalteredInventoryData[i].PriceAVG * 1.23;
        unalteredInventoryData[i].Stock = priceData.filter(x=> x.UPC == unalteredInventoryData[i].UPC).reduce((total, next) => total + next.Stock, 0);
}
//Store the modified data
localStorage.setItem(inventoryStorageString, JSON.stringify(unalteredInventoryData));
//#endregion

//#region Order Seed Data
let orderArray = [
    {'RequestID':1, 'OrderItems':'Array1', 'OrderItemIDs':['060-5910-0', '063-5210-5', '060-7007-0', '060-6410-4', '060-7410-3'], 'OrderDescription':"Repairs for Gurtrude's 1984 mower", 'OrderCost':953.27, 'OrderSent':'01/12/2021', 'OrderReceived':'08/12/2021', 'OrderNumber':201},
    {'RequestID':2, 'OrderItems':'Array2', 'OrderItemIDs':['060-5910-0', '063-5210-5', '060-7007-0', '060-6410-4', '060-7410-3'], 'OrderDescription':'Replace motor for Sandra V', 'OrderCost':667.95, 'OrderSent':'03/06/2022', 'OrderReceived':'10/06/2022', 'OrderNumber':202},
    {'RequestID':3, 'OrderItems':'Array3', 'OrderItemIDs':['060-5910-0', '063-5210-5', '060-6410-4', '060-7410-3'], 'OrderDescription':'New Gas Tank, and Wiring', 'OrderCost':421.67, 'OrderSent':'07/06/2022', 'OrderReceived':'14/06/2022', 'OrderNumber':203},
    {'RequestID':4, 'OrderItems':'Array4', 'OrderItemIDs':['060-5910-0', '063-5210-5', '060-6410-4'], 'OrderDescription':'Llamas Mystical Piniata', 'OrderCost':333.22, 'OrderSent':'10/07/2022', 'OrderReceived':'17/07/2022', 'OrderNumber':204},
    {'RequestID':5, 'OrderItems':'Array5', 'OrderItemIDs':['060-5910-0', '063-5210-5'], 'OrderDescription':'Danielle needed new blades for her W6 Mower', 'OrderCost':17.89, 'OrderSent':'22/08/2022', 'OrderReceived':'29/08/2022', 'OrderNumber':205},
    {'RequestID':5, 'OrderItems':'Array6', 'OrderItemIDs':['060-5910-0'], 'OrderDescription':'Replace blades for Otis.', 'OrderCost':9.92, 'OrderSent':'01/09/2022', 'OrderReceived':'08/09/2022', 'OrderNumber':206},
    {'RequestID':6, 'OrderItems':'Array7', 'OrderItemIDs':['060-7007-0', '060-6410-4'], 'OrderDescription':'Replace key attachment', 'OrderCost':0, 'OrderSent':'Not Sent', 'OrderReceived':'', 'OrderNumber':''}
]

//initialize local storage if exists
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem(orderStorageString) == null){
        localStorage.setItem(orderStorageString, JSON.stringify(orderArray));
    }
} else {
    console.log("There is no web storage support for this browser.");
}
let unalteredOrderData = JSON.parse(localStorage.getItem(orderStorageString));
//let priceData = JSON.parse(localStorage.getItem(priceStorageString));
for(let i = 0; i < unalteredOrderData.length; i++){
    let itemNames = "";
    for(let j = 0; j < unalteredOrderData[i].OrderItemIDs.length; j++){
        itemNames += unalteredInventoryData.filter(x => x.UPC == unalteredOrderData[i].OrderItemIDs[j])[0].Name + ", ";
    }
    unalteredOrderData[i].OrderItems = itemNames.slice(0, -2);
}
localStorage.setItem(orderStorageString, JSON.stringify(unalteredOrderData));
//#endregion

//#region Customer Seed Data

let customerArray = [
    {'CustomerID':1, 'CustomerFirst':'John', 'CustomerLast':'Doe', 'CustomerAddress':'1 MadeUp Dr.', 'CustomerCity':'Ocean Town', 'CustomerProvince':'Nova Scotia','CustomerPostal':'P2M8A8','CustomerPhone':'406-521-6433'},
    {'CustomerID':2, 'CustomerFirst':'Sarah', 'CustomerLast':'Stanley', 'CustomerAddress':'92 Gale Cres.', 'CustomerCity':'PrarieVille', 'CustomerProvince':'Alberta','CustomerPostal':'P2M4D2','CustomerPhone':'416-451-9341'},
    {'CustomerID':3, 'CustomerFirst':'Todd', 'CustomerLast':'Hunt', 'CustomerAddress':'123 Wood Court', 'CustomerCity':'Welland', 'CustomerProvince':'Ontario','CustomerPostal':'4S7GV3','CustomerPhone':'863-531-9998'},
    {'CustomerID':4, 'CustomerFirst':'Eddy', 'CustomerLast':'Lee', 'CustomerAddress':'91 Serious Business Ave.', 'CustomerCity':'Welland', 'CustomerProvince':'Ontario','CustomerPostal':'N8L3F8','CustomerPhone':'876-137-2382'},
    {'CustomerID':5, 'CustomerFirst':'Craij', 'CustomerLast':'Chard', 'CustomerAddress':'3 Summer Drive.', 'CustomerCity':'Niagara Falls', 'CustomerProvince':'Ontario','CustomerPostal':'N5A1R1','CustomerPhone':'956-234-8563'},
    {'CustomerID':6, 'CustomerFirst':'Warren', 'CustomerLast':'Clarke', 'CustomerAddress':'10022 WeirdPlace St.', 'CustomerCity':'Niagara Falls', 'CustomerProvince':'Ontario','CustomerPostal':'N0K1N0','CustomerPhone':'399-483-3422'},
    {'CustomerID':7, 'CustomerFirst':'Bill', 'CustomerLast':'McNaughton', 'CustomerAddress':'18 Woodbine Ave.', 'CustomerCity':'Niagara Falls', 'CustomerProvince':'Ontario','CustomerPostal':'M2A9G8','CustomerPhone':'987-982-8243'},
    {'CustomerID':8, 'CustomerFirst':'Zoey', 'CustomerLast':'Wilde', 'CustomerAddress':'14 Lindsey St.', 'CustomerCity':'St. Catharines', 'CustomerProvince':'Ontario','CustomerPostal':'M4M5A2','CustomerPhone':'289-324-5821'},
    {'CustomerID':9, 'CustomerFirst':'Timothy', 'CustomerLast':'Fort', 'CustomerAddress':'49 Lake St.', 'CustomerCity':'St. Catharines', 'CustomerProvince':'Ontario','CustomerPostal':'L2R4KS','CustomerPhone':'905-234-6542'},
    {'CustomerID':10, 'CustomerFirst':'Marshall', 'CustomerLast':'Enigma', 'CustomerAddress':'203 Geneva St.', 'CustomerCity':'St. Catharines', 'CustomerProvince':'Ontario','CustomerPostal':'L2N3N3','CustomerPhone':'289-342-2111'},
]

//initialize local storage if exists
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem(customerStorageString) == null){
        localStorage.setItem(customerStorageString, JSON.stringify(customerArray));
    }
} else {
    console.log("There is no web storage support for this browser.");
}


//#endregion

//#region Employee Seed Data
let employeeArray = [
    {'EmployeeID':1, 'EmployeeFirst':'Emma', 'EmployeeLast':'Ham', 'EmployeeUsername':'EmmaH', 'EmployeePassword':'Password', 'PositionID': ["Owner"]},
    {'EmployeeID':2, 'EmployeeFirst':'Sam', 'EmployeeLast':'Viola', 'EmployeeUsername':'SamV', 'EmployeePassword':'Password', 'PositionID': ["Ordering"]},
    {'EmployeeID':3, 'EmployeeFirst':'Eugene', 'EmployeeLast':'Starl', 'EmployeeUsername':'EugeneS', 'EmployeePassword':'Password', 'PositionID': ["Technician"]},
    {'EmployeeID':4, 'EmployeeFirst':'Sarah', 'EmployeeLast':'Green', 'EmployeeUsername':'SarahG', 'EmployeePassword':'Password', 'PositionID': ["Technician"]},
    {'EmployeeID':5, 'EmployeeFirst':'Wendy', 'EmployeeLast':'Taylor', 'EmployeeUsername':'WendyT', 'EmployeePassword':'Password', 'PositionID': ["Sales"]},
    {'EmployeeID':6, 'EmployeeFirst':'William', 'EmployeeLast':'Pollinski', 'EmployeeUsername':'WilliamP', 'EmployeePassword':'Password', 'PositionID': ["Sales"]},
    {'EmployeeID':7, 'EmployeeFirst':'Emily', 'EmployeeLast':'Blanket', 'EmployeeUsername':'EmilyB', 'EmployeePassword':'Password', 'PositionID': ["Admin"]},
    {'EmployeeID': 12, 'EmployeeFirst': 'Dave', 'EmployeeLast':'Kendall', 'EmployeeUsername': 'DaveK', 'EmployeePassword' : 'masterchief', 'PositionID': ["Admin"]}
]

//initialize local storage if exists
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem(employeeStorageString) == null){
        localStorage.setItem(employeeStorageString, JSON.stringify(employeeArray));
    }
} else {
    console.log("There is no web storage support for this browser.");
}
//#endregion

//#region salesReport
let salesReportArray = [
    {'CashHeader':'Cash (24)', 'Cash':'$464.00', 'DebitHeader':'Debit (27)', 'Debit':'3037.50', 'CreditHeader':'Credit (25)', 'Credit':'4295.00', 'ChequeHeader':'Cheque (2)', 'Cheque':'212.00', 'TotalPayments': '$8008.50', 'SalesTax':'$1041.11', 'TotalTaxes':'1041.11', 'Emma': '$0.00', 'Wendy':'4867.13', 'William':'3141.37', 'TotalEmployeeSales': '$8008.50', 'Item1Quantity':'39', 'Item1Price':'$3588.00', 'Item2Quantity':'30', 'Item2Price':'1665.00', 'Item3Quantity':'10', 'Item3Price':'1660.00', 'Item4Quantity':'97', 'Item4Price':'1152.00', 'TotalSales':'$8008.50', 'AppreciationEarned':'$160.17'},
    {'CashHeader':'Cash (0)', 'Cash':'$0.00', 'DebitHeader':'Debit (0)', 'Debit':'0.00', 'CreditHeader':'Credit (0)', 'Credit':'0.00', 'ChequeHeader':'Cheque (2)', 'Cheque':'0.00', 'TotalPayments': '$0.00', 'SalesTax':'$0.00', 'TotalTaxes':'0.00', 'Emma': '$0.00', 'Wendy':'4867.13', 'William':'3,141.37', 'TotalEmployeeSales': '$0.00', 'Item1Quantity':'0', 'Item1Price':'$0.00', 'Item2Quantity':'0', 'Item2Price':'0.00', 'Item3Quantity':'0', 'Item3Price':'0.00', 'Item4Quantity':'0', 'Item4Price':'0.00', 'TotalSales':'$0.00', 'AppreciationEarned':'$0.00'},
    {'CashHeader':'Cash (12)', 'Cash':'$232.00', 'DebitHeader':'Debit (14)', 'Debit':'1570.50', 'CreditHeader':'Credit (25)', 'Credit':'3084.00', 'ChequeHeader':'Cheque (2)', 'Cheque':'212.00', 'TotalPayments': '$4867.50', 'SalesTax':'$632.00', 'TotalTaxes':'632.00', 'Emma': '$0.00', 'Wendy':'4867.50', 'William':'3141.50', 'TotalEmployeeSales': '$4867.50', 'Item1Quantity':'23', 'Item1Price':'$2116.00', 'Item2Quantity':'13', 'Item2Price':'731.50', 'Item3Quantity':'10', 'Item3Price':'1660.00', 'Item4Quantity':'30', 'Item4Price':'360.00', 'TotalSales':'$4867.50', 'AppreciationEarned':'$97.35'},
    {'CashHeader':'Cash (12)', 'Cash':'$232.00', 'DebitHeader':'Debit (13)', 'Debit':'1670.50', 'CreditHeader':'Credit (25)', 'Credit':'1258.00', 'ChequeHeader':'Cheque (2)', 'Cheque':'212.00', 'TotalPayments': '$3141.50', 'SalesTax':'$408.00', 'TotalTaxes':'408.00', 'Emma': '$0.00', 'Wendy':'4867.50', 'William':'3141.50', 'TotalEmployeeSales': '$3141.50', 'Item1Quantity':'16', 'Item1Price':'$1472.00', 'Item2Quantity':'14', 'Item2Price':'777.00', 'Item3Quantity':'3', 'Item3Price':'534.00', 'Item4Quantity':'30', 'Item4Price':'360.00', 'TotalSales':'$3141.50', 'AppreciationEarned':'$62.83'}
]

//initialize local storage if exists
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem(salesReportString) == null){
        localStorage.setItem(salesReportString, JSON.stringify(salesReportArray));
    }
} else {
    console.log("There is no web storage support for this browser.");
}

//#region EmpLogin Seed Data 
let empLoginArray = [
    {'logId':1, 'Date':'2022-11-01 ','SignIn': '08:00','SignOut' : '15:55','HoursWorked':'7.55','EmployeeID':1 ,'Name':'Emma Ham'},
    {'logId':2, 'Date':'2022-11-01 ','SignIn': '08:00','SignOut' : '15:00','HoursWorked':'7','EmployeeID':2,'Name':'Sam Viola'},
    {'logId':3, 'Date':'2022-11-01 ','SignIn': '08:00','SignOut' : '16:55','HoursWorked':'8.55','EmployeeID':3,'Name':'Eugene Starl'},
    {'logId':4, 'Date':'2022-11-01 ','SignIn': '08:00','SignOut' : '16:15','HoursWorked':'8','EmployeeID':4,'Name':'Sarah Green'},
    {'logId':5, 'Date':'2022-11-01 ','SignIn': '08:00','SignOut' : '14:00','HoursWorked':'6','EmployeeID':5,'Name':'Wendy Taylor'},
    {'logId':6, 'Date':'2022-11-01 ','SignIn': '08:00','SignOut' : '13:00','HoursWorked':'5','EmployeeID':6,'Name':'William Pollinski'},
    {'logId':7, 'Date':'2022-11-01 ','SignIn': '08:00','SignOut' : '12:35','HoursWorked':'4.35','EmployeeID':7,'Name':'Emily Blanket'},  
    {'logId':8, 'Date':'2022-11-01 ','SignIn': '08:00','SignOut' : '16:55','HoursWorked':'8.55','EmployeeID':1,'Name':'Emma Ham'},
    {'logId':9, 'Date':'2022-11-02 ','SignIn': '08:00','SignOut' : '13:00','HoursWorked':'5','EmployeeID':2,'Name':'Sam Viola'},
    {'logId':10,'Date':'2022-11-02 ','SignIn': '08:00','SignOut' : '12:00','HoursWorked':'4','EmployeeID':3,'Name':'Eugene Starl'},
    {'logId':11,'Date':'2022-11-02 ','SignIn': '08:00','SignOut' : '17:00','HoursWorked':'9','EmployeeID':4,'Name':'Sarah Green'},
    {'logId':12,'Date':'2022-11-02 ','SignIn': '08:00','SignOut' : '16:15','HoursWorked':'8.15','EmployeeID':5,'Name':'Wendy Taylor'},
    {'logId':13,'Date':'2022-11-02 ','SignIn': '08:00','SignOut' : '16:00','HoursWorked':'8','EmployeeID':6,'Name':'William Pollinski'},
    {'logId':14,'Date':'2022-11-02 ','SignIn': '08:00','SignOut' : '15:05','HoursWorked':'7.05','EmployeeID':7,'Name':'Emily Blanket'},
    {'logId':15,'Date':'2022-11-03 ','SignIn': '08:00','SignOut' : '16:00','HoursWorked':'8','EmployeeID':1,'Name':'Emma Ham'},
    {'logId':16,'Date':'2022-11-03 ','SignIn': '08:00','SignOut' : '16:10','HoursWorked':'8.10','EmployeeID':2,'Name':'Sam Viola'},
    {'logId':17,'Date':'2022-11-03 ','SignIn': '08:00','SignOut' : '17:00','HoursWorked':'9','EmployeeID':3,'Name':'Eugene Starl'},
    {'logId':18,'Date':'2022-11-03 ','SignIn': '08:00','SignOut' : '16:00','HoursWorked':'8','EmployeeID':4,'Name':'Sarah Green'},
    {'logId':19,'Date':'2022-11-03 ','SignIn': '08:00','SignOut' : '12:25','HoursWorked':'4.25','EmployeeID':5,'Name':'Wendy Taylor'},
    {'logId':20,'Date':'2022-11-03 ','SignIn': '08:00','SignOut' : '16:00','HoursWorked':'8','EmployeeID':6,'Name':'William Pollinski'},
    {'logId':21,'Date':'2022-11-03 ','SignIn': '08:00','SignOut' : '17:00','HoursWorked':'9','EmployeeID':7,'Name':'Emily Blanket'},
    {'logId':22,'Date':'2022-11-04 ','SignIn': '08:00','SignOut' : '14:15','HoursWorked':'6.15','EmployeeID':1,'Name':'Emma Ham'},
    {'logId':23,'Date':'2022-11-04 ','SignIn': '08:00','SignOut' : '12:00','HoursWorked':'4','EmployeeID':2,'Name':'Sam Viola'},
    {'logId':24,'Date':'2022-11-04 ','SignIn': '08:00','SignOut' : '17:00','HoursWorked':'9','EmployeeID':3,'Name':'Eugene Starl'},
    {'logId':25,'Date':'2022-11-04 ','SignIn': '08:00','SignOut' : '14:15','HoursWorked':'6.15','EmployeeID':4,'Name':'Sarah Green'},
    {'logId':26,'Date':'2022-11-04 ','SignIn': '08:00','SignOut' : '12:00','HoursWorked':'4','EmployeeID':5,'Name':'Wendy Taylor'},
    {'logId':27,'Date':'2022-11-04 ','SignIn': '08:00','SignOut' : '16:15','HoursWorked':'8.15','EmployeeID':6,'Name':'William Pollinski'},
    {'logId':28,'Date':'2022-11-04 ','SignIn': '08:00','SignOut' : '16:00','HoursWorked':'8','EmployeeID':7,'Name':'Emily Blanket'},
    {'logId':29,'Date':'2022-11-05 ','SignIn': '08:00','SignOut' : '15:00','HoursWorked':'7','EmployeeID':1,'Name':'Emma Ham'},
    {'logId':30,'Date':'2022-11-05 ','SignIn': '08:00','SignOut' : '16:00','HoursWorked':'8','EmployeeID':2,'Name':'Sam Viola'},
    {'logId':31,'Date':'2022-11-05 ','SignIn': '08:00','SignOut' : '17:15','HoursWorked':'9.15','EmployeeID':3,'Name':'Eugene Starl'},
    {'logId':32,'Date':'2022-11-05 ','SignIn': '08:00','SignOut' : '18:00','HoursWorked':'10','EmployeeID':4,'Name':'Sarah Green'},
    {'logId':33,'Date':'2022-11-05 ','SignIn': '08:00','SignOut' : '12:00','HoursWorked':'4','EmployeeID':5,'Name':'Wendy Taylor'},
    {'logId':34,'Date':'2022-11-05 ','SignIn': '08:00','SignOut' : '16:00','HoursWorked':'8','EmployeeID':6,'Name':'William Pollinski'},
    {'logId':35,'Date':'2022-11-05 ','SignIn': '08:00','SignOut' : '16:25','HoursWorked':'8.25','EmployeeID':7,'Name':'Emily Blanket'},
    {'logId':36,'Date':'2022-11-06 ','SignIn': '08:00','SignOut' : '15:00','HoursWorked':'7','EmployeeID':1,'Name':'Emma Ham'},
    {'logId':37,'Date':'2022-11-06 ','SignIn': '08:00','SignOut' : '17:00','HoursWorked':'9','EmployeeID':2,'Name':'Sam Viola'},
    {'logId':38,'Date':'2022-11-06 ','SignIn': '08:00','SignOut' : '16:00','HoursWorked':'8','EmployeeID':3,'Name':'Eugene Starl'},
    {'logId':39,'Date':'2022-11-06 ','SignIn': '08:00','SignOut' : '18:00','HoursWorked':'10','EmployeeID':4,'Name':'Sarah Green'},
    {'logId':40,'Date':'2022-11-06 ','SignIn': '08:00','SignOut' : '17:10','HoursWorked':'9.10','EmployeeID':5,'Name':'Wendy Taylor'},
    {'logId':41,'Date':'2022-11-06 ','SignIn': '08:00','SignOut' : '14:00','HoursWorked':'6','EmployeeID':6,'Name':'William Pollinski'},
    {'logId':42,'Date':'2022-11-06 ','SignIn': '08:00','SignOut' : '17:00','HoursWorked':'9','EmployeeID':7,'Name':'Emily Blanket'},
    {'logId':43,'Date':'2022-11-07 ','SignIn': '08:00','SignOut' : '16:00','HoursWorked':'8','EmployeeID':1,'Name':'Emma Ham'},
    {'logId':44,'Date':'2022-11-07 ','SignIn': '08:00','SignOut' : '12:35','HoursWorked':'4.35','EmployeeID':2,'Name':'Sam Viola'},
    {'logId':45,'Date':'2022-11-07 ','SignIn': '08:00','SignOut' : '12:00','HoursWorked':'4','EmployeeID':3,'Name':'Eugene Starl'},
    {'logId':46,'Date':'2022-11-07 ','SignIn': '08:00','SignOut' : '14:00','HoursWorked':'6','EmployeeID':4,'Name':'Sarah Green'},
    {'logId':47,'Date':'2022-11-07 ','SignIn': '08:00','SignOut' : '15:00','HoursWorked':'7','EmployeeID':5,'Name':'Wendy Taylor'},
    {'logId':48,'Date':'2022-11-07 ','SignIn': '08:00','SignOut' : '16:05','HoursWorked':'8.05','EmployeeID':6,'Name':'William Pollinski'},
    {'logId':49,'Date':'2022-11-07 ','SignIn': '08:00','SignOut' : '16:25','HoursWorked':'8.25','EmployeeID':7,'Name':'Emily Blanket'}
]

if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem(emploginStorageString) == null){
        localStorage.setItem(emploginStorageString, JSON.stringify(empLoginArray));
        //console.log(tableData.employee)
    }
} else {
    console.log("There is no web storage support for this browser.");
}
//#endregion

let reportdataArray = [
    {'RepID':1,'ReportName':'First Daily Sales Report','DateStart':'01/11/2022','DateEnd':'01/11/2022','SelectedCriteria':'All Employees','ReportType':'Sales'},
    {'RepID':2,'ReportName':'First Weekly Hourly Report','DateStart':'01/11/2022','DateEnd':'08/11/2022','SelectedCriteria':'All Employees','ReportType':'Hourly'},
    {'RepID':3,'ReportName':'First COGS Report','DateStart':'01/11/2022','DateEnd':'30/11/2022','SelectedCriteria':'Saw Blade (s)','ReportType':'COGS'},
    {'RepID':4,'ReportName':'First Monthly Sales Report','DateStart':'01/11/2022','DateEnd':'30/11/2022','SelectedCriteria':'All Employees','ReportType':'Sales'},
    {'RepID':5,'ReportName':'Emmas Daily Sales','DateStart':'01/11/2022','DateEnd':'01/11/2022','SelectedCriteria':'Emma','ReportType':'Sales'},
    {'RepID':6,'ReportName':'First Daily Hourly Report','DateStart':'01/11/2022','DateEnd':'01/11/2022','SelectedCriteria':'All Employees','ReportType':'Hourly'},
    {'RepID':7,'ReportName':'Wendy Daily Hourly Report','DateStart':'01/11/2022','DateEnd':'01/11/2022','SelectedCriteria':'Wendy','ReportType':'Hourly'},
    {'RepID':8,'ReportName':'Motor Oil COGS Report','DateStart':'01/11/2022','DateEnd':'30/11/2022','SelectedCriteria':'Motor Oil','ReportType':'COGS'}
]
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem(reportdataStorageString) == null){
        localStorage.setItem(reportdataStorageString, JSON.stringify(reportdataArray));
    }
} else {
    console.log("There is no web storage support for this browser.");
}