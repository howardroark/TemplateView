'use strict';

var testSuite = require('./test.js');
var argv = require('optimist').default('laxMode', false).default('browser', 'chrome').argv;
var rootUrl = 'http://localhost:9000';

testSuite.todoMVCTest(
    'TemplateView',
    rootUrl, argv.speedMode,
    argv.laxMode, argv.browser);
