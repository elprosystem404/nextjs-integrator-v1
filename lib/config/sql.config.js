//import dotenv from 'dotenv';

//dotenv.config()

const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env

export const config = {
  connectionLimit: 100, //important
  host: DB_HOST,// "descontoshoje.com.br",// "184.107.94.164",// DB_HOST,
  user: DB_USERNAME,// "desconto_elprosystem",// DB_USERNAME,
  password: DB_PASSWORD, //"iX{wW)sNbPe@",//  DB_PASSWORD,
  database: DB_DATABASE, // "desconto_create_burger_db",// DB_DATABASE,
  decimalNumbers: true,
  dateStrings: true,
  multipleStatements: true,
  debug: false// ['RowDataPacket','ComQueryPacket']
}
