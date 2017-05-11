import {expect} from 'chai';

describe('EliteFour lambda', () => {

  const lambda = require('../eliteFourLambda.js');

  let event = {
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

  describe('intent handler', () => {

    it('imports as expected', () => {
      expect(lambda.handler).to.not.be.undefined;
    });

    it('throws exception for invalid intent name', () => {
      lambda.handler(event, null, (err, res) => {
        expect(err).to.be.not.null;
        expect(res).to.be.undefined;
      });
    });

    // TODO test the AMAZON.* intents output (pull strings from exports.message)
    it('handles AMAZON.HelpIntent', () => {
      event.request.intent.name = 'AMAZON.HelpIntent';
      lambda.handler(event, null, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.defined;
      });
    });

    it('handles AMAZON.StopIntent', () => {
      event.request.intent.name = 'AMAZON.StopIntent';
      lambda.handler(event, null, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.defined;
      });
    });

    it('handles AMAZON.CancelIntent', () => {
      event.request.intent.name = 'AMAZON.CancelIntent';
      lambda.handler(event, null, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.defined;
      });
    });

  });

});
