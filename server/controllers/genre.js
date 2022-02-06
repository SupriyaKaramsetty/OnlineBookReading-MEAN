const Genre = require('../models/genre');

exports.genreById = (req,res,next,id) => {
    Genre.findById(id).exec((err,genre) => {
        if (err || !genre){
            return res.status(400).json({
                 error: "Genre does not exist"
             });
         }
         req.genre = genre;
         next();
     });
 };


 exports.genreList = (req,res) => {

    Genre.find().exec((err,data) => {
        if(err){
            return res.status(400).json({
                error: "Genres are not found"
            });
        }
       return res.json(data);
    })
};


exports.createGenre = (req,res) => {
    const genre = new Genre(req.body);
    genre.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: (err)
            });
         }
       res.json({data});

    });
};
exports.getGenre = (req,res) => {
    return res.json( req.genre);   
};

exports.updateGenre = (req,res) => {
    const genre = req.genre;
    genre.genre_name = req.body.genre_name;
    genre.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: "Error while updating the genre"
            });
         }
       res.json(data);

    });
};

exports.deleteGenre = (req,res) => {
    const genre = req.genre;
    genre.remove((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
         }
       res.json({message: "Genre deleted successfully"});

    });
};
