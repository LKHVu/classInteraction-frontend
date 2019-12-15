const URL = "http://localhost:8080/api/";
var classes = document.getElementById("classes");


function get(param) {
  var req = new XMLHttpRequest();
  req.open("GET", URL + param, false);
  req.send(null);
  var data = req.responseText;
  var jsonResponse = JSON.parse(data);
  return jsonResponse;
}

function post(param, data) {
  var req = new XMLHttpRequest();
  req.open("POST", URL + param, false);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(data);
}

function load() {
  var classArr = get("showclass");
  classes.innerHTML = "";
  for (var i = 0; i < classArr.length; i++) {
    classes.innerHTML += " " + classArr[i]["name"];
  }
}

function createClass() {
  var name = document.getElementById("classname").value;
  var row = document.getElementById("row").value;
  var col = document.getElementById("col").value;
  var data = JSON.stringify({
    "name": name, "row": row, "col": col
  });
  post("createclass", data);
  load();
  ;
}

function unhide() {
  document.getElementById('classname').style.display = "block";
  document.getElementById('row').style.display = "block";
  document.getElementById('col').style.display = "block";
  document.getElementById('submit').style.display = "block";
}

function unhideCreateStudent() {
  document.getElementById('name').style.display = "block";
  document.getElementById('year').style.display = "block";
  document.getElementById('exchange').style.display = "inline-block";
  document.getElementById('exchangeText').style.display = "inline-block";
  document.getElementById('submitStudent').style.display = "block";
}

function createStudent() {
  var name = document.getElementById("name").value;
  var year = document.getElementById("year").value;
  var exchange = document.getElementById("exchange").checked;
  var data = JSON.stringify({
    "name": name, "img": "image/3x4.jpg", "year": year, "exchange": exchange
  });
  post("createstudent", data);
  load();
}
window.onload = load();