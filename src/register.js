var crypto = require("crypto");
var https = require("https");

var register = function(gameonUID, gameonSecret, registration, logger)
{
  if (gameonUID !== '')
  {
    logger.info("Registering with the map service...")

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
    var hash = crypto.createHmac('sha256', gameonSecret).update(allParams).digest('base64')

    console.log("HASH : " + hash)

    var options = {
      host: 'gameontext.org',
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
  else
  {
    logger.info('Not registering as no valid config is available')
  }
}

module.exports = register;
