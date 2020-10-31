const book = require("../models/Book.js");

exports.get_all_books = (req,res)=>{
    book.find()
         .sort({date: -1})
         .then(items=> res.json(items));
}

exports.add_book = (req,res)=>{
    console.log(req.body.id);
    const newbook = new book({
        bookid:req.body.id,
        title:req.body.title,
        author:req.body.authors,
        publisher:req.body.publisher,
        published_date:req.body.publishedDate,
        summary: req.body.description,
        thumbnail: req.body.thumbnail,
        count: req.body.count,
    });
    newbook.save().then(item=> res.json(item)).catch((err)=>{
        if(err) throw err;
    });
}
exports.updateinventory=(req,res)=>{
    let id = req.params.id;
    book.findOne({_id:id}, function(err,foundObject){
        if(err){
            res.json("null");
        }
        else{
            if(!foundObject){
                res.json("null");
            }
            else{
                if(req.body.action){
                    if(req.body.count){
                        if(req.body.action==="add"){
                            foundObject.count = foundObject.count+parseInt(req.body.count);
                        }
                        if(req.body.action==="remove"){
                            foundObject.count = foundObject.count-parseInt(req.body.count);
                        }
                    }
                }
                foundObject.save(function(err,updatedObject){
                    if(err){
                        res.status(500).send();
                    }
                    else{
                        res.json(updatedObject);
                    }
                })
            }
        }
    })

}

exports.deletebook= async (req,res)=>{
    let id  = req.params.id;
    console.log(id);
    try{
        const result = await book.findByIdAndDelete(id);
        console.log(result);
        res.send(result);
    }
    catch(error){
        res.json("null");
    }
    
}