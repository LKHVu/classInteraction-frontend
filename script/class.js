const server = "http://localhost:8080/api/";
var seat = document.getElementById("seat");
var active = document.getElementById("active");
var year = document.getElementById("year");
var info;
var table = document.getElementById("table");
var state = [];
var inactiveQuestions = document.getElementById("inactiveQuestions");
var finished = document.getElementById("finished");
var activeQuestions = document.getElementById("activeQuestions");
var finishedQuestions = [];
var quizToShowResult = document.getElementById("quizToShowResult");
var showResultBySeatActiveQuestions = document.getElementById("showResultBySeatActiveQuestions");
var workerLength = 0;


function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", server + param, false);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse
}

function put(param) {
    var req = new XMLHttpRequest();
    req.open("PUT", server + param, false);
    req.send(null);
}

function post(param, data) {
    var req = new XMLHttpRequest();
    req.open("POST", server + param, false);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(data);
}

function load() {
    showActiveQuestions();
    var req = window.location.search;
    finishedQuestions = get("finishedquestion?className=" + req.replace('?name=', ''));
    table.innerHTML = "";
    year.innerHTML = "";
    state = get("state" + req);
    info = get("class" + req);
    if (info["active"] == 1) {
        year.innerHTML = "Intake: " + info["year"];
        active.style = "color: green; font-weight: bold; display: inline";
        active.innerHTML = "ON";
    } else {
        if (info["active"] == 0) {
            active.style = "color: red; font-weight: bold; display: inline";
            active.innerHTML = "OFF";
        }
    }
    loadClassMap("default", 0);
}

function loadClassMap(choice, questionid) {
    loadMapWithoutData(choice);
    for (i = 0; i < state.length; i++) {
        var row = state[i]["row"];
        var col = state[i]["col"];
        var imgOccupied = document.getElementById("img " + row + " " + col);
        var nameOccupied = document.getElementById("name " + row + " " + col);
        var studentId = parseInt(state[i]["student"]);
        var studentInfo = get("student?id=" + studentId);
        imgOccupied.src = studentInfo["img"];
        nameOccupied.innerHTML = studentInfo["name"];
        if (choice == "default") {
            var classCheckOccupied = document.getElementById("classCheck " + row + " " + col);
            var exchangeOccupied = document.getElementById("exchange " + row + " " + col);
            if (studentInfo["year"] == info["year"]) {
                classCheckOccupied.className += " greenBg";
            } else {
                classCheckOccupied.className += " redBg";
            }
            if (studentInfo["exchange"] == 1) {
                exchangeOccupied.className += " blackBg";
            }
        } else if (choice == "result") {
            var resultCheck = document.getElementById("resultCheck " + row + " " + col);
            var resultGet = get("quizreview?questionid=" + questionid + "&studentid=" + studentId);
            if (resultGet["solution"] == resultGet["answer"]) {
                resultCheck.className += " greenBg";
            } else if (resultGet["solution"] != resultGet["answer"]) {
                if (resultGet["answer"] == "N") {
                    resultCheck.className += " blackBg";
                } else {
                    resultCheck.className += " redBg";
                }
            }
        }
    }
}

function loadMapWithoutData(choice) {
    var tableContent = "";
    for (i = 1; i <= info["rows"]; i++) {
        tableContent += "<tr>";
        for (j = 1; j <= info["cols"]; j++) {
            tableContent += "<td>\r\n" +
                "<div class=\"bigCell\">\r\n" +
                "<img id='img " + i + " " + j + "'>" +
                "<div class=\"cellBottom\">\r\n" +
                "<span class=\"studentName\" id='name " + i + " " + j + "'></span>" +
                "<div class=\"checkContainer\">\r\n";
            if (choice == "default") {
                tableContent += "<div id='classCheck " + i + " " + j + "' class=\"classCheck\"></div>\r\n" +
                    "<div id='exchange " + i + " " + j + "' class=\"exchangeCheck\"></div>\r\n";
            } else if (choice == "result") {
                tableContent += "<div id='resultCheck " + i + " " + j + "' class=\"resultCheck\"></div>\r\n"
            }
            tableContent += "</div>\r\n" +
                "</div>\r\n" +
                "</div>\r\n" +
                "</td>";
        }
        tableContent += "</tr>";
    }
    table.innerHTML = tableContent;
}


function activeClass() {
    var req = window.location.search;
    if (info["active"] == 0) {
        put("activeclass" + req + "&year=CS2016");
    } else {
        put("deactivateclass" + req);
    }
    load();
}

