// const URL = "http://localhost:8080/api/";
const URL = "https://vguclassroom-backend.herokuapp.com/api/";
var classes = document.getElementById("classes");
var token;
var body = document.getElementById("body");

function get(param) {
  var req = new XMLHttpRequest();
  req.open("GET", URL + param, false);
  req.setRequestHeader("Authorization", "Bearer " + token);
  req.send(null);
  var data = req.responseText;
  var jsonResponse = JSON.parse(data);
  return jsonResponse;
}

function post(param, data) {
  var req = new XMLHttpRequest();
  req.open("POST", URL + param, false);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("Authorization", "Bearer " + token);
  req.send(data);
}

function check() {
  token = localStorage.getItem("token");
  if (token == null) {
    body.innerHTML = "";
  } else {
    var payload = jwt_decode(token);
    if (payload["role"] != 1) {
      body.innerHTML = "";
    } else {
      load();
    }
  }
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
  document.getElementById('login').style.display = "block";
  document.getElementById('password').style.display = "block";
  document.getElementById('exchange').style.display = "inline-block";
  document.getElementById('exchangeText').style.display = "inline-block";
  document.getElementById('submitStudent').style.display = "block";
}

function createStudent() {
  var name = document.getElementById("name").value;
  var year = document.getElementById("year").value;
  var login = document.getElementById("login").value;
  var password = document.getElementById("password").value;
  var exchange = document.getElementById("exchange").checked;
  var data = JSON.stringify({
    "name": name, "img": "image/3x4.jpg", "year": year, "exchange": exchange, "login": login, "password": password
  });
  post("createstudent", data);
  load();
}

function logout(){
  localStorage.removeItem("token");
  setTimeout(function () { window.location.href = "index.html" }, 0);
}

window.onload = check();