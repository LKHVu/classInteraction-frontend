const URL = "http://localhost:8080/api/";
var classes = document.getElementById("classes");


function get(param) {
    var req = new XMLHttpRequest();
    req.open("GET", URL + param, false);
    req.send(null);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse;
}

function post(param, data) {
    var req = new XMLHttpRequest();
    req.open("POST", URL + param, false);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(data);
}

function load() {
    var classArr = get("showclass");
    classes.innerHTML = "";
    for (var i = 0; i < classArr.length; i++) {
        classes.innerHTML += " " + classArr[i]["name"];
    }
}

function createClass() {
    var name = document.getElementById("classname").value;
    var row = document.getElementById("row").value;
    var col = document.getElementById("col").value;
    var starthour = document.getElementById("starthour").value;
    var startminute = document.getElementById("startminute").value;
    var endhour = document.getElementById("endhour").value;
    var endminute = document.getElementById("endminute").value;
    var data = JSON.stringify({
        "name": name, "row": row, "col": col, "starthour": starthour, "startminute": startminute,
        "endhour": endhour, "endminute": endminute
    });
    post("createclass", data);
    load();
    ;
}

function unhide() {
    document.getElementById('classname').style.display = "block";
    document.getElementById('row').style.display = "block";
    document.getElementById('col').style.display = "block";
    document.getElementById('submit').style.display = "block";
    document.getElementById('starthour').style.display = "block";
    document.getElementById('startminute').style.display = "block";
    document.getElementById('endhour').style.display = "block";
    document.getElementById('endminute').style.display = "block";
}

window.onload = load();