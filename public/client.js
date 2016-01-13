var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    socket.send('voteCast', this.innerText);
  });
}

var currentTally = document.getElementById('current-tally');

socket.on('voteCount', function(votes) {
  result = ""
  for (var choice in votes) {
    result += choice + ": " + votes[choice] + " ";
  }
  currentTally.innerText = "Vote Results: " + result;
});

var currentChoice = document.getElementById('current-choice');

socket.on('currentChoice', function(message) {
  currentChoice.innerText = "Your current vote is " + message;
});
