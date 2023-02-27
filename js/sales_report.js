//Import Data from Seed Data
let selectedEmp = localStorage.getItem("Criteria");
let salesReportData = selectedEmp == "Emma" ? tableData.salesReport[1] : 
    selectedEmp == "Wendy" ? tableData.salesReport[2] : 
    selectedEmp == "William" ? tableData.salesReport[3] : 
    tableData.salesReport[0];

//From Reports Page

let dailyFlag = localStorage.getItem("Daily?") == "true";
//Date Paramaters 
let reportTitle = document.getElementById("reportTitle");
let startDateElement = document.getElementById("lblStartDate");
let endDateElement = document.getElementById("lblEndDate");

//Header Variables for PayTypes
let lblCashHeader = document.getElementById('lblCashHeader');
lblCashHeader.innerHTML = !dailyFlag ? salesReportData.CashHeader : lblCashHeader.innerHTML;
let lblDebitHeader = document.getElementById('lblDebitHeader');
lblDebitHeader.innerHTML = !dailyFlag ? salesReportData.DebitHeader : lblDebitHeader.innerHTML;
let lblCreditHeader = document.getElementById('lblCreditHeader');
lblCreditHeader.innerHTML = !dailyFlag ? salesReportData.CreditHeader : lblCreditHeader.innerHTML;
let lblChequeHeader = document.getElementById('lblChequeHeader');
lblChequeHeader.innerHTML = !dailyFlag ? salesReportData.ChequeHeader : lblChequeHeader.innerHTML;

//Number Variables for PayTypes
let lblCashAmount = document.getElementById('lblCashAmount');
lblCashAmount.innerHTML = !dailyFlag ? salesReportData.Cash : lblCashAmount.innerHTML;
let lblDebitAmount = document.getElementById('lblDbitAmount');
lblDebitAmount.innerHTML = !dailyFlag ? salesReportData.Debit : lblDebitAmount.innerHTML;
let lblCreditAmount = document.getElementById('lblCreditAmount');
lblCreditAmount.innerHTML = !dailyFlag ? salesReportData.Credit : lblCreditAmount.innerHTML;
let lblChequeAmount = document.getElementById('lblChequeAmount');
lblChequeAmount.innerHTML = !dailyFlag ? salesReportData.Cheque : lblChequeAmount.innerHTML;
let lblPaymentTotal = document.getElementById('lblTotalPayment');
lblPaymentTotal.innerHTML = !dailyFlag ? salesReportData.TotalPayments : lblPaymentTotal.innerHTML;

//Tax Variables
let lblTaxes = document.getElementById('lblTaxes');
lblTaxes.innerHTML = !dailyFlag ? salesReportData.SalesTax : lblTaxes.innerHTML;
let lblTaxTotal = document.getElementById('lblTaxTotal');
lblTaxTotal.innerHTML = !dailyFlag ? salesReportData.TotalTaxes : lblTaxTotal.innerHTML;

//Employee Total Variables
let lblEmmaTotal = document.getElementById('lblEmp1Sales');
lblEmmaTotal.innerHTML = !dailyFlag ? salesReportData.Emma : lblEmmaTotal.innerHTML;
let lblWendyTotal = document.getElementById('lblEmp2Sales');
lblWendyTotal.innerHTML = !dailyFlag ? salesReportData.Wendy : lblWendyTotal.innerHTML;
let lblWilliamTotal = document.getElementById('lblEmp3Sales');
lblWilliamTotal.innerHTML = !dailyFlag ? salesReportData.William : lblWilliamTotal.innerHTML;
let lblTotalEmployeeSales = document.getElementById('lblTotalEmployeeSales');
lblTotalEmployeeSales.innerHTML = !dailyFlag ? salesReportData.TotalEmployeeSales : lblTotalEmployeeSales.innerHTML;

//Sales Summary Quantity
let lblQuantityItem1 = document.getElementById('item1Quantity');
lblQuantityItem1.innerHTML = !dailyFlag ? salesReportData.Item1Quantity : lblQuantityItem1.innerHTML;
let lblQuantityItem2 = document.getElementById('item2Quantity');
lblQuantityItem2.innerHTML = !dailyFlag ? salesReportData.Item2Quantity : lblQuantityItem2.innerHTML;
let lblQuantityItem3 = document.getElementById('item3Quantity');
lblQuantityItem3.innerHTML = !dailyFlag ? salesReportData.Item3Quantity : lblQuantityItem3.innerHTML;
let lblQuantityItem4 = document.getElementById('item4Quantity');
lblQuantityItem4.innerHTML = !dailyFlag ? salesReportData.Item4Quantity : lblQuantityItem4.innerHTML;

