import mysql from 'mysql2/promise';
import { settingConfig } from './config.js';


// ......................................
//// connect
// ......................................


export const connect = async () => {

  if (global.connection && global.connection.state !== 'disconnected') {
    console.log(' global => connection');
    return global.connection;
  }

  try {

    const config = settingConfig.config

    const pool = mysql.createPool(config)
    console.log('pool => CREATE');
    global.connection = pool

    return pool.getConnection()
  }
  catch (err) {
    const { errno, code, syscall, address, port, fatal } = err
    console.log();
    console.log(`Connect Error Database...`, err)
    console.log();
    return ({ error: { ...err } })

  }
  finally {
    console.log(' [connect]  Connection %d released',);
    //   pool.on('release', (connection) => {
    //     console.log(' [connect]  Connection %d released', connection.threadId);
    //   })
    //   process.on('SIGINT', () =>
    //     pool.end(err => {
    //       if (err) return console.log(err);
    //       console.log('pool => fechado');
    //       process.exit(0);
    //     })
    //   );

  }
}





// const config = settingConfig.config

// export const pool = mysql.createPool(config);

// console.log('pool => criado');

// pool.on('release', () => console.log('pool => conexão retornada'));

// process.on('SIGINT', () =>
//   pool.end(err => {
//     if (err) return console.log(err);
//     console.log('pool => fechado');
//     process.exit(0);
//   })
// );
