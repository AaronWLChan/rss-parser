import { DOMParser } from 'xmldom'
import rssParser from './parsers/rss'
import atomParser from './parsers/atomv1'
import { Feed } from './types'

const getParser = (document: Document) => {
    if (document.getElementsByTagName('channel')[0]){
        return rssParser
    }

    else if (document.getElementsByTagName('feed')[0]){
        return atomParser
    }

    return null

}

export const parse = (feed: string) =>
    new Promise<Feed>((resolve, reject) => {

        const document = new DOMParser({
            errorHandler: (_level, msg) => {
                reject(msg)
            }
        }).parseFromString(feed, 'text/xml')

        if (!document) {
            reject("Unable to parse document!")
        }

        const parser = getParser(document)

        if (parser) {
            resolve(parser(document!))
        }

        else {
            reject("Unable to RSS elements!")
        }

    })
