var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8877);

app.use(express.static('public'));


//home page setup
//Get and display (send back) all the items from the SQL table
app.get('/', function (req, res, next) {
  var context = {};

  /*
  mysql.pool.query('SELECT * FROM table_name', function(err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    var qParams = [];
    for (var p in rows.query) {
      qParams.push({
        'name': p,
        'reps': rows.query[p]
      })
    }
    context.dataList = rows;
    res.render('home', context);
  });
  */
  res.render('home', context);
});

//artists page
app.get('/artists', function (req, res, next) {
  var context = {};
  //test data:
  context.dataList = [
    {
      "artistID": "5",
      "artistFirstName": "Vincent",
      "artistLastName": "van Gogh"
    },
    {
      "artistID": "15",
      "artistFirstName": "Claude",
      "artistLastName": "Monet"

    },
    {
      "artistID": "10",
      "artistFirstName": "Frida",
      "artistLastName": "Kahlo"

    },
    {
      "artistID": "3",
      "artistFirstName": "Leonardo",
      "artistLastName": "da Vinci"

    }
  ];
  res.render('artists', context);
});

//customers page
app.get('/customers', function (req, res, next) {
  var context = {};
  //test data:
  context.dataList = [
    {
      "customerID": "14",
      "customerFirstName": "Neil",
      "customerLastName": "Armstrong"
    },
    {
      "customerID": "5",
      "customerFirstName": "Buzz",
      "customerLastName": "Aldrin"

    },
    {
      "customerID": "23",
      "customerFirstName": "Sally",
      "customerLastName": "Ride"

    },
    {
      "customerID": "24",
      "customerFirstName": "Mae",
      "customerLastName": "Jemison"

    }
  ];
  res.render('customers', context);
});

//paintings page
app.get('/paintings', function (req, res, next) {
  var context = {};
  //test data:
  context.dataList = [
    {
      "paintingID": "1",
      "artistID": "5",
      "artType": "Abstract",
      "price": "22000",
      "galleryID": "1",
      "orderID": "10"
    },
    {
      "paintingID": "2",
      "artistID": "15",
      "artType": "Contemporary",
      "price": "8000",
      "galleryID": "3",
      "orderID": ""    
    },
    {
      "paintingID": "3",
      "artistID": "10",
      "artType": "Pop",
      "price": "2500",
      "galleryID": "2",
      "orderID": "4"
    },
    {
      "paintingID": "4",
      "artistID": "3",
      "artType": "Impressionist",
      "price": "16000",
      "galleryID": "1",
      "orderID": ""
    }
  ];
  res.render('paintings', context);
});

//galleries page
app.get('/galleries', function (req, res, next) {
  var context = {};
  //test data:
  context.dataList = [
    {
      "galleryID": "1",
      "galleryName": "My First Gallery"
    },
    {
      "galleryID": "2",
      "galleryName": "Lourve"
    },
    {
      "galleryID": "3",
      "galleryName": "MET"
    }
  ];
  res.render('galleries', context);
});

//orders page
app.get('/orders', function (req, res, next) {
  var context = {};
  //test data:
  context.dataList = [
    {
      "orderID": "1",
      "customerID": "14"
    },
    {
      "orderID": "2",
      "customerID": "5"
    },
    {
      "orderID": "3",
      "customerID": "23"
    }
  ];
  res.render('orders', context);
});

//galleries page
app.get('/search', function (req, res, next) {
  var context = {};
  //test data:
  context.dataList = [];
  res.render('search', context);
});


/*
//home page setup POST
app.post('/', function (req, res, next) {
  var context = {};

  mysql.pool.query('SELECT * FROM workouts', function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    var qParams = [];
    for (var p in rows.query) {
      qParams.push({
        'name': p,
        'reps': rows.query[p]
      })
    }
    context.dataList = rows;
    res.render('home', context);
  });
});
*/

/*
//Inserts a new row into the SQL table
app.get('/insert', function (req, res, next) {
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `unit`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.unit], function (err, result) {
    if (err) {
      next(err);
      return;
    }
    context.id = result.insertId;
    context.name = req.query.name;
    context.reps = req.query.reps;
    context.weight = req.query.weight;
    context.date = req.query.date;
    context.unit = req.query.unit;
    JSON.stringify(context);
    res.send(context); //send this info back to the client calling it
    //res.render('home', context);
  });
});
*/

/*
//deletes a row from the SQL table using the ID number
app.get('/delete', function (req, res, next) {
  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function (err, result) {
    if (err) {
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home', context);
  });
});
*/

/*
//updates a row from the SQL table using the ID number
app.get('/updateItem', function (req, res, next) {
  var context = {};

  mysql.pool.query('SELECT * FROM workouts WHERE id=?', [req.query.id], function (err, rows, fields) {
    if (err) {
      next(err);
      return;
    }
    var qParams = [];
    for (var p in rows.query) {
      qParams.push({
        'name': p,
        'reps': rows.query[p]
      })
    }
    context.dataList = rows;
    res.render('update', context);
  });
});
*/



/*
//Updates a row based on the ID number
//Will only update if a parameter is given. If it is left blank, the table will not update it and
// will retain whatever information was already in that position
app.get('/safe-update', function (req, res, next) {
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function (err, result) {
    if (err) {
      next(err);
      return;
    }
    if (result.length == 1) {
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, unit=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.unit || curVals.unit, req.query.id],
        function (err, result) {
          if (err) {
            next(err);
            return;
          }
          context.results = "Updated " + result.changedRows + " rows.";
          res.render('home', context);
        });
    }
  });
});
*/

app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on flip1.engr.oregonstate.edu:' + app.get('port') + ' OR localhost:8877; press Ctrl-C to terminate.');
});

