"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/texthub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveText", function (text) {
    var li = document.createElement("li");
    li.textContent = text;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var text = document.getElementById("messageInput").value;
    connection.invoke("BroadcastText", text).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
