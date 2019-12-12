const URL = "http://localhost:8080/api/";
var quizName = document.getElementById("quizName");
var question = document.getElementById("question");
var answerDiv = document.getElementById("answerDiv");
var A = document.getElementById("A");
var B = document.getElementById("B");
var C = document.getElementById("C");
var D = document.getElementById("D");
var solution = document.getElementById("solution");
var answer = document.getElementById("answer");

function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", URL + param, false);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse
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

window.onload = load();