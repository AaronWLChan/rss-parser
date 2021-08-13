import * as utils from '../utility'
import * as namespaces from './namespaces'
import * as itunesParser from './itunesParser'
import { Author, Category, Enclosure, Feed, FeedFields, FeedImage, FeedItem, Link } from '../types'

const getChannelTitle = (node: Element): string => utils.getElementTextContent(node, 'title');

const getChannelLinks = (node: Element): Link[] => {
  const links = utils.getChildElements(node, 'link');

  return links.map((link) => ({
    url: link.textContent,
    rel: link.getAttribute('rel'),
  }));
};

const getChannelDescription = (node: Element): string =>
  utils.getElementTextContent(node, 'description');

const getChannelLanguage = (node: Element): string =>
  utils.getElementTextContent(node, 'language') || utils.getElementTextContent(node, 'dc:language') ;

const getChannelCopyright = (node: Element): string =>
  utils.getElementTextContent(node, 'copyright') || utils.getElementTextContent(node, 'dc:rights');

const getChannelAuthors = (node: Element): Author[] => {
  const authors = utils.getElementTextContentArray(node, 'managingEditor');

  return authors.map((author) => ({
    name: author,
  }));
};

const getChannelLastUpdated = (node: Element): string =>
  utils.getElementTextContent(node, 'lastBuildDate');

const getChannelLastPublished = (node: Element): string =>
  utils.getElementTextContent(node, 'pubDate');

const getChannelCategories = (node: Element): Category[] => {
  const categories = utils.getElementTextContentArray(node, 'category');

  return categories.map((category) => ({
    name: category,
  }));
};


const getImage = (node: Element): FeedImage => {
  const imageNodes = utils.getChildElements(node, 'image');

  if (imageNodes.length === 0) {
    return {
      url: undefined,
      title: undefined,
      description: undefined,
      width: undefined,
      height: undefined,
    };
  }

  const imageNode = imageNodes[0];

  return {
    url: utils.getElementTextContent(imageNode, 'url'),
    title: utils.getElementTextContent(imageNode, 'title'),
    description: utils.getElementTextContent(imageNode, 'description'),
    width: utils.getElementTextContent(imageNode, 'width'),
    height: utils.getElementTextContent(imageNode, 'height'),
  };
};

const getItemImage = (node: Element): string => utils.getElementTextContent(node, 'image')

const getItemTitle = (node: Element): string => utils.getElementTextContent(node, 'title');

const getItemLinks = (node: Element): Link[] => {
  const links = utils.getChildElements(node, 'link');

  return links.map((link) => ({
    url: link.textContent,
    rel: link.getAttribute('rel'),
  }));
};


const getItemDescription = (node: Element): string =>
  utils.getElementTextContent(node, 'description');

const getItemContent = (node: Element): string =>
  utils.getElementTextContent(node, 'encoded', namespaces.content);

const getItemAuthors = (node: Element): Author[] => {
  let authors = utils.getElementTextContentArray(node, 'author');

  if (authors.length === 0) {
    authors = utils.getElementTextContentArray(node, 'dc:creator');
  }

  return authors.map((author) => ({
    name: author,
  }));
};

const getItemCategories = (node: Element): Category[] => {
  let categories = utils.getElementTextContentArray(node, 'category');

  if (categories.length === 0) {
    categories = utils.getElementTextContentArray(node, 'dc:subject');
  }

  return categories.map((category) => ({
    name: category,
  }));
};

const getItemId = (node: Element): string => utils.getElementTextContent(node, 'guid');

const getItemPublished = (node: Element): string =>
  utils.getElementTextContent(node, 'pubDate') ||
  utils.getElementTextContent(node, 'dc:date');

const getItemEnclosures = (node: Element): Enclosure[] => {
  const enclosures = utils.getChildElements(node, 'enclosure');

  return enclosures.map((enclosure) => ({
    url: enclosure.getAttribute('url'),
    length: enclosure.getAttribute('length'),
    mimeType: enclosure.getAttribute('type'),
  }));
};


const mapChannelFields = (document: Document): FeedFields => {
  
  const channelNodes = utils.getElements(document, 'channel');

  if (!channelNodes || channelNodes.length === 0) {
    throw new Error('Could not find channel node');
  }

  const channelNode = channelNodes[0];

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

const mapItems = (document: Document): FeedItem[] => {
  const itemNodes = utils.getElements(document, 'item');

  return itemNodes.map((item) => ({
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
  }));
};

const parse = (document: Document): Feed => {

  const rssElement = document.getElementsByTagName("rss")[0]

  const version = rssElement.getAttribute("version") || "?"

  return {
    type: `rss-${version}`,
    ...mapChannelFields(document),
    items: mapItems(document),
  }

};

export default parse