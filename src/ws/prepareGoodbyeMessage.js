var prepareGoodbyeMessage = function (conn, target, username) {

  var broadcastMessageType = "player"
  var broadcastMessageTarget = "*"
  var broadcastMessageObject = {
    type: "event",
    content: {
      "*": username + " leaves the room."
    },
    bookmark: 1001
  }
  var broadcastMessage = broadcastMessageType + "," +
              broadcastMessageTarget + "," +
              JSON.stringify(broadcastMessageObject)

  return broadcastMessage;
}

module.exports = prepareGoodbyeMessage;
