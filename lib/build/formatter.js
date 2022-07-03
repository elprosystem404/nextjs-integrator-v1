
import { isObject, isString } from "../utils/helpers.js"
import { opts } from "./options.js"


// ......................................
//// formatter
// ......................................


const fulltextMode = (y) => ({
  mode: 'IN BOOLEAN MODE',
  ...(y === 'expansion' && { mode: 'WITH QUERY EXPANSION' }),
  ...(y === 'natural' && { mode: 'IN NATURAL LANGUAGE MODE' })
})


const formattFulltext = (x, y) => ({
  where: Object.keys(x).toString(),
  term: Object.values(x).toString(),
  ...fulltextMode(y)
})


const formattColumns = x => ({
  ...x,
  columns: Array.isArray(x.columns) ? x.columns.join(', ') : x.columns
})


const formattSchema = (x) => ({
  table: undefined,
  columns: '*',
  ...(isString(x) && {
    table: x,
    columns: '*'
  }),
  ...(isObject(x) && x),
})

export const formatterSchema = x => formattColumns(formattSchema(x))
export const formatterWhere = x => x ? { where: x } : { where: {} }
export const formatterOptions = x => x ? { options: opts(x) } : { options: opts({}) }
export const formatterSet = x => x ? { set: x } : { set: {} }
export const formatterRemove = x => x ? { where: x } : { where: {} }
export const formatterJoin = x => x && Array.isArray(x) ? { join: x } : { join: [] }
export const formatterFulltext = (x, y) => x && isObject(x) ? formattFulltext(x, y) : { where: {}, term: {}, mode: '' }


