"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("../utility");
var namespaces = require("./namespaces");
var itunesParser = require("./itunesParser");
var getChannelTitle = function (node) { return utils.getElementTextContent(node, 'title'); };
var getChannelLinks = function (node) {
    var links = utils.getChildElements(node, 'link');
    return links.map(function (link) { return ({
        url: link.textContent,
        rel: link.getAttribute('rel'),
    }); });
};
var getChannelDescription = function (node) {
    return utils.getElementTextContent(node, 'description');
};
var getChannelLanguage = function (node) {
    return utils.getElementTextContent(node, 'language') || utils.getElementTextContent(node, 'dc:language');
};
var getChannelCopyright = function (node) {
    return utils.getElementTextContent(node, 'copyright') || utils.getElementTextContent(node, 'dc:rights');
};
var getChannelAuthors = function (node) {
    var authors = utils.getElementTextContentArray(node, 'managingEditor');
    return authors.map(function (author) { return ({
        name: author,
    }); });
};
var getChannelLastUpdated = function (node) {
    return utils.getElementTextContent(node, 'lastBuildDate');
};
var getChannelLastPublished = function (node) {
    return utils.getElementTextContent(node, 'pubDate');
};
var getChannelCategories = function (node) {
    var categories = utils.getElementTextContentArray(node, 'category');
    return categories.map(function (category) { return ({
        name: category,
    }); });
};
var getImage = function (node) {
    var imageNodes = utils.getChildElements(node, 'image');
    if (imageNodes.length === 0) {
        return {
            url: undefined,
            title: undefined,
            description: undefined,
            width: undefined,
            height: undefined,
        };
    }
    var imageNode = imageNodes[0];
    return {
        url: utils.getElementTextContent(imageNode, 'url'),
        title: utils.getElementTextContent(imageNode, 'title'),
        description: utils.getElementTextContent(imageNode, 'description'),
        width: utils.getElementTextContent(imageNode, 'width'),
        height: utils.getElementTextContent(imageNode, 'height'),
    };
};
var getItemImage = function (node) { return utils.getElementTextContent(node, 'image'); };
var getItemTitle = function (node) { return utils.getElementTextContent(node, 'title'); };
var getItemLinks = function (node) {
    var links = utils.getChildElements(node, 'link');
    return links.map(function (link) { return ({
        url: link.textContent,
        rel: link.getAttribute('rel'),
    }); });
};
var getItemDescription = function (node) {
    return utils.getElementTextContent(node, 'description');
};
var getItemContent = function (node) {
    return utils.getElementTextContent(node, 'encoded', namespaces.content);
};
var getItemAuthors = function (node) {
    var authors = utils.getElementTextContentArray(node, 'author');
    if (authors.length === 0) {
        authors = utils.getElementTextContentArray(node, 'dc:creator');
    }
    return authors.map(function (author) { return ({
        name: author,
    }); });
};
var getItemCategories = function (node) {
    var categories = utils.getElementTextContentArray(node, 'category');
    if (categories.length === 0) {
        categories = utils.getElementTextContentArray(node, 'dc:subject');
    }
    return categories.map(function (category) { return ({
        name: category,
    }); });
};
var getItemId = function (node) { return utils.getElementTextContent(node, 'guid'); };
var getItemPublished = function (node) {
    return utils.getElementTextContent(node, 'pubDate') ||
        utils.getElementTextContent(node, 'dc:date');
};
var getItemEnclosures = function (node) {
    var enclosures = utils.getChildElements(node, 'enclosure');
    return enclosures.map(function (enclosure) { return ({
        url: enclosure.getAttribute('url'),
        length: enclosure.getAttribute('length'),
        mimeType: enclosure.getAttribute('type'),
    }); });
};
var mapChannelFields = function (document) {
    var channelNodes = utils.getElements(document, 'channel');
    if (!channelNodes || channelNodes.length === 0) {
        throw new Error('Could not find channel node');
    }
    var channelNode = channelNodes[0];
    return {
        title: getChannelTitle(channelNode),
        links: getChannelLinks(channelNode),
        description: getChannelDescription(channelNode),
        language: getChannelLanguage(channelNode),
        copyright: getChannelCopyright(channelNode),
        authors: getChannelAuthors(channelNode),
        lastUpdated: getChannelLastUpdated(channelNode),
        lastPublished: getChannelLastPublished(channelNode),
        categories: getChannelCategories(channelNode),
        image: getImage(channelNode),
        itunes: itunesParser.parseChannel(channelNode)
    };
};
var mapItems = function (document) {
    var itemNodes = utils.getElements(document, 'item');
    return itemNodes.map(function (item) { return ({
        title: getItemTitle(item),
        links: getItemLinks(item),
        description: getItemDescription(item),
        content: getItemContent(item),
        id: getItemId(item),
        imageUrl: getItemImage(item),
        authors: getItemAuthors(item),
        categories: getItemCategories(item),
        published: getItemPublished(item),
        enclosures: getItemEnclosures(item),
        itunes: itunesParser.parseItem(item)
    }); });
};
var parse = function (document) {
    var rssElement = document.getElementsByTagName("rss")[0];
    var version = rssElement.getAttribute("version") || "?";
    return __assign(__assign({ type: "rss-" + version }, mapChannelFields(document)), { items: mapItems(document) });
};
exports.default = parse;
