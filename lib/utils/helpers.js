
// ......................................
//// helpers
// ......................................

export const compose = (...fns) => arg =>
  fns.reduceRight((acc, fn) => (fn ? fn(acc) : acc), arg)

export const hasOpts = x => Object.keys(x).length > 0
export const hasOrdering = x => (x).length > 0
export const hasLimit = x => (x).length > 0
export const hasPagination = x => {
  const limit = x.hasOwnProperty('limit') ? `LIMIT ${x.limit}` : ``
  const offset = hasLimit(limit) && x.hasOwnProperty('offset') ? `OFFSET ${x.offset}` : ``
  return `${limit} ${offset}`
}

export const isString = x => typeof x === 'string'
export const isObject = x => typeof x !== null && typeof x === 'object' && !Array.isArray(x)
export const objectNoEmpty = x => Object.keys(x).length >= 1

export const ensureArray = x => Array.isArray(x) ? x : []

export const arrayOfProperties = o => Object.keys(o).map(m => ({ [m]: o[m] }))
export const replace = (x, a, b) => x.split(a).join(b)
/* string, this , to this */
export const replaceAll = (x, a, b) => !(x.indexOf(a) > -1) ? x : replaceAll(replace(x, a, b), a, b)
export const removeSpaces = str => str.replace(/\s+/g, ' ').trim()

