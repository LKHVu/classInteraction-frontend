// const URL = "http://localhost:8080/api/";
const URL = "https://vguclassroom-backend.herokuapp.com/api/";
var quizName = document.getElementById("quizName");
var right = document.getElementById("right");
var wrong = document.getElementById("wrong");
var no = document.getElementById("no");
var token = localStorage.getItem("token");

function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", URL + param, false);
    req.setRequestHeader("Authorization", "Bearer " + token);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse
}

function check() {
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

function load() {
    var req = window.location.search;
    quizName.innerHTML = get("questionname" + req)["name"] + " information";
    var average = get("average" + req);
    right.innerHTML = "Right answers: " + average["right"];
    wrong.innerHTML = "Wrong answers: " + average["wrong"];
    no.innerHTML = "No answers: " + average["no"];
}

window.onload = check();