var net = require('net');
var q = require('q');
var _ = require('lodash');

var guid = 'com.portfolium.pfmon-heartbeat';

exports.monitor = function (config) {
    if (_.isArray(config.hosts)) {
        var funcs = [];

        _.each(config.hosts, function (host) {
            var f = q.promise(function (resolve, reject) {
                var client = net.connect(host, function () {
                    client.end();
                    return resolve(_.assign({}, host, {ping: 1}));
                });
                client.on('error', function (err) {
                    return resolve(_.assign({}, host, {ping: 0}));
                });
            });
            funcs.push(f);
        });

        return q.all(funcs).then(function (results) {
            results = _.map(results, function (result) {
                return component(result, config);
            });
            return results;
        });
    }
    return q.reject("Invalid configuration");
};

var component = function (data, config) {
    var name = data.host;
    if (data.port) {
        name = `${name}:${data.port}`;
    }
    var comp = {
        name: name,
        guid: guid,
        duration: config.duration,
        metrics: {
            'Component/Availability/heartbeat[pings|sent]': {
                count: data.ping,
                total: 1
            }
        }
    };
    return comp;
};
