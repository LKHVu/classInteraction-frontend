// const server = "http://localhost:8080/api/";
const server = "http://vguclassroom-backend.herokuapp.com/api/";
var loginInput = document.getElementById("loginInput");
var passwordInput = document.getElementById("passwordInput");

function post(param, data) {
    var req = new XMLHttpRequest();
    req.open("POST", server + param, false);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(data);
    var data = req.responseText;
    var jsonResponse = JSON.parse(data);
    return jsonResponse;
}

function login() {
    var data = JSON.stringify({
        "login": loginInput.value,
        "password": passwordInput.value
    });
    var token = post("login", data)["token"];
    if (token != null) {
        localStorage.setItem("token", token);
        var payload = jwt_decode(token);
        navigate(payload);
    } else {
        alert("Login failed");
    }
}

function navigate(payload) {
    if (payload["role"] == 1) {
        setTimeout(function () { window.location.href = "admin.html" }, 0);
    } else if (payload["role"] == 2) {
        setTimeout(function () { window.location.href = "teacher.html" }, 0);
    } else if (payload["role"] == 3) {
        setTimeout(function () { window.location.href = "student.html" }, 0);
    }
}

function load() {
    var token = localStorage.getItem("token");
    if (token != null) {
        var payload = jwt_decode(token);
        navigate(payload);
    }
}

window.onload = load();