import { ensureArray, replaceAll } from "../utils/helpers.js"
import { whereToString } from "./where.js"





// ......................................
//// onToString
// ......................................


const onToString = (x) => ensureArray(x).reduce((acc, curr) => {

  const on = whereToString(curr, false) //  don't use placehold

  return [...acc, on._where()]

}, [])





// ......................................
//// joinToString
// ......................................


const reduceOnString = (aTable) => (acc, { table, on }) => {

  // iterates through each element of the array of 'on'
  const onString = onToString(on)

  /*
  because of the 'whereToString' method returns a string array with an equal sign
  ex:  [ 'burger_id = ingredients_id' ]
  */
  const KeyValue = onString[0].split('=')
  const key = KeyValue[0].trim()
  const value = KeyValue[1].trim()

  // append the table name before the column -> array
  const _onString = [`${aTable}.${key} = ${table}.${value}`]

  return [...acc, `INNER JOIN ${table} ON ${_onString.join(' AND ')}`]
  // return [...acc, `INNER JOIN ${table} ON ${onString.join(' AND ')}`]

}


// ......................................
//// aJoin
// ......................................


const aJoin = (aTable, x) => {


  const joinArray = x.reduce((reduceOnString(aTable)), [])


  return joinArray.join(' ')
}


// ......................................
//// joinToString
// ......................................


/**
 * @function joinToString
 * @param Array  join  [ { table: String, on: [ Object ]
 * @returns String
 */

export const joinToString = (aTable, join) => {


  const _join = () => aJoin(aTable, join)
  return { _join }
}
