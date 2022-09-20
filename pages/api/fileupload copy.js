// https://towardsdev.com/upload-files-with-nextjs-fetch-api-routes-typescript-8150f9fa2332

import fs from "fs";

import path from "path";
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import formidable, { File } from 'formidable';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
/* Create directory for uploads */
const targetPath = path.join(process.cwd(), `/uploads/`);



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

/* Don't miss that! */
export const config = {
  api: {
    bodyParser: false,
  }
};


const handler = async (req, res) => {

  console.log('filename', __filename);
  console.log('dirname', __dirname);
  console.log('targetPath', targetPath);

  let status = 200,
    resultBody = {
      status: 'ok',
      message: 'Files were uploaded successfully'
    };

  const form = new formidable.IncomingForm();
  form.multiples = true
  form.maxFileSize = 50 * 1024 * 1024
  form.uploadDir = targetPath
  const _files = [];
  form.on('file', function (field, file) {
    _files.push([field, file]);

  })
  form.parse(req, (err, fields, files) => {

    if (err) {
      console.log('Error', err);
      return res.status(400).json({ status: 'Fail', message: 'Error parssing the files', error: err })
    }

    try {
      console.log('_FILEs:', files);
      const _f = files.files
      fs.renameSync(_f.filepath, targetPath + _f.originalFilename)
      return res.status(status).json(resultBody);
    } catch (error) {
      console.log('FILE ERROR:', error);
    }


  });



}

export default allowCors(handler);