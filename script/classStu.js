const URL = "http://localhost:8080/api/";
var seat = document.getElementById("seat");
var active = document.getElementById("active");
var activeQuestions = document.getElementById("activeQuestions");

function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", URL + param, false);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse;
}

function post(param, data){
    var req = new XMLHttpRequest();
    req.open("POST", URL + param, false);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(data);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse;
}

function load(){
    showActiveQuestions();
    seat.innerHTML = "";
    var req = window.location.search;
    var state = get("state" + req);
    var info = get("class" + req);
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
            seat.innerHTML += "<span id='" + i + " " + j + "' style='cursor: pointer;' onClick='chooseSeat(this)'>*</span>  "
            if (j==info["cols"]){
                seat.innerHTML += "<br>";
            }
        }
    }
    for (i=0; i<state.length; i++){
        var row = state[i]["row"];
        var col = state[i]["col"];
        var seatOccupied = document.getElementById(row + " " + col);
        seatOccupied.style = "color: red;";
    }
}

function chooseSeat(span){
    var coord = span.id.split(" ");
    var req = window.location.search;
    var classname = req.replace('?name=', '');
    var data = JSON.stringify({"class": classname, "row": coord[0], "col": coord[1], "student": 1});
    alert(post("createstate", data)["Result"]);
    load();
}

function showActiveQuestions(){
    var req = window.location.search;
    var className = req.replace('?name=', '');
    var questions = get("activequestion?className=" + className);
    for (i=0; i<questions.length; i++){
        activeQuestions.innerHTML += " <a href=quizStu.html?questionid=" + questions[i]["id"] + ">" + questions[i]["name"] + "</a>"
    }
}


window.onload = load();
