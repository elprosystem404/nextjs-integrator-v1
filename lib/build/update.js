
import { whereToString } from "./where.js"



// ......................................
//// setUpdate
// ......................................


const setUpdate = x => x ? Object.keys(x).map(key => ` ${key} = ? `).join() : ''


// ......................................
//// updateValues
// ......................................


const updateValues = (value, update) => [...Object.values(update), ...value]




// ......................................
//// updateToString
// ......................................


export const updateToString = (where, update) => {

  const whereUp = whereToString(where)
  eLog('updateToString', whereUp)
  const _set = () => setUpdate(update)

  const _where = () => whereUp._where()

  const _value = () => updateValues(whereUp._value(), update)

  return {
    _set,
    _where,
    _value
  }

}

