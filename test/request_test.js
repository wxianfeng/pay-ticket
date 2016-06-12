var request = require("request")

request('https://blockchain.info/q/addressbalance/asfdfgdgdgjshdkhskdhgxcvdgdsgf?confirmations=1', function (error, response, body) {
  console.log(error);
  console.log(response);
  
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the body.
  }
})

