var sendInventory = function(conn, target, username, logger)
{
  logger.debug("Target \"" + target + "\" asked for inventory.")
  var sendTarget = target
  var sendMessageType = "player"
  var messageObject = {
    type: "event",
    bookmark: 2223,
    content: {
    }
  }

  messageObject.content[target] = "You may have been carrying something, but you lost it cause everything is so asynchronous."

  var messageToSend = sendMessageType + "," +
            sendTarget + "," +
            JSON.stringify(messageObject)

  conn.sendUTF(messageToSend)
}

module.exports = sendInventory;
