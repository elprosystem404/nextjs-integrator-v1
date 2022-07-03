// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://nextjs-integrator-v1.vercel.app/api/hello

import { usersRepo } from "../../helpers/users-repo.js";
import { find, winesPromotions } from "../../lib/index.js";


// another common pattern
// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}


const handler = async (req, res) => {

  switch (req.method) {
    case "GET":
      return await getProducts(req, res);
    case "POST":
      return await saveProduct(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}


const getProducts = async (req, res) => {

  const {
    error,
    status,
    data,
    message } = await usersRepo.getAll(req.query) //'users',

  res.status(status).json({
    status,
    error,
    message,
    data
  })

};

const saveProduct = async (req, res) => {

  // ...save a products
};




export default allowCors(handler)


// export default function handler(req, res) {
//   res.status(200).json({ name: 'elprosystem', type: 'api-v1' })
// }
