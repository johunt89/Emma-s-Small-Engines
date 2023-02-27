//Requires JQUERY <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//Requires variables <script src="js/variables.js"></script> 

//Html elements
let pageTable = document.getElementById('myTable');

//page data
let employeeData = tableData.employee;
let employeeID = localStorage.getItem("empRoleID");
//initial page load
tableBuilder.rolesTable(employeeData
    .filter(x => x.EmployeeID.toString() == employeeID)[0]
    , pageTable);

loggedInUser();
//
let selectedEmp = employeeData.find(x => x.EmployeeID == employeeID * 1);
document.getElementById('thEmployeeName').innerHTML = selectedEmp.EmployeeFirst + ' ' + selectedEmp.EmployeeLast;

//Method to update users
$('.btnEdit').on('click', function(){
    let roles = document.getElementsByName('roles');
    let newRoles = [];
    for(let i = 0; i < roles.length; i++){
        if(roles[i].checked == true)
            newRoles.push(roles[i].value);
    }
    let empIDs = employeeData.map(x => x.EmployeeID);
    employeeData[empIDs.indexOf(employeeID * 1)].PositionID = newRoles;
    updateTableData.employee(employeeData);
    navigation.rolesMaster();
})

$(document).on('keydown', function(event) {
    if (event.keyCode == 67){
        $('.btnEdit').click();
    }
});