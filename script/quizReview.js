// const URL = "http://localhost:8080/api/";
const URL = "http://vguclassroom-backend.herokuapp.com/api/";
var quizName = document.getElementById("quizName");
var question = document.getElementById("question");
var answerDiv = document.getElementById("answerDiv");
var A = document.getElementById("A");
var B = document.getElementById("B");
var C = document.getElementById("C");
var D = document.getElementById("D");
var solution = document.getElementById("solution");
var answer = document.getElementById("answer");
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
        payload = jwt_decode(token);
        if (payload["role"] != 3) {
            body.innerHTML = "";
        } else {
            load();
        }
    }
}

function load(){
    var req = window.location.search;
    var quizReview = get("quizreview" + req);
    quizName.innerHTML = quizReview["quizName"];
    question.innerHTML = quizReview["question"];
    A.innerHTML += quizReview["a"];
    B.innerHTML += quizReview["b"];
    C.innerHTML += quizReview["c"];
    D.innerHTML += quizReview["d"];
    solution.innerHTML += quizReview["solution"];
    answer.innerHTML += quizReview["answer"];
}

window.onload = check();