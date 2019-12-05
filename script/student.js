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

function load(){
    var classArr = get("showclass");
    for (var i=0; i<classArr.length; i++){
        var classname = classArr[i]["name"];
        classes.innerHTML += ' <a href="classStu.html?name=' + classname + '">' + classname + '</a>';
    }
}

window.onload = load();