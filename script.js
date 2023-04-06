var socket = io('3.134.238.10');

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
  $.get("http://localhost:3000/chat", (data) => {
    data.forEach(addMessages);
  });
}

function sendMessage(message) {
  $.post("http://localhost:3000/chat", message);
}

//  https://real-time-chat-js.onrender.com/