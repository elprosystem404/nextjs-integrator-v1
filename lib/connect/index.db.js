import { connect } from "./connect.db.js"
import { response } from "./result.db.js";

// ......................................
//// resultSetHeader
// ......................................


const resultSetHeader = (sql, [x,]) => {

  return sql.includes('UPDATE') || sql.includes('INSERT') || sql.includes('DELETE')
    ? ({
      affectedRows: x.affectedRows,
      insertId: x.insertId
    })
    : {}
}



// ......................................
//// dbConnect
// ......................................


const excuteQuery = async (conn, text, values) => {


  // console.log(`                 node-sql-query-js 📀   1.0.0 - Copyright © ${new Date().getFullYear()} elprosystem.com.br `);

  // try {

  // Format Query Database
  const sql = conn.format(text, values);

  // 'Execute Query Database
  const data = await conn.query(sql);
  //  console.log(data);
  const [rows] = data

  const resultArray = rows.length >= 1 ? Object.values(JSON.parse(JSON.stringify(rows))) : []

  return response.success({
    sql,
    values,
    ...resultSetHeader(sql, data),// case  'INSERT', 'UPDATE'
    count: resultArray.length,
    rows: resultArray,
  })

  // } catch (error) {
  //   return response.error(
  //     text,
  //     values,
  //     error)
  // }

  // finally {
  //   console.log('pool => finally');
  //   // process.on('SIGINT', () =>
  //   //   conn.end(err => {
  //   //     if (err) return console.log(err);
  //   //     console.log('pool => fechado');
  //   //     process.exit(0);
  //   //   })
  //   // );
  //   // conn.on('release', (connection) => {
  //   //   console.log(' [excuteQuery]  Connection %d released', connection.threadId);
  //   // })
  //   //  conn.release();
  //   // conn.end();
  // }

}



// ......................................
//// db
// ......................................


export const db = async ({ text, values }) => {

  const conn = await connect()
  // console.log(conn);
  return (conn.error)
    ? response.errorConnect(conn.error)
    : await excuteQuery(conn, text, values)

}
