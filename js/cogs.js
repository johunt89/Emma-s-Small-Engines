//Report Dates
let loggedIn = tableData.loggedIn;
document.getElementById('lblGenerated').innerHTML = new Date().toLocaleString();
document.getElementById('lblUser').innerHTML = `${loggedIn.EmployeeFirst} ${loggedIn.EmployeeLast}`;