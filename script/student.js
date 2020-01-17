// const URL = "http://localhost:8080/api/";
const URL = "https://vguclassroom-backend.herokuapp.com/api/";
var classes = document.getElementById("classes");
var completedQuiz = document.getElementById("completedQuiz");
var quizArr = [];
var token;
var payload;

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
      payload = jwt_decode(token);
      if (payload["role"] != 3) {
        body.innerHTML = "";
      } else {
        load();
      }
    }
  }

function load() {
    var classArr = get("showclass");
    var currentId = payload["id"];
    var quizArr = get("quizdone?studentid=" + currentId);
    console.log(quizArr);
    for (var i = 0; i < classArr.length; i++) {
        var classname = classArr[i]["name"];
        classes.innerHTML += ' <a href="classStu.html?name=' + classname + '">' + classname + '</a>';
    }
    for (var i = 0; i < quizArr.length; i++) {
        completedQuiz.innerHTML += ' <a href="quizReview.html?studentid=' + currentId + '&questionid=' + quizArr[i]["id"] + '">' +
            quizArr[i]["name"] + '</a>';
    }
}

window.onload = check();