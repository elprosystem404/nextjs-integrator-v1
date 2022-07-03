
//import { eLog } from "elog-console"
import { arrayOfProperties, ensureArray, removeSpaces } from "../utils/helpers.js"
import { deleteToString } from "./delete.js"
import { formatterWhere, formatterOptions, formatterRemove, formatterSchema, formatterJoin, formatterSet, formatterFulltext } from "./formatter.js"
import { insertToString } from "./insert.js"
import { joinToString } from "./join.js"
import { updateToString } from "./update.js"
import { whereToString } from "./where.js"

// ......................................
//// execute
// ......................................


export const execute = {

  // ......................................
  //// find
  // ......................................


  find: {

    formatter: (schema, options) =>
      ({ ...formatterSchema(schema), ...formatterOptions(options) }),

    dataQuery: (x) => {
      return ({
        method: 'find',
        command: 'SELECT',
        columns: x.columns,
        table: `FROM ${x.table}`,
        value: [],
        options: x.options
      })
    },

    strQuery: x => removeSpaces(`${x.command} ${x.columns} ${x.table} ${x.options}`)

  },


  // ......................................
  //// findwhere
  // ......................................


  findwhere: {

    formatter: (schema, where, options) =>
      ({ ...formatterSchema(schema), ...formatterWhere(where), ...formatterOptions(options) }),

    dataQuery: (x) => {

      const findwhere = whereToString(x.where)

      return ({
        ...execute.find.dataQuery(x), // composition of 'find' properties that are used in 'findwhere'
        method: 'findwhere',

        where: `WHERE ${findwhere._where()}`,

        value: findwhere._value(),

        options: x.options
      })
    },

    strQuery: x => removeSpaces(`${x.command} ${x.columns} ${x.table} ${x.where} ${x.options}`)

  },


  // ......................................
  //// insert
  // ......................................


  insert: {

    formatter: (schema, object) => ({ ...formatterSchema(schema), ...formatterSet(object) }),

    dataQuery: (x) => {

      const insert = insertToString(x.set)

      return ({
        method: 'insert',
        command: 'INSERT INTO',
        table: x.table,
        set: ` (${insert._setColumns()}) VALUES (${insert._setIntoValues()})`,
        value: insert._value()
      })
    },

    strQuery: x => removeSpaces(`${x.command} ${x.table} ${x.set}`)

  },


  // ......................................
  //// update
  // ......................................


  update: {

    formatter: (schema, where, update) => ({ ...formatterSchema(schema), where, update }),

    dataQuery: (x) => {

      const up = updateToString(x.where, x.update);

      return ({
        method: 'update',
        command: 'UPDATE',
        table: x.table,
        set: `SET ${up._set()}`,
        where: `WHERE ${up._where()}`,
        value: up._value()
      })
    },

    strQuery: x => removeSpaces(`${x.command} ${x.table} ${x.set} ${x.where}`)

  },


  // ......................................
  //// delete
  // ......................................


  delete: {

    formatter: (schema, where) => ({ ...formatterSchema(schema), ...formatterRemove(where) }),

    dataQuery: (x) => {

      const del = deleteToString(x.where)

      return ({
        method: 'delete',
        command: 'DELETE',
        table: `FROM ${x.table}`,
        where: `WHERE ${del._where()}`,
        value: del._value()
      })
    },

    strQuery: x => removeSpaces(`${x.command} ${x.table} ${x.where}`)

  },


  // ......................................
  //// innerJoin
  // ......................................


  innerJoin: {

    formatter: (schema, join) => ({ ...formatterSchema(schema), ...formatterJoin(join) }),

    dataQuery: (x) => {

      const innerJoin = joinToString(x.table, x.join)

      return ({
        method: 'innerJoin',
        command: 'SELECT',
        columns: x.columns,
        table: `FROM ${x.table}`,
        join: innerJoin._join(), // the 'JOIN' and 'ON' clauses included because there can be more than one.
        value: []
      })
    },

    strQuery: x => removeSpaces(`${x.command} ${x.columns} ${x.table} ${x.join}`)

  },

  fulltext: {


    formatter: (schema, where, mode) => ({ ...formatterSchema(schema), ...formatterFulltext(where, mode) }),

    dataQuery: (x) => {

      return ({
        method: 'fulltext',
        command: 'SELECT',
        columns: x.columns,
        table: `FROM ${x.table}`,
        where: `WHERE MATCH (${x.where}) AGAINST ('${x.term}*' ${x.mode})`, //
        value: []
      })
    },

    strQuery: x => removeSpaces(`${x.command} ${x.columns} ${x.table} ${x.where}`)

  }

}
