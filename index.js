'use strict';

var MODULE_NAME = 'plugin-httpauth';

var auth = require('http-auth');
var _ = require('underscore');
var fs = require('fs');

var nodeplayerConfig = require('nodeplayer-config');
var coreConfig = nodeplayerConfig.getConfig();
var defaultConfig = require('./default-config.js');
var config = nodeplayerConfig.getConfig(MODULE_NAME, defaultConfig);

exports.init = function(player, logger, callback) {
    // dependencies
    if (!player.app) {
        callback('module must be initialized after expressjs module!');
    } else {
        var basic = auth.basic({
                realm: 'nodeplayer'
            }, function(username, password, callback) {
                callback(username === config.username && password === config.password);
            }
        );

        _.each(config.paths, function(path) {
            player.app.use(path, auth.connect(basic));
        });
        callback();
    }
};
