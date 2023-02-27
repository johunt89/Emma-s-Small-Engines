function signIn(e) {
    //Html elements
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let message = document.getElementById('error-message');

    //page data
    let loginData = tableData.employee;

    //Logged-in employee info
    const user = loginData.find(x => x.EmployeeUsername === username);
    //alert(user);

    //user authentication
    if (user) {
        if (user.EmployeePassword === password)
        {
            updateTableData.loggedIn(user); 
            location.href = "/home.html"
        } else {
            let message = document.getElementById('error-message');
            message.innerText = "Incorrect password";
        }
    }
    else {
        message.innerText = "Incorrect Username";
    } 
    e.preventDefault();
}


function clear() {
    document.getElementById("login-form").reset();
}