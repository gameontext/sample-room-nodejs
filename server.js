var ws = require("nodejs-websocket");
var https = require("https");
var crypto = require("crypto");
var winston = require('winston');

// User credentials
var gameonUID = (process.env.GAMEONUID|| '');
var gameonAPIKey = (process.env.GAMEONAPIKEY|| '');

// Room Details
// Your room's name
var theRoomName = (process.env.ROOM_NAME || '');
var fullName = 'This is a CF in bluemix';
// The hostname of your CF applicaiton
var endpointip = (JSON.parse(process.env.VCAP_APPLICATION).application_uris[0] || 'localhost')
// Automatically retrieves the port of your CF
var port = (process.env.CF_INSTANCE_PORT || 3000);


var logger = new winston.Logger({
  level: 'debug',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: './access.log' })
  ]
});


var registration = {
  "fullName": fullName,
  "name": theRoomName,
  "connectionDetails": {
    "type": "websocket",
    "target": "ws://"+ endpointip,
  },
  "doors":
    {
      "n": "North",
      "s": "South",
      "e": "East",
      "w": "West",
    },
}

function register()
{
  logger.info("Registering with the concierge...")

  var body = JSON.stringify(registration)
  var now = new Date()
  var timestamp = new Date(now - 75000).toISOString()
  var uidParams = 'id=' + gameonUID
  var queryParams = 'stamp=' + timestamp
  logger.info("Now!: " + now)
  logger.info("Timestamp: " + timestamp)
  logger.info("Query Parameters: " + queryParams)

  logger.debug("Registration object: " + JSON.stringify(registration))

  var bodyHash = crypto.createHash('sha256')
  bodyHash = bodyHash.update(body).digest('base64')
  console.log("BODY HASH " + bodyHash)

  var allParams = gameonUID+timestamp+bodyHash
  var hash = crypto.createHmac('sha256', gameonAPIKey).update(allParams).digest('base64')

  console.log("HASH : " + hash)



  var options = {
    host: 'game-on.org',
    path: '/map/v1/sites',
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'gameon-id':gameonUID,
      'gameon-date': timestamp,
      'gameon-sig-body': bodyHash,
      'gameon-signature': hash
    }
  };

  logger.debug("Options: " + JSON.stringify(options))

  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      logger.debug("Received response: " + str);
    });
  }
  var req = https.request(options, callback);

  req.write(JSON.stringify(registration));
  req.end();
}

setInterval(register, 60000)
register()

var wsServer = ws.createServer(function (conn) {
  conn.on("text", function (incoming) {
    logger.debug("RECEIVED: " + incoming)
    var typeEnd = incoming.indexOf(',')
    var targetEnd = incoming.indexOf(',', typeEnd+1)

    var messageType = incoming.substr(0,typeEnd)
    var target = incoming.substr(typeEnd+1, targetEnd-typeEnd-1)
    var objectStr = incoming.substr(targetEnd+1)
    var object = {}
    try
    {
      object = JSON.parse(objectStr)
    }
    catch (err)
    {
      logger.error("Got improper json: " + objectStr)
    }

    logger.info("Parsed a message of type \"" + messageType + "\" sent to target \"" + target + "\".")

    //if (target != theRoomName)
    //  return

    if (messageType === "roomHello")
    {
      logger.debug("In roomHello")
      sayHello(conn, object.userId, object.username)
    }
    else if (messageType === "room")
    {
      if (object.content.indexOf('/') == 0)
      {
        parseCommand(conn, object.userId, object.username, object.content)
      }
      else
      {
        sendChatMessage(conn, object.username, object.content)
      }
    }
    else if (messageType === "roomGoodbye")
    {
      sayGoodbye(conn, object.userId, object.username)
    }
    else
    {
      sendUnknownType(conn, object.userId, object.username, messageType)
    }
  })
  conn.on("close", function (code, reason) {
    logger.debug("Connection closed.")
  })
}).listen(port);

function sendUnknownType(conn, target, username, messageType)
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

  conn.sendText(messageToSend)
}

function sendChatMessage(conn, username, content) {
  logger.info(username + " sent chat message \"" + content + "\"")
  var responseObject = {
          type: "chat",
          username: username,
          content: content,
          bookmark: 92
        }

        var sendMessageType = "player"
        var sendTarget = "*"

        var messageText = sendMessageType + "," +
                  sendTarget + "," +
                  JSON.stringify(responseObject)

    broadcast(messageText)
}

function parseCommand(conn, target, username, content) {

  if (content.substr(1,3) == "go ")
  {
    parseGoCommand(conn, target, username, content)
  }
  /*else if (content.substr(1, 5) == "exits")
  {
    sendExits(conn, target, username)
  }
  else if (content.substr(1, 4) == "help")
  {
    sendHelp(conn, target, username)
  }
  else if (content.substr(1, 9) == "inventory")
  {
    sendInventory(conn, target, username)
  }*/
  else if (content.substr(1, 7) == "examine")
  {
    sendExamine(conn, target, username)
  }
  else
  {
    sendUnknownCommand(conn, target, content)
  }
}

function sendInventory(conn, target, username)
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

  conn.sendText(messageToSend)
}

function sendExamine(conn, target, username)
{
  logger.debug("Target \"" + target + "\" asked for examination.")
  var sendTarget = target
  var sendMessageType = "player"
  var messageObject = {
    type: "event",
    bookmark: 2223,
    content: {
    }
  }

  messageObject.content[target] = "There's nothing in here to really examine."

  var messageToSend = sendMessageType + "," +
            sendTarget + "," +
            JSON.stringify(messageObject)

  conn.sendText(messageToSend)
}

function parseGoCommand(conn, target, username, content)
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

  logger.debug("Registration: " + registration.doors[exitId])

  if(registration.doors[exitId]){
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

function sendUnknownCommand(conn, target, content) {
  logger.info("Unknown command from user: " + content)
  var responseObject = {
          type: "event",
          "content": {
          }
        }

    responseObject.content[target] = "Node.js looked at your command, and barfed."
        var sendMessageType = "player"
        var sendTarget = target

        var messageText = sendMessageType + "," +
                  sendTarget + "," +
                  JSON.stringify(responseObject)

    conn.sendText(messageText)
}

function sayGoodbye(conn, target, username) {
  logger.debug("Announcing that \"" + username + "\" has left the room.")
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

  broadcast(broadcastMessage)
}

function sayHello(conn, target, username) {

  logger.info("Saying hello to \"" + target + "\"")
  var responseObject = {
      "type": "location",
      "name": theRoomName,
      "fullName": fullName,
      "description": "This room is filled with little JavaScripts running around everywhere.",
    }

    var sendMessageType = "player"
    var sendTarget = target

    var messageText = sendMessageType + "," +
              sendTarget + "," +
              JSON.stringify(responseObject)

  conn.sendText(messageText)

  logger.debug("And announcing that \"" + username + "\" has arrived.")
  var broadcastMessageType = "player"
  var broadcastMessageTarget = "*"
  var broadcastMessageObject = {
    type: "event",
    content: {
      "*": username + " enters the room."
    },
    bookmark: 51
  }
  var broadcastMessage = broadcastMessageType + "," +
              broadcastMessageTarget + "," +
              JSON.stringify(broadcastMessageObject)

  broadcast(broadcastMessage)
}

function broadcast(message) {
  wsServer.connections.forEach(function (conn) {
        conn.sendText(message)
    })
}

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log("UNCAUGHT EXCEPTION! " + err)
})

logger.info("The WebSocket server is listening...")
