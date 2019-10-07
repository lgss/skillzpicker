var assert = require('assert');
var should = require('chai').should();
var Skill = require('../models/skill');
var Uzer = require('../models/uzer.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');

chai.use(chaiHttp);

describe('Uzer', function(){
    it('should have a slackID', function(){
      let uzer = new Uzer({slackId:'abcd123'});
      uzer.should.have.property('slackId')
    });
});