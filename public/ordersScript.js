var port = globalVariable.number;


//GALLERY ADD BUTTON:
//Button to add a gallery to our table
var addButton = document.createElement("button");
var addButtonText = document.textContent = "Submit";
addButton.appendChild(document.createTextNode(addButtonText));
document.getElementById("orderAdderButton").appendChild(addButton);

//When client clicks the add a gallery submit button:
function addButtonClick() {
  var req = new XMLHttpRequest(); //create new request
  //get the values entered by user
  var payloadCustomerID = document.getElementById("customersToChoose").value;
  var payloadPaintingID = [];
  payloadPaintingID[0] = document.getElementById("paintingsToChoose1").value;
  payloadPaintingID[1] = document.getElementById("paintingsToChoose2").value;
  payloadPaintingID[2] = document.getElementById("paintingsToChoose3").value;
  payloadPaintingID[3] = document.getElementById("paintingsToChoose4").value;


  //check if nothing was selected, if so, use 0
  for (var a = 0; a < payloadPaintingID.length; a++) {
    if (payloadPaintingID[a] == "Choose painting:")
      payloadPaintingID[a] = 0;
  }

  //if one of the items in the table is not filled out, display error about that item
  //(after this, it will check all items are filled in. If not, it will error and not add to table)
  if (payloadCustomerID == undefined || payloadCustomerID == "") {
    document.getElementById("addErrorNameCustomerID").textContent = "ERROR: Missing customer ID";
    event.preventDefault();
  } else document.getElementById("addErrorNameCustomerID").textContent = "";
  if (payloadPaintingID[0] == undefined || payloadPaintingID[0] == "") {
    document.getElementById("addErrorPaintingsID").textContent = "ERROR: Missing paintingID";
    event.preventDefault();
  } else document.getElementById("addErrorPaintingsID").textContent = "";

  /*
  //remove any whitespace characters
  payloadPaintingIDinitial.replace(/ /g, "");
  //split the string into numbers by splitting it
  var payloadPaintingID = payloadPaintingIDinitial.split(",");
*/
  //stuff to send to the POST request
  var payload = {};
  payload.payloadCustomerID = payloadCustomerID;
  payload.payloadPaintingID = payloadPaintingID;



  //check if all (required) items are fileld out. If so, continue on sending the data to the database, else display error and don't do anything
  if (payloadCustomerID != "" && payloadPaintingID[0] != "") {


    //SEND INITIAL ORDER (CREATES A NEW ORDER AND ADDS FIRST PAINTING)
    //send an insert request to our server via GET
    req.open("POST", "http://flip1.engr.oregonstate.edu:" + port + "/orders", true);

    //for post request, set the header:
    req.setRequestHeader('Content-Type', 'application/json');

    //add event listener for async request (function)
    req.addEventListener('load', function () {
      console.log("Adding order request status: " + req.status); //for testing
      if (req.status >= 200 && req.status < 400) {
        //if request send is good do this:
        console.log("Success in adding order");
      } else { //if error:
        console.log("Error in network request: " + req.statusText);
        if (req.status === 409) //bad customer request:
        {
          alert("Invalid Customer ID given, please try again.");
          return;
        }
        else if (req.status === 400) //gallery ID not found
        {
          alert("Invalid Painting ID given, please try again.");
          return;
        }
        event.preventDefault();
      }
    });

    event.preventDefault();
    //send the request
    req.send(JSON.stringify(payload));
    event.preventDefault();


    //add in any extra paintings to new order number
    for (var i = 1; i < payloadPaintingID.length && payloadPaintingID[i] != 0; i++) {

      var req2 = new XMLHttpRequest();
      payload.currentPayloadPaintingID = payloadPaintingID[i];

      //send an insert request to our server via GET
      req2.open("POST", "http://flip1.engr.oregonstate.edu:" + port + "/moreOrders", true);

      //for post request, set the header:
      req2.setRequestHeader('Content-Type', 'application/json');

      //add event listener for async request (function)
      req2.addEventListener('load', function () {
        console.log("Adding order request status: " + req2.status); //for testing
        if (req2.status >= 200 && req2.status < 400) {
          //if request send is good do this:
          console.log("Success in adding order");
        } else { //if error:
          console.log("Error in network request: " + req2.statusText);
          if (req2.status === 409) //bad customer request:
          {
            alert("Invalid Customer ID given, please try again.");
            event.preventDefault();
            window.location.replace('./orders');
            return;
          }
          else if (req2.status === 400) //gallery ID not found
          {
            alert("Invalid Painting ID given, please try again.\n NOTE: Paintings before this ID were added successfully");
            event.preventDefault();
            window.location.replace('./orders');
            return;
          }
          event.preventDefault();
        }
        event.preventDefault();
      });

      //send the request
      req2.send(JSON.stringify(payload));
    }
  }
  alert("Painting(s) added successfully to order");
  event.preventDefault();
  window.location.replace('./orders');
  return;
}




//AJAX delete request:
function deleteID(id) {
  console.log(id);
  $.ajax({
    url: '/deleteOrder/' + id,
    type: 'DELETE',
    success: function (result) {
      window.location.reload(true);
      event.preventDefault();
    }
  })
};



document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addButtonClick);
});

