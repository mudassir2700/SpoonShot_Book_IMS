const express = require('express');
const router = express.Router();
const func = require('../../controllers/bookcontroller');
//Books Model

const book = require('../../models/Book');

const path  = require('path');

// route: Get request to api/books
// description: get all books in inventory
// access: Public
router.get('/',func.get_all_books);

// route: Post request to api/books
// description: create an entry
// access: Public
router.post('/add/',func.add_book);

// route: post request to api/books
// description: Update Inventory
// access: Public
router.post('/updateinventory/:id',func.updateinventory);

// route: post request to api/books
// description: Delete Inventory
// access: Public
router.post('/deleteinventory/:id',func.deletebook);





module.exports = router;