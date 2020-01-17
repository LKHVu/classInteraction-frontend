// const URL = "http://localhost:8080/api/";
const URL = "http://vguclassroom-backend.herokuapp.com/api/";
var classes = document.getElementById("classes");
var token;


function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", URL + param, false);
    req.setRequestHeader("Authorization", "Bearer " + token);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse;
}

function check() {
    token = localStorage.getItem("token");
    if (token == null) {
      body.innerHTML = "";
    } else {
      var payload = jwt_decode(token);
      if (payload["role"] != 2) {
        body.innerHTML = "";
      } else {
        load();
      }
    }
  }

function load(){
    var classArr = get("showclass");
    for (var i=0; i<classArr.length; i++){
        var classname = classArr[i]["name"];
        classes.innerHTML += ' <a href="class.html?name=' + classname + '">' + classname + '</a>';
    }
}

window.onload = check();