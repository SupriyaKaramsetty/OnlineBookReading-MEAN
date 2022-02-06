const Book = require("../models/book");
const User = require("../models/user");
const Genre = require("../models/genre");

//find a book by its unique id
exports.bookById = (req,res,next,id) => {
    Book.findById(id).exec((err,book) => {
        if (err || !book){
            return res.status(400).json({
                 error: "Book does not exist"
             });
         };
         req.book = book;
         
         next();
     });
 };

 //get an individual book
 exports.getBook = (req,res) => {
    return res.json( req.book);   
};

//update the book data
exports.updateBook = (req,res) => {
    const book = req.book;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.release_year = req.body.release_year;
    book.description = req.body.description;
    book.cover = req.body.cover;
    book.pdf = req.body.pdf;
    book.pageCount = req.body.pageCount;
    book.save((err,data) => {
        if(err){
            return res.status(400).json({
                err: "error while updating book data"
            });
         }
       res.json(data);

    });
};

//delete a book 
exports.deleteBook = (req, res) => {
    let book = req.book;
    book.remove((err, deletedBook) => {
        if (err) {
            return res.status(400).json({
                error: (err)
            });
        }
    User.findOne({email : req.user.email}).then((user) => {
        console.log(user);
        user.wantToReadBooks.remove(book._id);
        user.currentlyReadingBooks.remove(book._id);
        user.readBooks.remove(book._id);
        user.save((err,res) => {
            console.log(res);
        })
    })
    res.json({
            message: 'Book deleted successfully'
        });
    });
};

//add a book records
exports.createBook = (req, res) => {
    console.log("inside create book " + req.body);
    const book = new Book(req.body);
    book.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "error while creating book data"
            });
        }
         return res.json(data);
    });
};



// get All Books
exports.getAllBooks = (req,res) => {
    Book.find().exec((err,data) => {
        if(err){
            return res.status(400).json({
                error: "Books are not found"
            });
        }
       return res.json(data);
    })
};

//this is related books part
exports.relatedBooks = (req,res) => {
    Book.find({_id: {$ne: req.book}, genre: req.book.genre})
        .populate('genre','genre_name') 
        .exec((err,books) => {
            if(err){
                return res.status(400).json({
                    error: "books not found"
                });
            }
            return res.json(books);
        });
};

exports.addToWantToReadBooks =  (req, res) => {
    let bookId = req.params.bookid;
    console.log(req.user);

    Book.findById(bookId).then((book) => {
        if (!book) {
            return res.status(400).json({
                message: 'There is no book with the given id in our database.'
            });
            
        }
        book.bookStatus = "Want To Read";
        User.findOne({email : req.user.email}).then((user) => {

            if (user.wantToReadBooks.indexOf(bookId) !== -1) {
                return res.status(400).json({
                    message: 'You already have this book in your want to read shelf'
                });
            }
            if (user.currentlyReadingBooks.indexOf(bookId) !== -1) {
                const index = user.currentlyReadingBooks.indexOf(bookId);
                user.currentlyReadingBooks.splice(index,1);
            }
            if (user.readBooks.indexOf(bookId) !== -1) {
                if (user.readBooks.indexOf(bookId) !== -1) {
                    const index = user.readBooks.indexOf(bookId);
                    user.readBooks.splice(index,1);
                }
            }
            book.save();
            user.wantToReadBooks.push(book._id);
            user.save();

            return res.status(200).json({
                message: 'Successfully added the book to want to read shelf.',
                data: book.bookStatus
            });
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong, please try again.'

        });
    });
}

exports.addToCurrentlyReadingBooks =  (req, res) => {
    let bookId = req.params.bookid;

    Book.findById(bookId).then((book) => {
        if (!book) {
            return res.status(400).json({
                message: 'There is no book with the given id in our database.'
            });
        }
        book.bookStatus = "Reading";
        User.findOne({email : req.user.email}).then((user) => {

            if (user.currentlyReadingBooks.indexOf(bookId) !== -1) {
                return res.status(400).json({
                    message: 'You already have this book in your currently reading shelf'
                });
            }
            if (user.wantToReadBooks.indexOf(bookId) !== -1) {
                const index = user.wantToReadBooks.indexOf(bookId);
                user.wantToReadBooks.splice(index,1);
            }
            if (user.readBooks.indexOf(bookId) !== -1) {
                if (user.readBooks.indexOf(bookId) !== -1) {
                    const index = user.readBooks.indexOf(bookId);
                    user.readBooks.splice(index,1);
                }
            }
            book.save(); 
            user.currentlyReadingBooks.push(book._id);
            user.save();
            return res.status(200).json({
                message: 'Successfully added the book to currently reading shelf.',
                data: book.bookStatus
            });
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong, please try again.'
        });
    });
}

exports.addToReadBooks =  (req, res) => {
    let bookId = req.params.bookid;
    console.log(bookId);
    Book.findById(bookId).then((book) => {
        if (!book) {
            return res.status(400).json({
                message: 'There is no book with the given id in our database.'
            });
        }
        book.bookStatus = "Read";
        User.findOne({email : req.user.email}).then((user) => {

            if (user.readBooks.indexOf(bookId) !== -1) {
                return res.status(400).json({
                    message: 'You already have this book in your read shelf'
                });
            }
                if (user.currentlyReadingBooks.indexOf(bookId) !== -1) {
                    const index = user.currentlyReadingBooks.indexOf(bookId);
                    user.currentlyReadingBooks.splice(index,1);
                }
            if (user.wantToReadBooks.indexOf(bookId) !== -1) {
                    const index = user.wantToReadBooks.indexOf(bookId);
                    user.wantToReadBooks.splice(index,1);
                }      
            book.save();          
            user.readBooks.push(book._id);
            user.save();

            return res.status(200).json({
                message: 'Successfully added the book to read shelf.',
                data: book.bookStatus
            });
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong, please try again.'
        });
    });
}

exports.getWantToReadBooks = (req,res) => {
    const email = req.user.email;
    User.findOne({ email: email })
    .populate('wantToReadBooks')
    .then((user) => {
        if (!user) {
            return res.status(400).json({
                message: `User not found in our database`
            });
        }


        return res.status(200).json(user.wantToReadBooks);
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong, please try again.'
        });
    });

}


exports.getCurrentlyReadingBooks = (req,res) => {

    const email = req.user.email;
    User.findOne({ email: email })
    .populate('currentlyReadingBooks')
    .then((user) => {
        if (!user) {
            return res.status(400).json({
                message: `User  not found in our database`
            });
        }


        return res.status(200).json(user.currentlyReadingBooks);
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong, please try again.'
        });
    });

}

exports.getReadBooks = (req,res) => {

    const email = req.user.email;
    User.findOne({ email: email })
    .populate('readBooks')
    .then((user) => {
        if (!user) {
            return res.status(400).json({
                message: `User  not found in our database`
            });
        }
        return res.status(200).json(user.readBooks);
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong, please try again.'
        });
    });

}

exports.getLibraryBooks = (req,res) => {
    const email = req.user.email;
    User.findOne({ email: email })
    .populate('wantToReadBooks')
    .populate('currentlyReadingBooks')
    .populate('readBooks')
    .then((user) => {
        if (!user) {
            return res.status(400).json({
                message: `User not found in our database`
            });
        }
        return res.status(200).json(user.wantToReadBooks.concat(user.currentlyReadingBooks).concat(user.readBooks));
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong, please try again.'
        });
    });
}