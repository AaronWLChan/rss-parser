"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseItem = exports.parseChannel = void 0;
var utils = require("../utility");
var namespaces = require("./namespaces");
var getAuthors = function (node) {
    var authors = utils.getElementTextContentArray(node, 'author', namespaces.itunes);
    return authors.map(function (author) { return ({
        name: author,
    }); });
};
var getBlock = function (node) {
    return utils.getElementTextContent(node, 'block', namespaces.itunes);
};
var getSubCategories = function (node) {
    var categories = utils.getChildElements(node, 'category', namespaces.itunes);
    if (categories.length === 0) {
        return [];
    }
    return categories.map(function (category) { return ({
        name: category.getAttribute('text'),
    }); });
};
var getCategories = function (node) {
    var categories = utils.getChildElements(node, 'category', namespaces.itunes);
    return categories.map(function (category) { return ({
        name: category.getAttribute('text'),
        subCategories: getSubCategories(category),
    }); });
};
var getComplete = function (node) {
    return utils.getElementTextContent(node, 'complete', namespaces.itunes);
};
var getDuration = function (node) {
    return utils.getElementTextContent(node, 'duration', namespaces.itunes);
};
var getExplicit = function (node) {
    return utils.getElementTextContent(node, 'explicit', namespaces.itunes);
};
var getImage = function (node) {
    var images = utils.getChildElements(node, 'image', namespaces.itunes);
    return images.length > 0 ? images[0].getAttribute('href') : undefined;
};
var getIsClosedCaptioned = function (node) {
    return utils.getElementTextContent(node, 'isClosedCaptioned', namespaces.itunes);
};
var getNewFeedUrl = function (node) {
    return utils.getElementTextContent(node, 'new-feed-url', namespaces.itunes);
};
var getOrder = function (node) {
    return utils.getElementTextContent(node, 'order', namespaces.itunes);
};
var getOwner = function (node) {
    var owners = utils.getChildElements(node, 'owner', namespaces.itunes);
    if (owners.length === 0) {
        return {
            name: undefined,
            email: undefined,
        };
    }
    return {
        name: utils.getElementTextContent(owners[0], 'name', namespaces.itunes),
        email: utils.getElementTextContent(owners[0], 'email', namespaces.itunes),
    };
};
var getSubtitle = function (node) {
    return utils.getElementTextContent(node, 'subtitle', namespaces.itunes);
};
var getSummary = function (node) {
    return utils.getElementTextContent(node, 'summary', namespaces.itunes);
};
exports.parseChannel = exports.parseChannel = function (node) { return ({
    authors: getAuthors(node),
    block: getBlock(node),
    categories: getCategories(node),
    complete: getComplete(node),
    explicit: getExplicit(node),
    image: getImage(node),
    newFeedUrl: getNewFeedUrl(node),
    owner: getOwner(node),
    subtitle: getSubtitle(node),
    summary: getSummary(node),
}); };
var parseItem = function (node) { return ({
    authors: getAuthors(node),
    block: getBlock(node),
    duration: getDuration(node),
    explicit: getExplicit(node),
    image: getImage(node),
    isClosedCaptioned: getIsClosedCaptioned(node),
    order: getOrder(node),
    subtitle: getSubtitle(node),
    summary: getSummary(node),
}); };
exports.parseItem = parseItem;
