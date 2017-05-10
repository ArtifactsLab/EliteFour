import {expect} from 'chai';

describe('import logic', () => {

  describe('aws-sdk', () => {

    const AWS = require("aws-sdk");

    it('imports as expected', () => {
      expect(AWS).to.not.be.undefined;
    });

    it('configures from file', () => {
      AWS.config.loadFromPath('test/test_config.json');

      expect(AWS.config.credentials.accessKeyId).to.equal('123');
      // secretAccessKey seems hidden ...
      expect(AWS.config.region).to.equal('mars');
    });

  });

});
