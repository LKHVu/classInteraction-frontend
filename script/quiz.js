// const URL = "http://localhost:8080/api/";
const URL = "https://vguclassroom-backend.herokuapp.com/api/";
var quizName = document.getElementById("quizName");
var question = document.getElementById("question");
var answerDiv = document.getElementById("answerDiv");
var checkActive = document.getElementById("checkActive");
var countdown = document.getElementById("countdown");
var quiz;
var token = localStorage.getItem("token");
var body = document.getElementById("body");

function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", URL + param, false);
    req.setRequestHeader("Authorization", "Bearer " + token);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse
}

function post(param, data) {
    var req = new XMLHttpRequest();
    req.open("POST", URL + param, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", "Bearer " + token);
    req.send(data);
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
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
    answerDiv.innerHTML = "";
    var req = window.location.search;
    quiz = get("question" + req);
    quizName.innerHTML = quiz["name"];
    question.innerHTML = quiz["question"];
    var answers = [quiz["a"], quiz["b"], quiz["c"], quiz["d"]];
    var deciderArr = [];
    for (i = 0; i <= 3; i++) {
        var decider = Math.floor(Math.random() * 4);
        while (deciderArr.includes(decider)) {
            decider = Math.floor(Math.random() * 4);
        }
        deciderArr.push(decider);
        answerDiv.innerHTML += "<h3>- " + answers[decider] + "</h3>";
    }
    if (quiz["active"] == 0) {
        if (quiz["finished"] == 0) {
            checkActive.innerHTML = "<input type=\"button\" value=\"Activate quiz\"" +
                "id=\"activateQuiz\" onClick=\"activateQuestion()\" />";
            countdown.innerHTML = quiz["time"];
        } else {
            checkActive.innerHTML = "<span style='color: red;'>Quiz is finished</span>";
        }
    } else {
        count();
    }
}

async function count(){
    var req = window.location.search;
    var time = get("quiztime" + req)["time"];
    countdown.innerHTML = time;
    while (time > 0){
        await sleep(1000);
        time = time-1;
        countdown.innerHTML=time;
    }
}

function activateQuestion(){
    var req = window.location.search;
    post("activequiz" + req, null);
    count();
}

window.onload = check();