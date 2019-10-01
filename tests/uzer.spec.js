var assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;
var Uzer = require('../models/uzer');

describe('Uzer', function(){

  it('should have a slack id', function(){
    let uzer= new Uzer({slackId: '123456'});
    uzer.should.have.property('slackId');
  });

  it('should not have any skills by default', function(){
    let uzer= new Uzer({slackId: '123456'});
    expect(uzer.skills).to.be.an('array').that.is.empty;
  });
  
});