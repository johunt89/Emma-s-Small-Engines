//popup
document.getElementById("btn_add_popup").addEventListener('click', function(){
    if(document.title == "Order Requests - Emma's"){
        if(focusID !== undefined && supplierData.filter(x => x.RequestID == focusID)[0].OrderSent != "Not Sent"
        && supplierData.filter(x => x.RequestID == focusID)[0].OrderReceived == ""){
            document.querySelector('.bg_popup').style.display = 'flex';
            document.getElementById('add_edit').innerHTML = "Receive Order";
        }
    }else {
        document.querySelector('.bg_popup').style.display = 'flex';
        if(document.title == "Suppliers - Emma's")
            document.getElementById('add_edit').innerHTML = "ADD SUPPLIER";
        else if(document.title == "Inventory - Emma's")
            document.getElementById('add_edit').innerHTML = "ADD PRODUCT";
        else if(document.title == "Prices - Emma's")
            document.getElementById('add_edit').innerHTML = "ADD PRICE";
        else if(document.title == "Customers - Emma's")
            document.getElementById('add_edit').innerHTML = "ADD CUSTOMER";
        else if(document.title == "Order Requests - Emma's")
            document.getElementById('add_edit').innerHTML = "Receive Order";
    }
})

document.querySelector('.btn_cancel').addEventListener('click', function(){
    document.querySelector('.bg_popup').style.display ='none';
})

document.querySelector('.btn_crud_edit').addEventListener('click', function(){
    document.querySelector('.bg_popup').style.display = 'flex';
    if(document.title == "Suppliers - Emma's")
        document.getElementById('add_edit').innerHTML = "EDIT SUPPLIER";
    else if(document.title == "Inventory - Emma's")
        document.getElementById('add_edit').innerHTML = "EDIT PRODUCT";
    else if(document.title == "Prices - Emma's")
        document.getElementById('add_edit').innerHTML = "EDIT PRICE";
    else if(document.title == "Order Requests - Emma's")
        document.getElementById('add_edit').innerHTML = "EDIT ORDER";
    else if(document.title == "Customers - Emma's")
        document.getElementById('add_edit').innerHTML = "EDIT CUSTOMER";
})

document.querySelector('.btn_cancel').addEventListener('click', function(){
    document.querySelector('.bg_popup').style.display ='none';
    document.getElementById('tr140').focus();
    modalVisibleFlag = false;
})
