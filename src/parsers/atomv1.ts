import { FeedItem, FeedFields, Feed, Author, Category, FeedImage, Link, Enclosure } from '../types'
import * as utils from '../utility'
import * as itunesParser from './itunesParser'

const getChannelTitle = (node: Element) => utils.getElementTextContent(node, 'title');

const getChannelLinks = (node: Element) => {
  const links = utils.getChildElements(node, 'link');

  return links.map((link) => ({
    url: link.getAttribute('href'),
    rel: link.getAttribute('rel'),
  }));
};

const getChannelDescription = (node: Element): string =>
  utils.getElementTextContent(node, 'subtitle');

const getChannelCopyright = (node: Element): string =>
  utils.getElementTextContent(node, 'rights');

const getChannelAuthors = (node: Element): Author[] => {
  const authors = utils.getChildElements(node, 'author');

  return authors.map((author) => ({
    name: utils.getElementTextContent(author, 'name'),
  }));
};

const getChannelLastUpdated = (node: Element): string =>
  utils.getElementTextContent(node, 'updated');

const getChannelLastPublished = (node: Element): string =>
  utils.getElementTextContent(node, 'published');

const getChannelCategories = (node: Element): Category[] => {
  const categories = utils.getChildElements(node, 'category');

  return categories.map((category) => ({
    name: category.getAttribute('term'),
  }));
};

const getChannelImage = (node: Element): FeedImage => {
  let img = utils.getElementTextContent(node, 'image');

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

const getItemTitle = (node: Element): string => utils.getElementTextContent(node, 'title');

const getItemLinks = (node: Element): Link[] => {
  const links = utils.getChildElements(node, 'link');
  const linksWithoutEnclosures = links.filter(
    (link) => link.getAttribute('rel') !== 'enclosure'
  );

  return linksWithoutEnclosures.map((link) => ({
    url: link.getAttribute('href'),
    rel: link.getAttribute('rel'),
  }));
};

const getItemDescription = (node: Element): string =>
  utils.getElementTextContent(node, 'summary');

const getItemContent = (node: Element): string => utils.getElementTextContent(node, 'content');

const getItemImage = (node: Element): string => utils.getElementTextContent(node, 'icon');

const getItemAuthors = (node: Element): Author[] => {
  const authors = utils.getChildElements(node, 'author');

  return authors.map((author) => ({
    name: utils.getElementTextContent(author, 'name'),
  }));
};

const getItemCategories = (node: Element): Category[] => {
  const categories = utils.getChildElements(node, 'category');

  return categories.map((category) => ({
    name: category.getAttribute('term'),
  }));
};

const getItemPublished = (node: Element): string => {
  let pub = utils.getElementTextContent(node, 'updated');

  if (pub === '' || pub === undefined) {
    pub = utils.getElementTextContent(node, 'published');
  }

  return pub;
};

const getItemId = (node: Element): string => utils.getElementTextContent(node, 'id');

const getItemEnclosures = (node: Element): Enclosure[] => {
  const links = utils.getChildElements(node, 'link');
  const enclosureLinks = links.filter(
    (link) => link.getAttribute('rel') === 'enclosure'
  );

  return enclosureLinks.map((link) => ({
    url: link.getAttribute('href'),
    length: link.getAttribute('length'),
    mimeType: link.getAttribute('type'),
  }));
};

const mapChannelFields = (document: Document): FeedFields => {
  const channelNodes = utils.getElements(document, 'feed');

  if (!channelNodes || channelNodes.length === 0) {
    throw new Error('Could not find channel node');
  }

  const channelNode = channelNodes[0];

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

const mapItems = (document: Document): FeedItem[] => {
  const itemNodes = utils.getElements(document, 'entry');

  return itemNodes.map((item) => ({
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
  }));
};

//Check language
const parse = (document: Document): Feed => ({
  type: 'atom-v1',
  ...mapChannelFields(document),
  items: mapItems(document),

})

export default parse