function unhideCreateQuestion() {
    document.getElementById('quizName').style.display = "block";
    document.getElementById('question').style.display = "block";
    document.getElementById('A').style.display = "block";
    document.getElementById('B').style.display = "block";
    document.getElementById('C').style.display = "block";
    document.getElementById('D').style.display = "block";
    document.getElementById('time').style.display = "block";
    document.getElementById('solution').style.display = "block";
    document.getElementById('submitQuiz').style.display = "block";
}

function createMultipleChoiceQuestion() {
    var quizName = document.getElementById("quizName").value;
    var req = window.location.search;
    var className = req.replace('?name=', '');
    var question = document.getElementById("question").value;
    var A = document.getElementById("A").value;
    var B = document.getElementById("B").value;
    var C = document.getElementById("C").value;
    var D = document.getElementById("D").value;
    var time = document.getElementById("time").value;
    var solution = document.getElementById("solution");
    var selectedValue = solution.options[solution.selectedIndex].value;
    var data = JSON.stringify({
        "name": quizName,
        "className": className,
        "question": question,
        "A": A,
        "B": B,
        "C": C,
        "D": D,
        "time": time,
        "solution": selectedValue
    });
    post("createmultiplechoicequestion", data);
}

function showInactiveQuestions() {
    var req = window.location.search;
    var className = req.replace('?name=', '');
    var questions = get("inactivequiz?className=" + className);
    for (i = 0; i < questions.length; i++) {
        inactiveQuestions.innerHTML += " <a href=quiz.html?questionid=" + questions[i]["id"] + ">" + questions[i]["name"] + "</a>"
    }

}

function showFinishedQuestions() {
    for (i = 0; i < finishedQuestions.length; i++) {
        finished.innerHTML += " <a href=quizResult.html?questionid=" + finishedQuestions[i]["id"] + ">" + finishedQuestions[i]["name"] + "</a>";
    }
}

function showActiveQuestions() {
    var req = window.location.search;
    var className = req.replace('?name=', '');
    var questions = get("activequestion?className=" + className);
    if (questions.length > 0) {
        showResultBySeatActiveQuestions.style.display = "block";
        for (i = 0; i < questions.length; i++) {
            activeQuestions.innerHTML += " <a href=quiz.html?questionid=" + questions[i]["id"] + ">" + questions[i]["name"] + "</a>"
            showResultBySeatActiveQuestions.innerHTML += '<input type="button" value="' + questions[i]["name"] + '" onClick="loadResultBySeat(' +
                questions[i]["id"] + ')"/>';
        }
    }
}

function unhideShowResult() {
    quizToShowResult.innerHTML = "";
    for (i = 0; i < finishedQuestions.length; i++) {
        quizToShowResult.innerHTML += '<input type="button" value="' + finishedQuestions[i]["name"] + '" onClick="loadClassMap(\'result\'   , ' +
            finishedQuestions[i]["id"] + ')"/>';
    }
}

var w;

function loadResultBySeat(questionid) {
    loadMapWithoutData("result");
    w = new Worker(URL.createObjectURL(new Blob(["(" + worker_function.toString() + ")()"], { type: 'text/javascript' })));
    showResultBySeatActiveQuestions.innerHTML += '<input type="button" value="Stop showing result by seat" onClick="stopLoadResultBySeat()"/>';
    w.postMessage(questionid);
    w.onmessage = function (event) {
        var results = event.data;
        if (results.length > workerLength) {
            for (i = 0; i < results.length; i++) {
                var row = results[i]["row"];
                var col = results[i]["col"];
                var answer = results[i]["answer"];
                var solution = results[i]["solution"];
                var imgCheck = document.getElementById("img " + row + " " + col);
                var nameCheck = document.getElementById("name " + row + " " + col);
                imgCheck.src = results[i]["img"];
                nameCheck.innerHTML = results[i]["name"];
                var resultCheck = document.getElementById("resultCheck " + row + " " + col);
                if (answer == solution) {
                    resultCheck.className += " greenBg";
                } else if (answer != solution) {
                    if (answer == "N") {
                        resultCheck.className += " blackBg";
                    } else {
                        resultCheck.className += " redBg";
                    }
                }
            }
        }
    };
}

function stopLoadResultBySeat() {
    w.terminate();
    w = undefined;
}

function worker_function() {
    var server = "http://localhost:8080/api/";
    var req;

    function get(param) {
        var req = new XMLHttpRequest();
        req.open("GET", server + param, false);
        req.send(null);
        var data = req.responseText;
        var jsonResponse = JSON.parse(data);
        return jsonResponse;
    }

    function run(req) {
        postMessage(get("answerbyseat?questionid=" + req));
        setTimeout(run(req), 1000);
    }

    onmessage = function (event) {
        req = event.data;
        postMessage(get("answerbyseat?questionid=" + req));
        setTimeout(run(req), 1000);
    }
}

window.onload = load();
