import { isObject, objectNoEmpty } from "../utils/helpers.js"



// ......................................
//// settingConfig
// ......................................

export const settingConfig = {
  config: {}
}


const defaultConfig = (config) => {

  return {
    host: '',
    user: '',
    password: '',
    database: '',
    decimalNumbers: true,
    dateStrings: true,
    multipleStatements: true,
    connectionLimit: 10,
    debug: false, // ['RowDataPacket','ComQueryPacket']
    ...config
  }
}


// ......................................
//// sqlConfig
// ......................................

export const sqlConfig = (config) => {
  console.log('Set config Data Base');
  return isObject(config) && objectNoEmpty(config)
    ? settingConfig.config = defaultConfig(config)
    : {}
}

