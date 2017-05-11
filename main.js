var lambda = require('./lambda.js');
console.log(lambda);

const event = {

}

const callback = (err, res) => {
  if (err) {
    console.log("err: ", err);
  } else {
    console.log("res: ", res);
  }
}

lambda.handler(event, null, callback);
