const URL = "http://localhost:8080/api/";
var seat = document.getElementById("seat");
var active = document.getElementById("active");
var state = [];
var start = document.getElementById("start");
var end = document.getElementById("end");

function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", URL + param, false);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse
}

function put(param){
    var req = new XMLHttpRequest();
    req.open("PUT", URL + param, false);
    req.send(null);
}

function load(){
    seat.innerHTML = "";
    var req = window.location.search;
    state = get("state" + req);
    var info = get("class" + req);
    start.innerHTML = info["startHour"] + ":" + info["startMinute"];
    end.innerHTML = info["endHour"] + ":" + info["endMinute"];
    if (info["active"]==1){
        active.style="color: green; font-weight: bold; display: inline";
        active.innerHTML="ON";
    } else {
        if (info["active"]==0){
            active.style="color: red; font-weight: bold; display: inline";
            active.innerHTML="OFF";
        }
    }
    for (i=1; i<=info["rows"]; i++){
        for (j=1; j<=info["cols"]; j++){
            seat.innerHTML += "<span id='" + i + " " + j + "' onClick='showStudent(this)'>*</span>"
            if (j==info["cols"]){
                seat.innerHTML += "<br>";
            }
        }
    }
    for (i=0; i<state.length; i++){
        var row = state[i]["row"];
        var col = state[i]["col"];
        var seatOccupied = document.getElementById(row + " " + col);
        seatOccupied.style = "color: red; cursor: pointer";
    }
}

function showStudent(span){
    if (span.style.cssText=="color: red; cursor: pointer;"){
        var coord = span.id.split(" ");
        for (i=0; i<state.length; i++){
            if (parseInt(coord[0])==state[i]["row"]){
                if (parseInt(coord[1])==state[i]["col"]){
                    var student = parseInt(state[i]["student"]);
                    var studentName = get("student?id=" + student)["name"];
                    var stu = document.getElementById("student");
                    stu.innerHTML = studentName;
                }
            }
        }
    }
}


function activeClass(){
    var req = window.location.search;
    put("activeclass" + req);
    load();
}

window.onload = load();