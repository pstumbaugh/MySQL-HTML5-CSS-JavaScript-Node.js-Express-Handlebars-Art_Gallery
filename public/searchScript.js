var port = globalVariable.number;
document.getElementById("customerSearch").onchange = customerSearch;
document.getElementById("paintingSearch").onchange = paintingSearch;
document.getElementById("orderSearch").onchange = orderSearch;
var searchType = null;

// Creating exclusive checkboxes and setting searchType
function customerSearch() {
    if (document.getElementById("paintingSearch").checked) {
        document.getElementById("paintingSearch").checked = false;
    }
    if (document.getElementById("orderSearch").checked) {
        document.getElementById("orderSearch").checked = false;
    }
    searchType = "Customers.customerLastName"
    searchDatabase = "Customers"
}

function paintingSearch() {
    if (document.getElementById("customerSearch").checked) {
        document.getElementById("customerSearch").checked = false;
    }
    if (document.getElementById("orderSearch").checked) {
        document.getElementById("orderSearch").checked = false;
    }
    searchType = "paintingID"
    searchDatabase = "Paintings"
}

function orderSearch() {
    if (document.getElementById("paintingSearch").checked) {
        document.getElementById("paintingSearch").checked = false;
    }
    if (document.getElementById("customerSearch").checked) {
        document.getElementById("customerSearch").checked = false;
    }
    searchType = "orderID"
    searchDatabase = "Orders"
}