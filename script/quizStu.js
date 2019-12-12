const URL = "http://localhost:8080/api/";
var quizName = document.getElementById("quizName");
var question = document.getElementById("question");
var answerDiv = document.getElementById("answerDiv");
var submitDiv = document.getElementById("submitDiv");
var countdown = document.getElementById("countdown");
var quiz;

function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", URL + param, false);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse
}

function post(param, data) {
    var req = new XMLHttpRequest();
    req.open("POST", URL + param, false);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(data);
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

function load() {
    var req = window.location.search;
    quiz = get("question" + req);
    quizName.innerHTML = quiz["name"];
    question.innerHTML = quiz["question"];
    var answers = [quiz["a"], quiz["b"], quiz["c"], quiz["d"]];
    var takeDecider = true;
    var deciderArr = [];
    for (i = 0; i <= 3; i++) {
        var decider = Math.floor(Math.random() * 4);
        while (deciderArr.includes(decider)) {
            decider = Math.floor(Math.random() * 4);
        }
        deciderArr.push(decider);
        if (decider == 0) {
            var ans = "A";
        } else if (decider == 1) {
            var ans = "B";
        } else if (decider == 2) {
            var ans = "C";
        } else if (decider == 3) {
            var ans = "D";
        }
        answerDiv.innerHTML += "<input type='radio' name='quizAns' id='" + ans + "'> " + answers[decider] + "<br>";
    }
    if (quiz["time"] > 0) {
        submitDiv.innerHTML = "<input type=\"button\" value=\"Submit answer\"" +
            "id=\"submitAns\" onClick=\"submitAnswer()\" />";
        count();
    } else {
        submitDiv.innerHTML = "Time is over";
    }
}

function submitAnswer() {
    var req = window.location.search;
    var questionId = req.replace('?questionid=', '');
    var answer;
    if (document.getElementById("A").checked) {
        answer = "A";
    } else if (document.getElementById("B").checked) {
        answer = "B";
    } else if (document.getElementById("C").checked) {
        answer = "C";
    } else if (document.getElementById("D").checked) {
        answer = "D";
    }
    var data = JSON.stringify({
        "questionId": questionId,
        "studentId": 1,
        "answer": answer
    });
    post("createmultiplechoiceanswer", data);
    submitDiv.innerHTML = "You submitted";
}

async function count() {
    var req = window.location.search;
    var time = get("quiztime" + req)["time"];
    countdown.innerHTML = time;
    while (time > 0) {
        await sleep(1000);
        time = time - 1;
        countdown.innerHTML = time;
    }
    submitDiv.innerHTML = "Time is over";
}

window.onload = load();