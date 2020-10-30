export function getNumberOfPages(prPage, dataset){
    return Math.ceil(dataset /prPage)
}

export function getPaginatedList(page, prPage, dataset) {
    return dataset.slice(getFirstElement(page, prPage), getLastElment(page, prPage, dataset.length))
  }

function getFirstElement(page, prPage){
    const elements = page * prPage
    return elements < 0 ? 0 : elements - prPage
}

function getLastElment(page, prPage, listSize){
    const elements = page * prPage
    return elements > listSize ? listSize : elements
}
