
var should = require('should');
var utls = require('../index.js');

describe('lockit-utils', function() {

  it('should protect routes from unauthorized access', function(done) {
    var req = {
      session: {
        username: null,
        email: null
      }
    };
    var fn = utls.restrict();
    var res = {
      redirect: function(route) {
        // simply make sure res.redirect() is called
        done();
      }
    };
    fn(req, res, function() {});
  });

  it('should allow access to authorized users', function(done) {
    var req = {
      session: {
        username: 'john',
        email: 'john@email.com'
      }
    };
    var res = {};
    var fn = utls.restrict();
    // simply make sure next() is called
    fn(req, res, function() {
      done();
    });
  });

  it('should use the default route when none is specified', function(done) {
    var req = {
      session: {
        username: null,
        email: null
      }
    };
    var fn = utls.restrict();
    var res = {
      redirect: function(route) {
        route.should.equal('/login');
        done();
      }
    };
    fn(req, res, function() {});
  });

  it('should use the custom route if one is specified', function(done) {
    var req = {
      session: {
        username: null,
        email: null
      }
    };
    var config = {
      loginRoute: '/test'
    };
    var fn = utls.restrict(config);
    var res = {
      redirect: function(route) {
        route.should.equal('/test');
        done();
      }
    };
    fn(req, res, function() {});
  });
  
});