import nextConnect from 'next-connect'
import multiparty from 'multiparty'

const middleware = nextConnect()

middleware.use(async (req, res, next) => {
  const form = new multiparty.Form()
  console.log('middleware', form);
  await form.parse(req, function (err, fields, files) {
    req.body = fields
    req.files = files
    req.elpro = 'system'
    next()
  })
})

export default middleware