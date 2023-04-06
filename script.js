var socket = io();

$(() => {
  $("#sendButton").click(() => {
    if ($("#name").val() != "" && $("#message").val() != ""){
      sendMessage({
        name: $("#name").val(),
        message: $("#message").val(),
        date: Date.now(),
      });
      document.getElementById("message").value = "";
    }
  });
  getMessages();
});

socket.on("message", addMessages);

function addMessages(message) {
  $("#chat").prepend(
    `<h4> ${message.name} </h4> <p> ${message.message} </p>`
  );
}

function getMessages() {
  $.get("https://real-time-chat-js.onrender.com/chat", (data) => {
    data.forEach(addMessages);
  });
}

function sendMessage(message) {
  $.post("https://real-time-chat-js.onrender.com/chat", message);
}

//  https://real-time-chat-js.onrender.com/