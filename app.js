const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


const app = express();

const dbURI = 'mongodb+srv://sifo:django123@learnmongo.ce0cz.mongodb.net/learnNodeExpressMongo?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db!!');
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        })
    })
    .catch((err) => { console.log(err); })


// register view engine 
app.set('view engine', 'ejs');

// change templates folder
// app.set('views', 'other_folder')

// serve static files 
app.use(express.static('public'));

// 3rd party middleware (logger)
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {

    res.render('about', { title: 'About' });
})


// blog routes
app.use('/blogs', blogRoutes);


// will execute when no route is matched 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

