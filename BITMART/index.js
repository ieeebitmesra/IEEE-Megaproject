const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Mongostore=require('connect-mongo');
const ejsmate=require('ejs-mate');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const localStrat=require('passport-local');
const path=require('path');
const methodOverride=require('method-override');
const User=require('./models/user');
const Product=require('./models/productModel');
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dotenv=require('dotenv');
dotenv.config({})

async function main() {
    mongoose.connect(process.env.db_url);
}

main()
    .then(() => {
        console.log('Connected!');
    })
    .catch((error) => {
        console.log(error);
    });

//Setting Up Mongo Store
const store=new Mongostore(
    {
        mongoUrl: process.env.db_url,
        secret: process.env.db_secret,
        touchAfter: 24*3600
    }
);

store.on('error', function (e) {
    console.log(e);
});

app.listen(process.env.PORT, () => {
    console.log(`Listning on Port ${process.env.PORT}`);
});
//Setting ejs and views Directory

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Setting up Public Directory for static files

app.use(express.static(path.join(__dirname, 'public')));

// Configuring Express Sessions 

app.use(session({ secret: 'Enter Secret Here', saveUninitialized: true, resave: false }));

// Configuring Flash

app.use(flash());
//Passport configure

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat({
    usernameField: 'email'
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Setting Locals

app.use((req, res, next) => {
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.user=req.user;
    res.locals.query=req.query;
    next();
});


// Method Override for Other Types of Requests like put ,delete etc

app.use(methodOverride('_method'));


const loginRoutes=require('./routes/loginRoutes');
const userRoutes=require('./routes/userRoutes');
const product=require('./routes/productRoute');
const reviewRoute=require('./routes/reviewRoutes');
const cartRoute=require('./routes/cartRoutes');
const wishlistRoute=require('./routes/wishlistRoutes');
const orderRoute=require('./routes/orderRoute');
const errorMiddleware=require('./middleware/error')

//Home and Front Pages

app.get('/', async (req, res, next) => {
    const products=await Product.find()
        .populate('images');
    res.render('home', { products });
    //This is real res.render('home');
});

app.use('/', loginRoutes);

app.use('/users', userRoutes);

app.use('/products', product);

app.use('/products/:id/reviews', reviewRoute);

app.use('/cart', cartRoute);

app.use('/wishlist', wishlistRoute);

app.use('/order', orderRoute);

app.get('/search', (req, res, next) => {
    res.render('search');
});


app.get('/aboutus', (req, res) => {
    res.render('aboutus');
})

app.use(errorMiddleware)


app.use((err, req, res, next) => {
    let { status=500 }=err;
    // console.log(err);
    res.status(status).render('404', { err, status });
});


app.get('*', (req, res, next) => {
    res.status(404).render('404', { status: 404 });
});

