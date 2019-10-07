var assert = require('assert');
var should = require('chai').should();
var Skill = require('../models/skill');
var Uzer = require('../models/uzer.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');

chai.use(chaiHttp);

describe('Skill', function(){
  it('should have a name', function(){
    let skill = new Skill({name: 'Node.js'});
    skill.should.have.property('name');
  });

  // other tests go here
});

describe('/GET skillz',() => {
  it('it should GET all the skills', (done) => {
    chai.request(server)
      .get('/allskillz')
      .end((err, res) => {
        res.should.have.status(200);
      done();
      });
  });
});

describe('/POST skill', () => {
  it('it should not POST a skill without a name', (done) => {
    let skill = {
    }
    chai.request(server)
      .post('/skill')
      .send(skill)
      .end((err, res) =>{
        res.should.have.status(400);
      done();
      });
  });
  it('it should POST a skill', (done) => {
    let skill = {
      name:"testing"
    }
    chai.request(server)
      .post('/skill')
      .send(skill)
      .end((err, res) => {
        res.should.have.status(200);
      done();
      });
  });
});

// describe('/GET/:id skill',() => {
//   it('it should GET a skill by the given id', (done) => {
//     let skill = new Skill({})
//   })
// })