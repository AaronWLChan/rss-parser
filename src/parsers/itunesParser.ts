import * as utils from '../utility'
import * as namespaces from './namespaces'
import { Author, Category, FeedItemItunes, FeedItunes, ItunesCategory, Maybe, Owner } from '../types'


const getAuthors = (node: Element): Author[] => {
  const authors = utils.getElementTextContentArray(
    node,
    'author',
    namespaces.itunes
  );

  return authors.map((author) => ({
    name: author,
  }));
};

const getBlock = (node: Element): string =>
  utils.getElementTextContent(node, 'block', namespaces.itunes);

const getSubCategories = (node: Element): Category[] => {
  const categories = utils.getChildElements(
    node,
    'category',
    namespaces.itunes
  );

  if (categories.length === 0) {
    return [];
  }

  return categories.map((category) => ({
    name: category.getAttribute('text'),
  }));
};

const getCategories = (node: Element): ItunesCategory[] => {
  const categories = utils.getChildElements(
    node,
    'category',
    namespaces.itunes
  );

  return categories.map((category) => ({
    name: category.getAttribute('text'),
    subCategories: getSubCategories(category),
  }));
};

const getComplete = (node: Element): string =>
  utils.getElementTextContent(node, 'complete', namespaces.itunes);

const getDuration = (node: Element): string  =>
  utils.getElementTextContent(node, 'duration', namespaces.itunes);

const getExplicit = (node: Element): string  =>
  utils.getElementTextContent(node, 'explicit', namespaces.itunes);

const getImage = (node: Element): Maybe<string>  => {
  const images = utils.getChildElements(node, 'image', namespaces.itunes);

  return images.length > 0 ? images[0].getAttribute('href') : undefined;
};

const getIsClosedCaptioned = (node: Element): string =>
  utils.getElementTextContent(node, 'isClosedCaptioned', namespaces.itunes);

const getNewFeedUrl = (node: Element): string =>
  utils.getElementTextContent(node, 'new-feed-url', namespaces.itunes);

const getOrder = (node: Element): string =>
  utils.getElementTextContent(node, 'order', namespaces.itunes);

const getOwner = (node: Element): Owner => {
  const owners = utils.getChildElements(node, 'owner', namespaces.itunes);

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

const getSubtitle = (node: Element): string =>
  utils.getElementTextContent(node, 'subtitle', namespaces.itunes);

const getSummary = (node: Element): string =>
  utils.getElementTextContent(node, 'summary', namespaces.itunes);

export const parseChannel = exports.parseChannel = (node: Element): FeedItunes => ({
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
});

export const parseItem = (node: Element): FeedItemItunes => ({
  authors: getAuthors(node),
  block: getBlock(node),
  duration: getDuration(node),
  explicit: getExplicit(node),
  image: getImage(node),
  isClosedCaptioned: getIsClosedCaptioned(node),
  order: getOrder(node),
  subtitle: getSubtitle(node),
  summary: getSummary(node),
});