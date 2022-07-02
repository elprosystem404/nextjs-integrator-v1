// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
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


const handler = (req, res) => {
  res.status(200).json({ name: 'elprosystem', type: 'api-v1' })
}

export default allowCors(handler)


// export default function handler(req, res) {
//   res.status(200).json({ name: 'elprosystem', type: 'api-v1' })
// }
