const plainObjToStr = async (obj, spaces) => {
    //convert plain JSON and remove quotation marks(")
    const objString = JSON.stringify(obj, null, spaces)
    .replaceAll('"', '')
    // ident last line
    return objString.substring(0, objString.length - 2) + `\n${' '.repeat(spaces-2)}}`
}

module.exports = { plainObjToStr }