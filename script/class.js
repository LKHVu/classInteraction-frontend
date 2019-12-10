const URL = "http://localhost:8080/api/";
var seat = document.getElementById("seat");
var active = document.getElementById("active");
var year = document.getElementById("year");
var info;
var table = document.getElementById("table");
var state = [];

function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", URL + param, false);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse
}

function put(param) {
    var req = new XMLHttpRequest();
    req.open("PUT", URL + param, false);
    req.send(null);
}

function load() {
    var tableContent = "";
    table.innerHTML = "";
    year.innerHTML = "";
    var req = window.location.search;
    state = get("state" + req);
    info = get("class" + req);
    console.log(info);
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

    for (i = 1; i <= info["rows"]; i++) {
        tableContent += "<tr>";
        for (j = 1; j <= info["cols"]; j++) {
            tableContent += "<td>\r\n" +
                "<div class=\"bigCell\">\r\n" +
                "<img id='img " + i + " " + j + "'>" +
                "<div class=\"cellBottom\">\r\n" +
                "<span class=\"studentName\" id='name " + i + " " + j + "'></span>" +
                "<div class=\"checkContainer\">\r\n" +
                "<div id='classCheck " + i + " " + j + "' class=\"classCheck\"></div>\r\n" +
                "<div id='exchange " + i + " " + j + "' class=\"exchangeCheck\"></div>\r\n" +
                "</div>\r\n" +
                "</div>\r\n" +
                "</div>\r\n" +
                "</td>";
        }
        tableContent += "</tr>";
    }
    table.innerHTML = tableContent;

    for (i = 0; i < state.length; i++) {
        var row = state[i]["row"];
        var col = state[i]["col"];
        var imgOccupied = document.getElementById("img " + row + " " + col);
        var nameOccupied = document.getElementById("name " + row + " " + col);
        var classCheckOccupied = document.getElementById("classCheck " + row + " " + col);
        var exchangeOccupied = document.getElementById("exchange " + row + " " + col);
        var studentId = parseInt(state[i]["student"]);
        var studentInfo = get("student?id=" + studentId);
        console.log(studentInfo);
        imgOccupied.src = studentInfo["img"];
        nameOccupied.innerHTML = studentInfo["name"];
        if (studentInfo["year"]==info["year"]){
            classCheckOccupied.className += " rightClass";
        } else {
            classCheckOccupied.className += " wrongClass";
        }
        if (studentInfo["exchange"]==1){
            exchangeOccupied.className += " isExchange";
        }

    }
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

window.onload = load();