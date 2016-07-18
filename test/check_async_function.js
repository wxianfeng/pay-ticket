var request = require("request");
var sleep = require('sleep');

function setI(i) {
  // sleep(1);

  console.log(i);
}

// 每次都是输出 10
for (var i = 0; i < 10; i++) {
  // console.log(i);

  // sleep.sleep(1);

  // console.log(i);

  request("https://blockchain.info/q/addressbalance/1BnoTLVc9K2SEQe6USUvxNzJN2dCotoyT7?confirmations=1", function (error, response, body) {
    // console.log(body);

    setI("for: " + i);
  })
}

// console.log("------------------------------------");

var arr = [1,2,3,4,5,6,7,8,9,10];

  // console.log(i);

// 输出 1 - 10
arr.forEach(function(i) {
  // sleep.sleep(1);

  // console.log(i);

  request("https://blockchain.info/q/addressbalance/1BnoTLVc9K2SEQe6USUvxNzJN2dCotoyT7?confirmations=1", function (error, response, body) {
    // console.log(body);

    setI("forEach: " + i);
  })
})

