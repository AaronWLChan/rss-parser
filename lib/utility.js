"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementTextContent = exports.getElementTextContentArray = exports.getChildElements = exports.getElements = void 0;
exports.getElements = exports.getElements = function (document, tagName) {
    if (!document || !document.getElementsByTagName(tagName)) {
        return [];
    }
    var elements = document.getElementsByTagName(tagName);
    return Array.from(elements);
};
exports.getChildElements = exports.getChildElements = function (node, tagName, nameSpace) {
    if (!node) {
        return [];
    }
    var elements = nameSpace ? node.getElementsByTagNameNS(nameSpace, tagName) : node.getElementsByTagName(tagName);
    if (!elements) {
        return [];
    }
    return Array.from(elements).filter(function (element) { var _a; return ((_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName) === node.nodeName; });
};
exports.getElementTextContentArray = exports.getElementTextContentArray = function (node, tagName, nameSpace) {
    var nodes = exports.getChildElements(node, tagName, nameSpace);
    if (!nodes || nodes.length === 0) {
        return [];
    }
    return nodes.map(function (node) { return node.textContent; });
};
exports.getElementTextContent = exports.getElementTextContent = function (node, tagName, nameSpace) {
    var array = exports.getElementTextContentArray(node, tagName, nameSpace);
    return array.length === 0 ? undefined : array[0];
};
