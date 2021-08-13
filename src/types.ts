export type Maybe<T> = T | undefined | null;

export interface FeedFields {
    title: string,
    links: Array<Link>,
    description: string,
    copyright: string,
    language: Maybe<string>;
    authors: Array<Author>,
    lastUpdated: string,
    lastPublished: string,
    categories: Array<Category>,
    image: FeedImage,
    itunes: Maybe<FeedItunes>,
}

export interface FeedItem {
    id: string;
    title: string;
    links: Array<Link>;
    description: string;
    content: string;
    authors: Array<Author>;
    categories: Array<Category>;
    published: string;
    imageUrl: Maybe<string>,
    enclosures: Array<Enclosure>;
    itunes: Maybe<FeedItemItunes>;
}

export interface Feed {
    type: string;
    title: string;
    links: Array<Link>;
    description: string;
    language: Maybe<string>;
    copyright: Maybe<string>;
    authors: Array<Author>;
    lastUpdated: string;
    lastPublished: string;
    categories: Array<Category>;
    image: FeedImage;
    itunes: Maybe<FeedItunes>;
    items: FeedItem[];
}

export interface FeedImage {
    title: Maybe<string>;
    description: Maybe<string>;
    url: Maybe<string>;
    height: Maybe<string>;
    width: Maybe<string>;
}

export interface ItunesCategory {
    name: Maybe<string>;
    subCategories: Array<Category>;
}

export interface Category {
    name: Maybe<string>;
}

export interface Link {
    url: string | null;
    rel: string | null;
}

export interface Author {
    name: Maybe<string>;
}

export interface Enclosure {
    url: Maybe<string>;
    length: Maybe<string>;
    mimeType: Maybe<string>;
}

export interface FeedItunes {
    authors: Array<Author>;
    block: Maybe<string>;
    categories: Array<ItunesCategory>;
    complete: Maybe<string>;
    explicit: string;
    image: Maybe<string>;
    newFeedUrl: Maybe<string>;
    owner: Owner;
    subtitle: Maybe<string>;
    summary: string;
}

export interface Owner {
    name: Maybe<string>;
    email: Maybe<string>;
}

export interface FeedItemItunes {
    authors: Maybe<Array<Author>>;
    block: Maybe<string>;
    duration: string;
    explicit: string;
    image: Maybe<string>;
    isClosedCaptioned: Maybe<string>;
    order: Maybe<string>;
    subtitle: string;
    summary: Maybe<string>;
}