//Sales Summary Totals
let lblTotalItem1 = document.getElementById('lblItem1Total');
lblTotalItem1.innerHTML = !dailyFlag ? salesReportData.Item1Price : lblTotalItem1.innerHTML;
let lblTotalItem2 = document.getElementById('lblItem2Total');
lblTotalItem2.innerHTML = !dailyFlag ? salesReportData.Item2Price : lblTotalItem2.innerHTML;
let lblTotalItem3 = document.getElementById('lblItem3Total');
lblTotalItem3.innerHTML = !dailyFlag ? salesReportData.Item3Price : lblTotalItem3.innerHTML;
let lblTotalItem4 = document.getElementById('lblItem4Total');
lblTotalItem4.innerHTML = !dailyFlag ? salesReportData.Item4Price : lblTotalItem4.innerHTML;
let lblTotalSales = document.getElementById('lblTotalSales');
lblTotalSales.innerHTML = !dailyFlag ? salesReportData.TotalSales : lblTotalSales.innerHTML;
let lblAppreciation = document.getElementById('lblAppreciation');
lblAppreciation.innerHTML = !dailyFlag ? salesReportData.AppreciationEarned : lblAppreciation.innerHTML;

//Report Dates
let loggedIn = tableData.loggedIn;
document.getElementById('lblGenerated').innerHTML = new Date().toLocaleString();
document.getElementById('lblUser').innerHTML = `${loggedIn.EmployeeFirst} ${loggedIn.EmployeeLast}`;

//Payment Employee
let emmaDiv = document.getElementById('emmaDiv');
let wendyDiv = document.getElementById('wendyDiv');
let williamDiv = document.getElementById('williamDiv');

//Conditionals
if (dailyFlag) {
    startDateElement.innerHTML = "Thursday, December 8th, 2022";

    if(selectedEmp != ""){
        lblCashHeader.innerHTML = "Cash (1)";
        lblCashAmount.innerHTML = "$26.00";

        lblDebitHeader.innerHTML = "Debit (2)";
        lblDebitAmount.innerHTML = "196.00";
        
        lblCreditHeader.innerHTML = "Credit (2)";
        lblCreditAmount.innerHTML = "404.00";

        lblPaymentTotal.innerHTML = "$626.00";

        lblQuantityItem1.innerHTML = "4";
        lblQuantityItem2.innerHTML = "4";
        lblQuantityItem3.innerHTML = "0";
        lblQuantityItem4.innerHTML = "3";
    
        lblTotalItem1.innerHTML = "$368.00";
        lblTotalItem2.innerHTML = "222.00";
        lblTotalItem3.innerHTML = "0.00";
        lblTotalItem4.innerHTML = "36.00";
        lblTotalSales.innerHTML = "$626.00";
        lblAppreciation.innerHTML = "$12.52";
    }

    if (selectedEmp == "Emma"){
        wendyDiv.classList.add("hidden");
        williamDiv.classList.add("hidden");
    
        lblEmmaTotal.classList.add("subTotalUnderLineFull");
        lblEmmaTotal.innerHTML = "$626.00";
        lblTotalEmployeeSales.innerHTML = "$626.00";
    } else if (selectedEmp == "William") {
        wendyDiv.classList.add("hidden");
        emmaDiv.classList.add("hidden");
    
        lblWilliamTotal.classList.add("subTotalUnderLineFull");
        williamDiv.innerHTML == "$626.00";
        lblTotalEmployeeSales.innerHTML = "$626.00";
    } else if (selectedEmp == "Wendy") {
        williamDiv.classList.add("hidden");
        emmaDiv.classList.add("hidden");
    
        lblWendyTotal.classList.add("subTotalUnderLineFull");
        wendyDiv.innerHTML = "$626.00";
        lblTotalEmployeeSales.innerHTML = "$626.00";
    }
} else {
    reportTitle.innerHTML = "Sales Report";
    endDateElement.classList.remove("hidden");
    if (selectedEmp == "Emma"){
        wendyDiv.classList.add("hidden");
        williamDiv.classList.add("hidden");
    
        lblEmmaTotal.classList.add("subTotalUnderLineFull");
    } else if (selectedEmp == "William") {
        wendyDiv.classList.add("hidden");
        emmaDiv.classList.add("hidden");
    
        lblWilliamTotal.classList.add("subTotalUnderLineFull");
    } else if (selectedEmp == "Wendy") {
        williamDiv.classList.add("hidden");
        emmaDiv.classList.add("hidden");
    
        lblWendyTotal.classList.add("subTotalUnderLineFull");
    }
}