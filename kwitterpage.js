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
roomname = localStorage.getItem("roomname");

function getData() {
    firebase.database().ref("/" + roomname).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;

                console.log("firebase message id=" + firebase_message_id);
                console.log("message_data=" + message_data);

                message = message_data["message"];
                name = message_data["name"];
                like = message_data["like"];

                namewidthtag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                messagewidthtag = "<h4 class='message_h4'>" + message + "</h4>";
                likebutton = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updatelike(this.id)'>";
                spanwidthtag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span> </button> <hr>";

                row = namewidthtag + messagewidthtag + likebutton + spanwidthtag;
                document.getElementById("output").innerHTML += row;

            }
        });
    });
}
getData();

function send() {
    msg = document.getElementById("msg").value;
    if (msg.length > 0) {
        firebase.database().ref(roomname).push({
            name: username,
            message: msg,
            like: 0
        });
    }


    document.getElementById("msg").value = "";
}


function logout() {
    localStorage.removeItem("roomname");
    localStorage.removeItem("username");
    window.location = "index.html"
}

function updatelike(message_id) {
    console.log("clicked on like button -" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(roomname).child(message_id).update({
        like: updated_likes
    });
}