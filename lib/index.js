"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var xmldom_1 = require("xmldom");
var rss_1 = require("./parsers/rss");
var atomv1_1 = require("./parsers/atomv1");
var getParser = function (document) {
    if (document.getElementsByTagName('channel')[0]) {
        return rss_1.default;
    }
    else if (document.getElementsByTagName('feed')[0]) {
        return atomv1_1.default;
    }
    return null;
};
var parse = function (feed) {
    return new Promise(function (resolve, reject) {
        var document = new xmldom_1.DOMParser({
            errorHandler: function (_level, msg) {
                reject(msg);
            }
        }).parseFromString(feed, 'text/xml');
        if (!document) {
            reject("Unable to parse document!");
        }
        var parser = getParser(document);
        if (parser) {
            resolve(parser(document));
        }
        else {
            reject("Unable to RSS elements!");
        }
    });
};
exports.parse = parse;
