const Item = require('../../models/Item');
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".jpg")
  }
})
 
var upload = multer({ storage: storage }).single('profileImage');


module.exports = (app) => {

  //get all items
  app.get('/api/counters', (req, res, next) => {
    Item.find()
      .exec()
      .then((item) => res.json(item))
      .catch((err) => next(err));
  });


  // get item for given id
  app.get('/api/counters/:id',(req, res, next)  => {
    Item.findById(req.params.id)
      .exec()
      .then((item) =>{  console.log("id to be updated",item); res.json(item)})
      .catch((err) => next(err));
  });

  // save item
  app.post('/api/counters', (req, res, next) => {
    console.log('req.body.formPayload#############',req.body.formPayload)
    Item.create(req.body.formPayload)
      .then((item) => {res.json(item)})
      .catch((err) => next(err));
  });


  // delete item  
  app.delete('/api/counters/:id', function (req, res, next) {
    Item.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((counter) => res.json({message:'deleted'}))
      .catch((err) => next(err));
  });

  // put item
  app.put('/api/counters/:id', (req, res, next) => {
    Item.findByIdAndUpdate(req.params.id, req.body.formPayload)
      .exec()
      .then((item) => {
        console.log("id to be updated",item);
         res.json(item)
        })
      .catch((err) => next(err));
  });

  app.post('/api/upload', (req, res, next)  => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log('req.body--->',req.body)
    console.log('req.file--->',req.file)
    upload(req,res, (err) =>{
      if(err)
        next(err)
          res.json({success:true ,
        fileName: req.file.filename
      })
    })
    
  })

};
