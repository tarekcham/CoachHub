const express = require("express");
const router = express.Router();

// Item Model
const Item = require('../../models/Item');


// @route  GET api/items
// @desc   Get All Items
// @access public

router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items =>  res.json(items),        
        )
})


// @route  POST api/items
// @desc   add item
// @access public

router.post('/', (req, res) => {
   const newItem = new Item({
       title: req.body.title,
       description: req.body.description,
       complete:false

   });
   newItem.save().then(item => res.json(item));
})


// @route  DELETE api/items
// @desc   Delete an Item
// @access public

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({sucess: true})  ) )
        .catch(err => res.status(404).json({success: false}));

})


// @route  PUT api/items
// @desc   Update an Item
// @access public

router.put('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.updateOne({
            title: req.body.title,
            description: req.body.description,
            complete:req.body.complete
     
        }).then(() => res.json({sucess: true})  ) )
        .catch(err => res.status(404).json({success: false}));

})


module.exports = router;