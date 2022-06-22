var firebaseConfig = {
    apiKey: "AIzaSyBRwixZEgTfoisO616qDjDedyruMgMS9iA",
    authDomain: "kwitter-984f3.firebaseapp.com",
    databaseURL: "https://kwitter-984f3-default-rtdb.firebaseio.com",
    projectId: "kwitter-984f3",
    storageBucket: "kwitter-984f3.appspot.com",
    messagingSenderId: "399144857749",
    appId: "1:399144857749:web:aaf9e20500cefcf056ab9c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
username = localStorage.getItem("username");
document.getElementById("username").innerHTML = "Welcome " + username;

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("roomname=" + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;

        });
    });
}
getData();

function addRoom() {
    roomname = document.getElementById("roomname").value;
    firebase.database().ref("/").child(roomname).update({
        purpose: "adding room name"
    });
    localStorage.setItem("roomname", roomname);
    window.location = "kwitter_page.html";

}

function redirectToRoomName(name) {
    console.log("name=" + name);
    localStorage.setItem("roomname", name);
    window.location = "kwitter_page.html";
}

function logout() {
    localStorage.removeItem("roomname");
    localStorage.removeItem("username");
    window.location = "index.html"
}