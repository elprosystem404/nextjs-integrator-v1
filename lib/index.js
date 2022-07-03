//   HTTPS (Hyper Text Transfer Protocol Secure),  IPFS InterPlanetary File System   https://raptortiabg7uyez.onion.ws/
import { execute } from "./build/execute.query.js"
import { db } from "./connect/index.db.js"

import { config } from "./config/sql.config.js"
import { sqlConfig } from "./connect/config.js"

// config data base to library (set the db settings as soon as possible)

sqlConfig(config)




// schena
export const winesPromotions = {
  table: 'wines_promotions',
  // columns: ['burger_name', 'burger_description', 'burger_price'],
}


export const newBurger = {
  burger_price: 12.99,
  burger_name: 'Picanha',
  burger_description: 'São sanduíches feitos com carnede picanha',
  burger_ounces: '300g',
  burger_image: 'https://descontoshoje.com.br/api/createBurger/upload/burger_artesanal.webp'
}

export const options = {
  //  order: 'uuid',
  sort: 'ASC',
  limit: 1,
  offset: 0,
  page: 1 // ?????
}


// ......................................
//// find
// ......................................


export const find = (schema, options) => {

  const f = execute.find

  const formatter = f.formatter(schema, options)

  const dataQuery = f.dataQuery(formatter)

  return db({
    text: f.strQuery(dataQuery),
    values: dataQuery.value
  })

}



// ......................................
//// findwhere
// ......................................

export const findwhere = (schema, where, options) => {


  const fw = execute.findwhere

  const formatter = fw.formatter(schema, where, options)
  const dataQuery = fw.dataQuery(formatter)

  return db({
    text: fw.strQuery(dataQuery),
    values: dataQuery.value
  })

}



// ......................................
//// insert
// ......................................



export const insert = (schema, object) => {

  const i = execute.insert

  const formatter = i.formatter(schema, object)

  const dataQuery = i.dataQuery(formatter)

  return db({
    text: i.strQuery(dataQuery),
    values: dataQuery.value
  })

}

// ......................................
//// update
// ......................................



export const update = (schema, where, update) => {

  const up = execute.update

  const formatter = up.formatter(schema, where, update)


  const dataQuery = up.dataQuery(formatter)

  return db({
    text: up.strQuery(dataQuery),
    values: dataQuery.value
  })

}


// ......................................
//// remove
// ......................................



export const remove = (schema, where) => {

  const del = execute.delete

  const formatter = del.formatter(schema, where)

  const dataQuery = del.dataQuery(formatter)

  return db({
    text: del.strQuery(dataQuery),
    values: dataQuery.value
  })

}


// ......................................
//// innerJoin
// ......................................



export const innerJoin = (schema, join) => {

  const j = execute.innerJoin

  const formatter = j.formatter(schema, join)

  const dataQuery = j.dataQuery(formatter)

  return db({
    text:
      j.strQuery(dataQuery),
    values: dataQuery.value
  })

}

// ......................................
//// fullText
// ......................................



export const fullText = (schema, where, mode) => {

  const full = execute.fulltext

  const formatter = full.formatter(schema, where, mode)

  const dataQuery = full.dataQuery(formatter)

  return db({
    text:
      full.strQuery(dataQuery),
    values: dataQuery.value
  })

}



// ......................................
//// customQuery
// ......................................



export const customQuery = (query, values) => {

  return db({
    text: query,
    values: values ? values : []
  })

}



////////////  api burger   ////////////



// // burger_id	burger_price	burger_name 	burger_description	burger_ounces	burger_image


// // schena
// const burger = {
//   table: 'burger',
//   // columns: ['burger_name', 'burger_description', 'burger_price'],
// }


// const newBurger = {
//   burger_price: 12.99,
//   burger_name: 'Picanha',
//   burger_description: 'São sanduíches feitos com carnede picanha',
//   burger_ounces: '300g',
//   burger_image: 'https://descontoshoje.com.br/api/createBurger/upload/burger_artesanal.webp'
// }

// const options = {
//   //  order: 'burger_id',
//   sort: 'ASC',
//   limit: 2,
//   offset: 0,
//   page: 2 // ?????
// }



// export const listBurger = async (req, res, next) => {

//   const result = await find(
//     burger,
//     options
//   )

//   //  eLog('listBurger', result);
//   // Response
//   res.send(result)
// }
// // start
// // listBurger()





// export const listOneBurger = async (req, res, next) => {

//   const { params } = req

//   const id = +params.id

//   const result = await findwhere(
//     burger,
//     { burger_id: id }
//     , options
//   )

//   // eLog('listOneBurger', result);

//   res.send(result)
// }






// export const listWhereBurger = async (req, res, next) => {
//   // eLog('listMultBurger', req);
//   const where = req.body

//   //{id:[1,2]}

//   const result = await findwhere(
//     burger,
//     where
//     //    whereIn: {
//     //      burger_id: [1,2]
//     // }
//     // {
//     //   where: {
//     //     EQ: {
//     //       burger_id: id//, burger_price: 2.41
//     //     },
//     //     // GT: {
//     //     //   burger_price: 2.41
//     //     // },
//     //     // LIKE: {
//     //     //   burger_name: '%Cow'
//     //     // }
//     //   },
//     //   //    orwhere: { LTE: { burger_ounces: '250g' } }
//     // }
//     //  { burger_id: 4 }
//     , options
//   )


