import { arrayOfProperties } from "../utils/helpers.js"


// ......................................
//// set
// ......................................


const set = x => Object.keys(x).join(', ')


// ......................................
//// intoValues
// ......................................


const intoValues = x => arrayOfProperties(x).map(() => '?').join()



// ......................................
//// value
// ......................................


const value = x => Object.values(x)



// ......................................
//// insertToString
// ......................................


export const insertToString = x => {

  const _setColumns = () => set(x)
  const _setIntoValues = () => intoValues(x)
  const _value = () => value(x)


  return {
    _setColumns,
    _setIntoValues,
    _value
  }
}