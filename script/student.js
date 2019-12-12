const URL = "http://localhost:8080/api/";
var classes = document.getElementById("classes");
var completedQuiz = document.getElementById("completedQuiz");
var quizArr = [];


function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", URL + param, false);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse;
}

function load() {
    var classArr = get("showclass");
    var quizArr = get("quizdone?studentid=1");
    console.log(quizArr);
    for (var i = 0; i < classArr.length; i++) {
        var classname = classArr[i]["name"];
        classes.innerHTML += ' <a href="classStu.html?name=' + classname + '">' + classname + '</a>';
    }
    for (var i = 0; i < quizArr.length; i++) {
        completedQuiz.innerHTML += ' <a href="quizReview.html?studentid=1&questionid=' + quizArr[i]["id"] + '">' +
            quizArr[i]["name"] + '</a>';
    }
}

window.onload = load();