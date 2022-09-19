// https://towardsdev.com/upload-files-with-nextjs-fetch-api-routes-typescript-8150f9fa2332
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';


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

  let status = 200,
    resultBody = {
      status: 'ok',
      message: 'Files were uploaded successfully'
    };

  /* Get files using formidable */
  const files = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    const files = [];
    form.on('file', function (field, file) {
      files.push([field, file]);
    })
    form.on('end', () => resolve(files));
    form.on('error', err => reject(err));
    form.parse(req, () => {
      //
    });
  }).catch(e => {
    console.log(e);
    status = 500;
    resultBody = {
      status: 'fail', message: 'Upload error'
    }
  });

  if (files?.length) {

    /* Create directory for uploads */
    const targetPath = path.join(process.cwd(), `/uploads/`);
    try {
      await fs.access(targetPath);
    } catch (e) {
      await fs.mkdir(targetPath);
    }

    /* Move uploaded files to directory */
    for (const file of files) {
      const tempPath = file[1].filepath;
      const fileName = file[1].originalFilename
      const newFilename = file[1].newFilename
      const url = "http://" + req.headers.host;
      // console.log('xxx', {
      //   fileName,
      //   file,
      //   newFilename,
      //   url
      // });
      await fs.rename(tempPath, targetPath + fileName);
    }

    //// mysql insert
    // let result = await executeQuery("insert into upload(pic) values(?)", [
    //   filename,
    // ]);
    // result = await executeQuery(
    //   `select * from upload where pic_id=${result.insertId}`
    // );
    // res.status(200).send({
    //   result: result,
    //   url: url + "/public/" + req.file.filename,
    // });

  }

  res.status(status).json(resultBody);
}

export default allowCors(handler);