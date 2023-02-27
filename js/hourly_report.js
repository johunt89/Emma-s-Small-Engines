//Storage Variables
let selectedEmp = localStorage.getItem("Criteria");
let dailyFlag = localStorage.getItem("Daily?") == "true";
//Html elements Aggregate Data
let pageTableAgg = document.getElementById('myTableAgg');

//Html elements All Data
let btnContainterElement = document.getElementById('pagination-wrapper'); 
let pageTable = document.getElementById('myTable');

//Report Dates
let loggedIn = tableData.loggedIn;
document.getElementById('lblGenerated').innerHTML = new Date().toLocaleString();
document.getElementById('lblUser').innerHTML = `${loggedIn.EmployeeFirst} ${loggedIn.EmployeeLast}`;

//page data
let loginData = tableData.empLogin;

if(selectedEmp != ""){
    loginData = loginData.filter(x => x.Name.includes(selectedEmp))
}
console.log(loginData)
if(dailyFlag == true) {
    loginData = loginData.filter(x => x.Date.includes("2022-11-06"));
}

loginData = loginData.sort((a,b) => a.EmployeeID > b.EmployeeID ? 1 : -1);
//aggregate the data
function groupBy(objArr){
    let objId = [];
    let sumTotal = [];
    for(let i = 0; i < objArr.length; i++){
        if(!objId.includes(objArr[i].EmployeeID)){
            objId.push(objArr[i].EmployeeID);
            sumTotal.push({'logId':objArr[i].logId, 'EmployeeID':objArr[i].EmployeeID, 'Date':objArr[i].Date,'HoursWorked' : objArr[i].HoursWorked * 1, 'Name':objArr[i].Name});
        }
        else {
            sumTotal[objId.indexOf(objArr[i].EmployeeID)].HoursWorked += objArr[i].HoursWorked * 1;
        }
    }
    return sumTotal;
}
let loginDataAgg = groupBy(loginData);
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

tableBuilder.employeeLogIn(loginData, pageTable);
tableBuilder.employeeLogInAgg(loginDataAgg, pageTableAgg);

//page sorts