var _ = require("lodash");
var expect = require("chai").expect;
var monitor = require('../index').monitor;
var net = require('net');

var config1 = {
    "guid": "com.portfolium.pfmon-heartbeat",
    "duration": 60,
    "hosts": [
        {"host": "localhost", "port": 13696},
        {"host": "localhost", "port": 13082},
        {"host": "localhost", "port": 13471}
    ]
};

describe('pfmon-heartbeat', function() {
    var server;

    describe('ping tcp port 13696', function() {
        var port = 13696;

        before(function (done) {
            server = net.createServer();
            server.listen(port, function () {
                done();
            });
        });

        after(function (done) {
            server.close(function () {
                done();
            });
        });

        it('should connect to the tcp port', function(done) {
            monitor(config1).then(function (data) {
                expect(data).to.be.an.object;
                var t1 = _.find(data, {name: 'localhost:'+port}).metrics['Component/Availability/heartbeat[pings|sent]'].count;
                expect(t1).to.equal(1);
                done();
            }, function (err) {
                done(err);
            });
        });
    });

    describe('ping tcp port 13082', function() {
        var port = 13082;

        before(function (done) {
            server = net.createServer();
            server.listen(port, function () {
                done();
            });
        });

        after(function (done) {
            server.close(function () {
                done();
            });
        });

        it('should connect to the tcp port', function(done) {
            monitor(config1).then(function (data) {
                expect(data).to.be.an.object;
                var t1 = _.find(data, {name: 'localhost:'+port}).metrics['Component/Availability/heartbeat[pings|sent]'].count;
                expect(t1).to.equal(1);
                done();
            }, function (err) {
                done(err);
            });
        });
    });

    describe('ping tcp port 13471', function() {
        var port = 13471;

        before(function (done) {
            server = net.createServer();
            server.listen(port, function () {
                done();
            });
        });

        after(function (done) {
            server.close(function () {
                done();
            });
        });

        it('should connect to the tcp port', function(done) {
            monitor(config1).then(function (data) {
                expect(data).to.be.an.object;
                var t1 = _.find(data, {name: 'localhost:'+port}).metrics['Component/Availability/heartbeat[pings|sent]'].count;
                expect(t1).to.equal(1);
                done();
            }, function (err) {
                done(err);
            });
        });
    });
});
