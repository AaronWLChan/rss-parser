export const getElements = exports.getElements = (document: Document, tagName: string) => {

    if (!document || !document.getElementsByTagName(tagName)){
        return []
    }

    const elements: HTMLCollectionOf<Element> = document.getElementsByTagName(tagName)

    return Array.from(elements)
}

export const getChildElements = exports.getChildElements = (node: Element, tagName: string, nameSpace?: string) => {
    
    if (!node){
        return []
    }

    const elements: HTMLCollectionOf<Element> = nameSpace ? node.getElementsByTagNameNS(nameSpace, tagName) : node.getElementsByTagName(tagName)

    if (!elements) {
        return []
    }

    return Array.from(elements).filter((element) => element.parentNode?.nodeName === node.nodeName)

}

export const getElementTextContentArray = exports.getElementTextContentArray = (node: Element, tagName: string, nameSpace?: string) => {

    const nodes = getChildElements(node, tagName, nameSpace)

    if (!nodes || nodes.length === 0) {
        return [];
      }
    
    return nodes.map((node) => node.textContent);

}


export const getElementTextContent = exports.getElementTextContent = (node: Element, tagName: string, nameSpace?: string) => {
    const array = exports.getElementTextContentArray(node, tagName, nameSpace);
  
    return array.length === 0 ? undefined : array[0];
  };