//   res.send(result)
// }
// // start
// //listOneBurger()



// const createBurger = async () => {
//   //const { data: { rows, sql, affectedRows, insertId, count, values }, error, message } =
//   const result = await insert(
//     burger,
//     newBurger
//   )

//   eLog('createBurger', result);

// }
// // start
// // createBurger()




// const updateBurger = async () => {

//   const result = await update(
//     burger,
//     { whereIn: { burger_id: [1, 2] } },
//     // {
//     //   where: {
//     //     EQ: {
//     //       burger_id: 1,
//     //     }
//     //   }
//     // },
//     //{ burger_id: 4}
//     { burger_price: 10.00 }
//   )

//   eLog('updateBurger', result);

// }
// // start
// // updateBurger()


// const removeBurger = async () => {

//   const result = await remove(
//     'burger',
//     { whereIn: { burger_id: [12, 11, 10, 9, 8] } },
//     // {
//     //   where: {
//     //     EQ: {
//     //       burger_id: 16,

//     //     }
//     //   }
//     // },
//     //  { burger_id: 44 }

//   )

//   eLog('removeBurger', result);

// }
// // start
// // removeBurger()


// const listBurgerAndCategory = async () => {

//   const result = await innerJoin(
//     {
//       table: 'burger',
//       //  columns: ['burger_id', 'burger_name', 'burger_description', 'burger_price', 'ingredients_name', 'ingredients_image']
//     },
//     [
//       { table: 'ingredients', on: [{ burger_id: 'ingredients_id' }] },
//       { table: 'ingredients22', on: [{ burger_id22: 'ingredients_id22' }] }

//     ]
//   )

//   console.log('listBurgerAndCategory====>>>> ', result);

// }
// // start
// listBurgerAndCategory()

// //  http://localhost:3200/api/burguer-search?burger_description=xd
// export const searchBurger = async (req, res, next) => {

//   const { query, params } = req
//   // eLog('searchBurger [query] ', query);


//   const result = await fullText(
//     burger,
//     query,
//     'boolean'
//   )
//   // eLog('searchBurger', result);
//   res.send(result)
// }
// // start

// //searchBurger()



// const customBurger = async () => {

//   const query = "SET GLOBAL max_user_connections = 0;"
//   //  const query = "UPDATE  mysql.burger SET max_user_connections=0 WHERE user='desconto_elprosystem' AND host='descontoshoje.com.br';FLUSH PRIVILEGES;"

//   const result = await customQuery(query, [])

//   eLog('listOneBurger', result);

// }
// // start
// //customBurger()






// const User = () => {

//   const doLogin = (user, pw) => ({ username: user, password: pw })

//   const publicAPI = { login: doLogin }

//   return publicAPI
// }


// const module = (a, b) => {

//   // cria uma instãncia do módulo`User`
//   const fred = User();

//   console.log('...', fred.login(a, b));

// }

//module("fred", "12Battery34!")

// function student(name, email) {
//   this.name = name
//   this.email = email
// }
// student.prototype.login = function () {
//   return `${this.name} login`
// }

// const a = new student('elpro1', 'elpro1@email.com')
// const b = new student('elpro2', 'elpro2@email.com')
// console.log('...', a.login());


// const animal = {
//   som: 'um som de animal',
//   emitirSom: () => { console.log(animal.som) }
// }

// const gato = {
//   tipo: 'gato',
//   //  emitirSom: () => { console.log('animal.som') }
// }

// Object.setPrototypeOf(gato, animal)
// gato.emitirSom()
// console.log(Object.getPrototypeOf(animal))
// console.log(animal.isPrototypeOf(gato))



// const Player = (name, level) => {
//   let health = level * 2;
//   const getLevel = () => level;
//   const getName = () => name;
//   const die = () => {
//     return ` is die `
//   };
//   const damage = x => {
//     health -= x;
//     console.log('damage', { health, x })
//     if (health <= 0) {
//       return die();
//     }
//   };
//   const attack = enemy => {

//     if (level < enemy.getLevel()) {
//       damage(1);
//       return `${enemy.getName()} has damaged ${name}`
//     }
//     if (level >= enemy.getLevel()) {
//       enemy.damage(1);
//       return `${name} has damaged ${enemy.getName()}`
//     }
//   };
//   return { attack, damage, getLevel, getName }
// };

// const jimmie = Player('jim', 0);
// const badGuy = Player('jeff', 5);


// console.log('**********', jimmie.damage(0))






// // Inheritance
// const Person = (name) => {
//   const sayName = () => console.log(`my name is ${name}`)
//   return { sayName }
// }

// const Nerd = (name) => {
//   // simply create a person and pull out the sayName function with destructuring assignment syntax!
//   const { sayName } = Person(name)
//   const doSomethingNerdy = () => console.log('nerd stuff')
//   return { sayName, doSomethingNerdy }
// }

// const jeff = Nerd('jeff')

// jeff.sayName() //my name is jeff
// jeff.doSomethingNerdy() // nerd stuff