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
var itunesParser = require("./itunesParser");
var getChannelTitle = function (node) { return utils.getElementTextContent(node, 'title'); };
var getChannelLinks = function (node) {
    var links = utils.getChildElements(node, 'link');
    return links.map(function (link) { return ({
        url: link.getAttribute('href'),
        rel: link.getAttribute('rel'),
    }); });
};
var getChannelDescription = function (node) {
    return utils.getElementTextContent(node, 'subtitle');
};
var getChannelCopyright = function (node) {
    return utils.getElementTextContent(node, 'rights');
};
var getChannelAuthors = function (node) {
    var authors = utils.getChildElements(node, 'author');
    return authors.map(function (author) { return ({
        name: utils.getElementTextContent(author, 'name'),
    }); });
};
var getChannelLastUpdated = function (node) {
    return utils.getElementTextContent(node, 'updated');
};
var getChannelLastPublished = function (node) {
    return utils.getElementTextContent(node, 'published');
};
var getChannelCategories = function (node) {
    var categories = utils.getChildElements(node, 'category');
    return categories.map(function (category) { return ({
        name: category.getAttribute('term'),
    }); });
};
var getChannelImage = function (node) {
    var img = utils.getElementTextContent(node, 'image');
    if (img === '' || img === undefined) {
        img = utils.getElementTextContent(node, 'logo');
    }
    if (img === '' || img === undefined) {
        img = utils.getElementTextContent(node, 'icon');
    }
    return {
        url: img,
        title: undefined,
        description: undefined,
        width: undefined,
        height: undefined,
    };
};
var getItemTitle = function (node) { return utils.getElementTextContent(node, 'title'); };
var getItemLinks = function (node) {
    var links = utils.getChildElements(node, 'link');
    var linksWithoutEnclosures = links.filter(function (link) { return link.getAttribute('rel') !== 'enclosure'; });
    return linksWithoutEnclosures.map(function (link) { return ({
        url: link.getAttribute('href'),
        rel: link.getAttribute('rel'),
    }); });
};
var getItemDescription = function (node) {
    return utils.getElementTextContent(node, 'summary');
};
var getItemContent = function (node) { return utils.getElementTextContent(node, 'content'); };
var getItemImage = function (node) { return utils.getElementTextContent(node, 'icon'); };
var getItemAuthors = function (node) {
    var authors = utils.getChildElements(node, 'author');
    return authors.map(function (author) { return ({
        name: utils.getElementTextContent(author, 'name'),
    }); });
};
var getItemCategories = function (node) {
    var categories = utils.getChildElements(node, 'category');
    return categories.map(function (category) { return ({
        name: category.getAttribute('term'),
    }); });
};
var getItemPublished = function (node) {
    var pub = utils.getElementTextContent(node, 'updated');
    if (pub === '' || pub === undefined) {
        pub = utils.getElementTextContent(node, 'published');
    }
    return pub;
};
var getItemId = function (node) { return utils.getElementTextContent(node, 'id'); };
var getItemEnclosures = function (node) {
    var links = utils.getChildElements(node, 'link');
    var enclosureLinks = links.filter(function (link) { return link.getAttribute('rel') === 'enclosure'; });
    return enclosureLinks.map(function (link) { return ({
        url: link.getAttribute('href'),
        length: link.getAttribute('length'),
        mimeType: link.getAttribute('type'),
    }); });
};
var mapChannelFields = function (document) {
    var channelNodes = utils.getElements(document, 'feed');
    if (!channelNodes || channelNodes.length === 0) {
        throw new Error('Could not find channel node');
    }
    var channelNode = channelNodes[0];
    return {
        title: getChannelTitle(channelNode),
        links: getChannelLinks(channelNode),
        language: undefined,
        description: getChannelDescription(channelNode),
        copyright: getChannelCopyright(channelNode),
        authors: getChannelAuthors(channelNode),
        lastUpdated: getChannelLastUpdated(channelNode),
        lastPublished: getChannelLastPublished(channelNode),
        categories: getChannelCategories(channelNode),
        image: getChannelImage(channelNode),
        itunes: itunesParser.parseChannel(channelNode),
    };
};
var mapItems = function (document) {
    var itemNodes = utils.getElements(document, 'entry');
    return itemNodes.map(function (item) { return ({
        title: getItemTitle(item),
        links: getItemLinks(item),
        description: getItemDescription(item),
        id: getItemId(item),
        imageUrl: getItemImage(item),
        content: getItemContent(item),
        authors: getItemAuthors(item),
        categories: getItemCategories(item),
        published: getItemPublished(item),
        enclosures: getItemEnclosures(item),
        itunes: itunesParser.parseItem(item),
    }); });
};
//Check language
var parse = function (document) { return (__assign(__assign({ type: 'atom-v1' }, mapChannelFields(document)), { items: mapItems(document) })); };
exports.default = parse;
