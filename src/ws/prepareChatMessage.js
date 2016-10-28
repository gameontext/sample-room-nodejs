var prepareChatMessage = function(conn, username, content) {
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

    return messageText;
}

module.exports = prepareChatMessage;
