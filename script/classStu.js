// const server = "http://localhost:8080/api/";
const server = "https://vguclassroom-backend.herokuapp.com/api/";
var seat = document.getElementById("seat");
var active = document.getElementById("active");
var activeQuestions = document.getElementById("activeQuestions");
var req = window.location.search;
var workerLength = 0;
var token = localStorage.getItem("token");
var workerData = JSON.stringify({ 'token': token, 'req': req });
var payload;
var body = document.getElementById("body");


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


function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", server + param, false);
    req.setRequestHeader("Authorization", "Bearer " + token);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse;
}

function post(param, data) {
    var req = new XMLHttpRequest();
    req.open("POST", server + param, false);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", "Bearer " + token);
    req.send(data);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse;
}

function put(param) {
    var req = new XMLHttpRequest();
    req.open("PUT", server + param, false);
    req.setRequestHeader("Authorization", "Bearer " + token);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse;
}

function load() {
    seat.innerHTML = "";
    var state = get("state" + req);
    var info = get("class" + req);
    if (info["active"] == 1) {
        active.style = "color: green; font-weight: bold; display: inline";
        active.innerHTML = "ON";
    } else {
        if (info["active"] == 0) {
            active.style = "color: red; font-weight: bold; display: inline";
            active.innerHTML = "OFF";
        }
    }
    for (i = 1; i <= info["rows"]; i++) {
        for (j = 1; j <= info["cols"]; j++) {
            seat.innerHTML += "<span id='" + i + " " + j + "' style='cursor: pointer;' onClick='chooseSeat(this)'>*</span>  "
            if (j == info["cols"]) {
                seat.innerHTML += "<br>";
            }
        }
    }
    for (i = 0; i < state.length; i++) {
        var row = state[i]["row"];
        var col = state[i]["col"];
        var seatOccupied = document.getElementById(row + " " + col);
        if (state[i]["student"]==payload["id"]){
            seatOccupied.style = "color: green; font-weight: 900; font-size: larger";
        } else {
            seatOccupied.style = "color: red;";
        }
    }
}

function chooseSeat(span) {
    var coord = span.id.split(" ");
    var classname = req.replace('?name=', '');
    var data = JSON.stringify({ "class": classname, "row": coord[0], "col": coord[1], "student": payload["id"] });
    alert(post("createstate", data)["Result"]);
    load();
}

w = new Worker(URL.createObjectURL(new Blob(["(" + worker_function.toString() + ")()"], { type: 'text/javascript' })));
w.postMessage(workerData);

w.onmessage = function (event) {
    var questions = event.data;
    if (questions.length != workerLength) {
        activeQuestions.innerHTML = "Active quizzes: ";
        for (i = 0; i < questions.length; i++) {
            activeQuestions.innerHTML += " <a href=quizStu.html?questionid=" + questions[i]["id"] + ">" + questions[i]["name"] + "</a>"
        }
        workerLength = questions.length;
    }
};

function worker_function() {
    // var server = "http://localhost:8080/api/";
    var server = "https://vguclassroom-backend.herokuapp.com/api/";
    var workerData;
    var req;
    var token;

    function get(param) {
        var req = new XMLHttpRequest();
        req.open("GET", server + param, false);
        req.setRequestHeader("Authorization", "Bearer " + token);
        req.send(null);
        var data = req.responseText;
        var jsonResponse = JSON.parse(data);
        return jsonResponse;
    }

    function run(req) {
        postMessage(get("activequestion?className=" + req.replace('?name=', '')));
        setTimeout(run(req), 20000);
    }

    onmessage = function (event) {
        workerData = JSON.parse(event.data);
        req = workerData["req"];
        token = workerData["token"];
        postMessage(get("activequestion?className=" + req.replace('?name=', '')));
        setTimeout(run(req), 20000);
    }
}

function callAttention() {
    var callResult = put("callattention?studentid=" + payload["id"])["Result"];
    alert(callResult);
    var acceptedWData = JSON.stringify({"token": token, "student": payload["id"]});
    acceptedW = new Worker(URL.createObjectURL(new Blob(["(" + worker_accepted.toString() + ")()"], { type: 'text/javascript' })));
    acceptedW.postMessage(acceptedWData);
    acceptedW.onmessage = function (event) {
        var result = event.data;
        if (result["Result"]){
            setTimeout(function () { window.location.href = "call.html" }, 0);
        }
    }
}

function cancelAttention() {
    var callResult = put("closeattention")["Result"];
    alert(callResult);
}

function worker_accepted() {
    // var server = "http://localhost:8080/api/";
    var server = "https://vguclassroom-backend.herokuapp.com/api/";
    var studentId;
    var token;

    function get(param) {
        var req = new XMLHttpRequest();
        req.open("GET", server + param, false);
        req.setRequestHeader("Authorization", "Bearer " + token);
        req.send(null);
        var data = req.responseText;
        var jsonResponse = JSON.parse(data);
        return jsonResponse;
    }

    function run(req) {
        postMessage(get("checkaccepted?studentid=" + req));
        setTimeout(run(req), 1000);
    }

    onmessage = function (event) {
        var workerData = JSON.parse(event.data);
        studentId = workerData["student"];
        token = workerData["token"];
        postMessage(get("checkaccepted?studentid=" + studentId));
        setTimeout(run(studentId), 1000);
    }
}

function logout(){
    localStorage.removeItem("token");
    setTimeout(function () { window.location.href = "index.html" }, 0);
  }

window.onload = check();
