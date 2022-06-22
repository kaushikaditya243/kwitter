function addUser() {
    username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    window.location = ("kwitter_room.html");
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
    window.location("index.html");
}