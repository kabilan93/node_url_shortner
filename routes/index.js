const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const validURL = require('valid-url');
const randomString = require("randomstring");

const URL = require('../model/shorturl')

const baseurl = 'http://localhost:3001/api'

// middleware to check if url parameter is present 
let reqValidation = (req, res, next) => {
  if (req.body.url) {
      next()
  } else {
      res.status(400).json({message: 'Url not found'})
  }
}

router.get('/:code', urlencodedParser, function(req, res, next) {
  try {
    // find a document match to the code in req.params.code
    console.log(req.params.code)
    let result_url = URL.findOne({
      slug: req.params.code
    });
    
    result_url.then((doc) => {
      if (doc != null) {
        res.redirect(doc.originalURL);
      }else{
        res.status(404).json('No URL Found');
      }
    });
  }
  // exception handler
  catch (err) {
      console.error(err)
      res.status(500).json('Server Error')
  }
});

router.post('/short', urlencodedParser, reqValidation, (req, res) => {

  const randomStr = randomString.generate(7);
  let reqURL = req.body.url;

  if (validURL.isUri(reqURL)) {

    try {
      // search url in db here
      let urlResult = URL.findOne({
        originalURL: reqURL
      });

      urlResult.then((doc) => {
        if (doc != null) {
          // return value if exist in db
          res.status(200).json({
            short_url: baseurl+ '/' +doc.slug
          })
        } else {
          // generate value and insert into db and return it
          let short_url_result = baseurl+ '/' +randomStr;

          urlResult = new URL({
            slug : randomStr,
            originalURL : reqURL
          })
  
          urlResult.save().then(()=> {
            console.log('saved')
            res.status(200).json({
              short_url: short_url_result
            })
          });
        }
      });

    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Opps something went wrong! Please try again later." })
    }

  } else {
    res.status(400).json({message: 'Invalid URl'})
  }

});


module.exports = router;
