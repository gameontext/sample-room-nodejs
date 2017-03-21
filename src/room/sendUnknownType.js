var sendUnknownType = function(conn, target, username, messageType, logger)
{
  logger.debug("Target \"" + target + "\" sent unknown message type \"" + messageType + "\".")
  var sendTarget = target
  var sendMessageType = "player"
  var messageObject = {
    type: "event",
    bookmark: 225,
    content: {
    }
  }

  messageObject.content[target] = "'" + messageType +"' is not a known message type!"

  var messageToSend = sendMessageType + "," +
            sendTarget + "," +
            JSON.stringify(messageObject)

  conn.sendUTF(messageToSend)
}

module.exports = sendUnknownType;
