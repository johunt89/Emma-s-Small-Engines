//Requires JQUERY <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//Requires variables <script src="js/variables.js"></script> 

//Html elements
let pageTable = document.getElementById('myTable');

//page data
let employeeData = tableData.employee;

//js variables


//initial page load
tableBuilder.employeeTable(employeeData, pageTable);
loggedInUser();

//Event Handlers
$('.btnEdit').click(function(){
    localStorage.setItem("empRoleID", $(this).val().toString());
    navigation.rolesEdit();
})

$(document).on('keydown', '.table-hover', function(event) {
    if (event.keyCode == 69){
        localStorage.setItem("empRoleID", $(':focus').attr("data-id"));
        navigation.rolesEdit();
    }
});
