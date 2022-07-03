
import { compose, arrayOfProperties, isObject, objectNoEmpty, replaceAll } from "../utils/helpers.js"

// ......................................
//// helpers
// ......................................



const operatorSignal = {
  EQ: '=',
  NE: '!=', // including
  LT: '<',
  LTE: '<=', // including
  GT: '>',
  GTE: '>=', // including
  LIKE: 'LIKE',
  NLIKE: 'NOT LIKE'
}

const operator = x => x.includes('orwhere') ? 'OR' : 'AND'
const identifySignal = x => keyString(x)

const keyString = x => Object.keys(x).toString()
const valueString = x => Object.values(x)

const hasPropWhereIn = x => Object.keys(x).some(s => ['whereIn'].includes(s))
const hasPropWhere = x => Object.keys(x).some(s => ['where', 'orwhere'].includes(s))
const isObjectWhere = x => isObject(x) && objectNoEmpty(x)

const replaceAllPlaceholder = (value, where) => value.reduce((a, c) => a.replace('?', c), where)

const isCompleteObject = x => isObjectWhere(x) && hasPropWhere(x) && hasOperatorSignal(x)

const existOR = x => x === 'AND' ? '' : 'OR'

const inToString = x => x.map(_ignore => '?').join(', ')



// ......................................
//// hasOperatorSignal
// ......................................

const hasOperatorSignal = x => {
  const hasOperator = Object.keys(x).reduce((acc, curr) => {
    const has = Object.keys(x[curr]).some(s => {
      const operator = s.toUpperCase()
      return Object.keys(operatorSignal).includes(operator)
    })
    return [...acc, has]
  }, [])

  return hasOperator.every(e => e === true)
}



// ......................................
//// aValue
// ......................................


const aValue = (valuesKey) => ({ value: valuesKey ? valuesKey.map(m => Object.values(m)).flat() : [] })



// ......................................
//// aWhereString
// ......................................



const aWhereString = (mapString, logicOperator) => ({ where: `${existOR(logicOperator)} ${replaceAll(mapString, ',', ` ${logicOperator} `)}` })


// ......................................
//// mapString
// ......................................


const mapString = (valuesKey, signal) => valuesKey.map((m, i) => ` ${keyString(m)} ${signal[i]} ? `).toString()


// ......................................
//// aWhere
// ......................................


const aWhere = ({ valuesKey, signal, logicOperator }) => {
  return ({
    ...aWhereString(mapString(valuesKey, signal), logicOperator), // <-  where
    ...aValue(valuesKey) // <-  value
  })
}


// ......................................
//// signal
// ......................................


const signal = (x) => x.reduce((acc, curr) => {
  const operator = identifySignal(curr).toUpperCase()
  return [...acc, operatorSignal[operator]]
}, [])



// ......................................
//// valuesKey
// ......................................


const valuesKey = x => x.map(m => valueString(m)).flat()




// ......................................
//// dataWhere
// ......................................


const dataWhere = (curr, x) => {

  const keyOperator = keyString(curr) //  'where'

  const keyOperatorArray = arrayOfProperties(x[keyOperator])

  return ({
    logicOperator: operator(keyOperator), // 'AND'
    signal: signal(keyOperatorArray), // ['=']
    valuesKey: valuesKey(keyOperatorArray) // [{ burger_id: 4 }]
  })
}



// ......................................
//// createWhereAndValue
// ......................................



const createWhereAndValue = x => arrayOfProperties(x).reduce((acc, curr) => {

  const { where, value } = aWhere(dataWhere(curr, x))

  return where
    ? [...acc, { where, value }]
    : acc
}, [])



// ......................................
//// whereObject (converts a where/value array into a where/value object with its values as array)
// ......................................


const whereValueObject = x => x.reduce((acc, curr) => ({
  where: [...acc.where, curr.where],
  value: [...acc.value, ...curr.value]
}),
  { where: [], value: [] }
)


// ......................................
//// toString
// ......................................


const toString = x => ({
  where: x.where.toString().replace(',', ' '),
  value: x.value
})



// ......................................
//// whereFlowToString
// ......................................


const whereFlowToString = compose(toString, whereValueObject, createWhereAndValue)



// ......................................
//// whereSingleObject
// ......................................


const whereSingleObject = (x) => hasPropWhere(x)
  ? { where: '', value: [] } // error: malformed or not informed
  : whereFlowToString({ where: { EQ: x } }) // single object without where's properties




// ......................................
//// whereAndValue
// ......................................


const whereAndValue = (x) => isCompleteObject(x) ? whereFlowToString(x) : whereSingleObject(x)



// ......................................
//// whereIn
// ......................................



const whereInAndValue = x => {

  const key = Object.keys(x.whereIn).join(', ')
  const valuesIn = x.whereIn[key]
  const value = Array.isArray(valuesIn) ? valuesIn : []

  return {
    where: `${key} IN (${inToString(value)})`,
    value: value
  }
}



// ......................................
//// exeuteWhere ()
// ......................................



const exeuteWhere = (x) => hasPropWhereIn(x) && objectNoEmpty(x) ? whereInAndValue(x) : whereAndValue(x)



// ......................................
//// whereToString ( Factory Function )
// ......................................


export const whereToString = (x, placeholder = true) => {

  const { where, value } = exeuteWhere(x)

  const _where = () => placeholder ? where : replaceAllPlaceholder(value, where)
  const _value = () => value

  return {
    _where,
    _value
  }

}
