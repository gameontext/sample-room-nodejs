var parseGoCommand = function(conn, target, username, content, doors, logger)
{
  var exitName = content.substr(4)

  logger.info("Player \"" + username + "\" wants to go direction \"" + exitName + "\"")


  if(exitName.toUpperCase() === "NORTH"){
    exitId = 'n'
  }
  else if(exitName.toUpperCase() == "SOUTH"){
    exitId = 's'
  }
  else if(exitName.toUpperCase() == "EAST"){
    exitId = 'e'
  }
  else if(exitName.toUpperCase() == "WEST"){
    exitId = 'w'
  }

  logger.debug("Registration: " + doors[exitId])

  if(doors[exitId]){
    logger.info("That direction exists, telling \"" + username + "\" that they've gone that direction.")
    var sendTarget = target
    var sendMessageType = "playerLocation"
    var messageObject = {
      "type": "exit",
      "exitId": exitId,
      "content": "You head " + exitName,
      "bookmark": 6019
    }

    var messageText = sendMessageType + "," +
              sendTarget + "," +
              JSON.stringify(messageObject)

    conn.sendText(messageText)

  }
  else
  {
    logger.info("That direction wasn't found; we're telling the user.")
    var sendTarget = target
    var sendMessageType = "player"
    var messageObject = {
      type: "event",
      content: {

      },
      bookmark: 5302
    }

    messageObject.content[target] = "There isn't an exit with that name, genius."

    var messageText = sendMessageType + "," +
              sendTarget + "," +
              JSON.stringify(messageObject)

    conn.sendText(messageText)
  }

}

module.exports = parseGoCommand;
