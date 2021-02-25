var port = globalVariable.number;


//GALLERY ADD BUTTON:
//Button to add a gallery to our table
var addButton = document.createElement("button");
var addButtonText = document.textContent = "Search";
addButton.appendChild(document.createTextNode(addButtonText));
document.getElementById("searchButton").appendChild(addButton);
document.getElementById("customerSearch").onchange = customerSearch;
document.getElementById("paintingSearch").onchange = paintingSearch;
document.getElementById("orderSearch").onchange = orderSearch;
var searchType = null;

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addButtonClick);
});

//When client clicks the search buttonpp
function addButtonClick() {
    var req = new XMLHttpRequest(); //create new request

  //get search form entered by user
  var payloadSearch = document.getElementById("searchForm").value;
  //if one of the items in the table is not filled out, display error about that item
  //(after this, it will check all items are filled in. If not, it will error and not add to table)
  if (payloadSearch == "") {
    document.getElementById("addErrorSearch").textContent = "ERROR: Empty Search";
    event.preventDefault();
  }

  if (searchDatabase == "Customers"){
    payloadSearch = "\'" + payloadSearch + "\'"
  }
  //stuff to send to the POST request
  var payload = {};
  payload.payloadSearchDatabase = searchDatabase
  payload.payloadSearchType = searchType;
  payload.payloadSearch = payloadSearch;

  //check if all items are fileld out. If so, continue on sending the data to the database, else display error and don't do anything
  if (payloadSearch != "") {

    //send an insert request to our server via GET
    req.open("POST", "http://flip1.engr.oregonstate.edu:" + port + "/search", true);

    //for post request, set the header:
    req.setRequestHeader('Content-Type', 'application/json');

    //add event listener for async request (function)
    req.addEventListener('load', function () {
      console.log("Adding artists request status: " + req.status); //for testing

      if (req.status >= 200 && req.status < 400) {
        //if request send is good do this:
        console.log("Success in searching");
      } else { //if error:
        console.log("Error in network request: " + req.statusText);
      }
    });

    //send the request
    req.send(JSON.stringify(payload));

    //reload the window without refreshing page
    window.location.reload(true);
    event.preventDefault();

  }
  return;
}

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