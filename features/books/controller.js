var express = require('express');
var router = express.Router();
var db = require('../../data/db');

/* GET books. */
router.get('/', async function(req, res, next) {
  var model = require('./index');

  model.title = 'Index Title from books';
  model.message = 'Index Message from books';
  model.books = await db.Book.find({}).exec();

  res.render('index', model);
});

/* GET book with {id} */
router.get('/:id',async function(req,res,next){
  var book = await db.Book.findById({"_id":req.params.id}).exec();
  var model = require('./show');

  model.title = book.title;
  model.author = book.author;

  res.render('show',model);
});

router.post('/',async function(req,res,next){
  var model = require('./show');
  
  model.title = req.body.title;
  model.author = req.body.author;

  const book = new db.Book(model);

  book.save().then(() => res.send(model));
});

module.exports = router;
