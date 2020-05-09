const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array)
  }
}

/**
 * @param {Array} elements - List of DOM elements
 * @returns {Array} List of trimmed text value of each element
 */
module.exports = async function getTexts(elements) {
  const texts = []
  await asyncForEach(elements, async (el) => {
    const text = await (await el.getProperty('textContent')).jsonValue()
    texts.push(text.trim())
  })
  return texts
}
