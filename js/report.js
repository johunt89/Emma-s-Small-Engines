//Requires JQUERY <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//Requires variables <script src="js/variables.js"></script> 

//Html elements
let userSearch = document.getElementById('searchText');
let btnContainterElement = document.getElementById('pagination-wrapper-sales'); 
let salesTable = document.getElementById('salesTable');

let btnContainterElementCogs = document.getElementById('pagination-wrapper-cogs'); 
let cogsTable = document.getElementById('cogsTable');

let btnContainterElementHourly = document.getElementById('pagination-wrapper-hourly'); 
let hourlyTable = document.getElementById('hourlyTable');

function populateSalesCbo() {
    document.getElementById('cboEmp').innerHTML= "";
    let empHtml = "<option>All Employees</option>";
    let empData = tableData.employee;
    for(let i = 0; i < empData.length; i++){
        if(empData[i].PositionID.includes("Owner") || empData[i].PositionID.includes("Sales"))
            empHtml += `<option>${empData[i].EmployeeFirst} ${empData[i].EmployeeLast}</option>`;
    }
    document.getElementById("cboEmp").innerHTML += empHtml; 
}

populateSalesCbo();

function populateHourlyCbo() {
    document.getElementById('cboEmp').innerHTML= "";
    let empHtml = "<option>All Employees</option>";
    let empData = tableData.employee;
    for(let i = 0; i < empData.length; i++){
        empHtml += `<option>${empData[i].EmployeeFirst} ${empData[i].EmployeeLast}</option>`;
    }
    document.getElementById("cboEmp").innerHTML += empHtml; 
}

let invHtml = "";
let invData = tableData.inventory;
for(let i = 0; i < invData.length; i++){
    invHtml += `<option>${invData[i].Name}</option>`;
}
document.getElementById("cboInv").innerHTML += invHtml; 

let reportData = tableData.report;
console.log(reportData)

//js variables
let pageIndex = 1;
let focusID;
let addEdit;

//boolean flags
let searchIsFocus = false;
let modalVisible = false;
let focusTrapped = false;

//initial page load
loadData();
loggedInUser();

$(document).on('click', ".pageButton", function(){
    $('#myTable').empty();
    pageIndex = $(this).val();
    loadData();    
})

//report-tap
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
tab.addEventListener('click', () => {
const target = document.querySelector(tab.dataset.tabTarget)
const secondTarget = document.querySelector(tab.dataset.tabTarget2);
tabContents.forEach(tabContent => {
    tabContent.classList.remove('active')
})
tabs.forEach(tab => {
    tab.classList.remove('active')
})
tab.classList.add('active')
target.classList.add('active')
secondTarget.classList.add('active')
pageIndex=1;
let typeIndex = $("ul.tabs li.active").index();
let type = document.getElementsByClassName('tab')[typeIndex].innerHTML;
if(type =="Sales")
    populateSalesCbo();
else
    populateHourlyCbo();
loadData();
})
})
//initial page load
loggedInUser();

function SearchLeaveFocus(){
    searchIsFocus = false;
}

function viewReport(btn){
    localStorage.setItem("Daily?", btn.dataset.start == btn.dataset.end ? true : false);
    localStorage.setItem("Criteria", btn.dataset.criteria == "All Employees" || btn.dataset.criteria == "All Inventory" ? "" : btn.dataset.criteria.split()[0]);
    let type = btn.dataset.type;
    if(type== "Sales"){
        navigation.sales();
    }
    else if(type == "COGS"){
        navigation.cogs();
    }
    else if (type == "Hourly"){
        navigation.hourly();
    }
}


function saveReport(btn) {
    addReport(btn);
}

function saveAndPrintReport(btn){
    addReport(btn);
}

function addReport(btn){
    let typeIndex = $("ul.tabs li.active").index();
    let type = document.getElementsByClassName('tab')[typeIndex].innerHTML;
    var num = Math.max(...reportData.map(s => parseInt(s.RepID))) + 1;
    let criteria = "";
    let name = "";
    let start = document.getElementById('start').value.split('-').reverse();
    start[0] = start.splice(0,1, start[0])[0];
    let end = document.getElementById('start').value.split('-').reverse();
    end[0] = end.splice(0,1, end[0])[0];
    if(type == "Sales" || type == "Hourly"){
        criteria = document.getElementById("cboEmp").value;
        name = document.getElementById("txtEmp").value;
    } else {
        criteria = document.getElementById("cboInv").value;
        name = document.getElementById("txtInv").value;
    }
    reportData.push({'RepID':num,'ReportName':name,'DateStart':start.join("/"),'DateEnd':end.join("/"),'SelectedCriteria':criteria,'ReportType':type})
    updateTableData.report(reportData);
    loadData();
    if(btn.value == "save and print"){
        localStorage.setItem("Daily?", start.join("/") == end.join("/") ? true : false);
        localStorage.setItem("Criteria", criteria == "All Employees" || criteria == "All Inventory" ? "" : criteria.split()[0]);
        if(type== "Sales"){
            navigation.sales();
        }
        else if(type == "COGS"){
            navigation.cogs();
        }
        else if (type == "Hourly"){
            navigation.hourly();
        }
    }
}

function loadData(){
    let search = document.getElementById('txtReportSearch').value;
    tableBuilder.reportdataTable(reportData.filter(x => x.ReportType == "Sales").filter(x => x.ReportName.toLowerCase().includes(search.toLowerCase())), salesTable, btnContainterElement, pageIndex, 5);
    tableBuilder.reportdataTable(reportData.filter(x => x.ReportType == "COGS").filter(x => x.ReportName.toLowerCase().includes(search.toLowerCase())), cogsTable, btnContainterElementCogs, pageIndex, 5);
    tableBuilder.reportdataTable(reportData.filter(x => x.ReportType == "Hourly").filter(x => x.ReportName.toLowerCase().includes(search.toLowerCase())), hourlyTable, btnContainterElementHourly, pageIndex, 5);
}

function deleteReport(btn){
    reportData = reportData.filter(x => x.RepID != btn.value);
    updateTableData.report(reportData);
    loadData();
}