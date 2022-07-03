
// ......................................
//// options
// ......................................

import { hasOpts, hasOrdering, hasPagination } from "../utils/helpers.js"


const parseOpts = x => {

  const ordering = x.hasOwnProperty('order') && x.hasOwnProperty('sort')
    ? `ORDER BY ${x.order} ${x.sort}` : ``

  return hasOrdering(ordering)
    ? `${ordering} ${hasPagination(x)}`
    : `${ordering}`


}

export const opts = x => hasOpts(x) ? parseOpts(x) : ``
