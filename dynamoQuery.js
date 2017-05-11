const AWS = require('aws-sdk');

AWS.config.loadFromPath('access/aws-sdk_config.json');

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "EliteFour-Pokemon",
  KeyConditionExpression: "#name = :name",
  ExpressionAttributeNames: {
    "#name": "name"
  },
  ExpressionAttributeValues: {
    ":name": "pikachu"
  },
  Limit: 5
}

docClient.query(params, (err, data) => {
  if (err) {
    console.log("unable to query: ", JSON.stringify(err, null, 2));
  } else {
    console.log("query successful");
    data.Items.forEach(item => {
      console.log(item);
    });
  }
});
