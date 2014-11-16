var app = require('../app');
var request = require('supertest');
var assert = require('assert');

describe('WAAF', function(){

  describe('when requesting resource /', function(){
    it('should return a view', function(done){
      request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
      .end(function(err, res){
        if (err) throw err;
      });
      done();
    });
  });

});


