var assert = require('assert');
var should = require('chai').should();
var Skill = require('../models/skill');

describe('Skill', function(){
  it('should have a name', function(){
    let skill = new Skill({name: 'Node.js'});
    skill.should.have.property('name');
  });

  // other tests go here
});