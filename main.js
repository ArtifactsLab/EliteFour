var lambda = require('./eliteFourLambda.js');
console.log(lambda);

const event = {
  session: {
    application: {
      applicationId: "application1"
    },
    new: false,
    sessionId: "session1"
  },
  request: {
    type: "IntentRequest",
    requestId: "request1",
    intent: {
      name: ""
    }
  }
}

const callback = (err, res) => {
  if (err) {
    console.log("err: ", err);
  } else {
    console.log("res: ", res);
  }
}

lambda.handler(event, null, callback);
