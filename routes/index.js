const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');

/* GET home page. */


router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req,res) =>{
  let form = new formidable.IncomingForm({
    uploadDir: "./upload",
    keepExtensions: true
  });

  form.parse(req, (error, fields, files) =>{
    res.json({
      files
    });
  });
  
});
router.delete('/file', (req, res) => {

  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {

    let path = './' + fields.path;
    
    if (fs.existsSync(path)) {

      fs.unlink(path, err => {

        if (err) {

          res.status(400).json({
            err
          });
          
        } else {

          res.json({
            fields
          });

        }

      });

    } else {

      res.status(404).json({
        error: 'File not found.'
      });
  
    }

  });

});

router.get('/file',(req,res) =>{
  let path = `./${req.query.path}`;
  if(fs.existsSync(path)){
    fs.readFile(path,(error,data) =>{
      if(error){
        console.error(error);
        res.status(400).json({
          error
        });
      }else{
        res.status(200).end(data);
      }
    });

  }else{
    res.status(404).json({
      error: 'File not found.'
    });
  }
});
module.exports = router;
