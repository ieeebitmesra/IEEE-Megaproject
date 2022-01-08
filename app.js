const express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");
const { urlencoded } = require("body-parser");
const ejs = require("ejs");
const app = express();
const multer = require("multer")
const nodemailer = require('nodemailer');
const mailGun = require("nodemailer-mailgun-transport")

const auth = {
    auth: {
        api_key: '2fad5ebbca13ec3f1539f8ce1f071828-0be3b63b-776f1e86',
        domain: 'sandbox66606511a5a242e9b73cae81bd85fd99.mailgun.org'
    }
}

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'allstudentsHub@outlook.com',
    pass: 'btech/10xxx/20'
  }
});

const send_transporter = nodemailer.createTransport(mailGun(auth))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
 
const upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 3
    },
});

const User = require("./models/User");
const Forum = require("./models/Forum");
const Resources = require("./models/Resources");
const Experience = require("./models/Experience");

let isSignedIn = false;
let ver_num = 123456;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
    key: 'user',
    secret: 'StudentHub',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60480000
    }
}));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    if (req.session.user && req.session.StudentHub) {
        res.render("home", {bool:isSignedIn})
    }
    next()
})

var sessionChecker = function(req, res, next) {
    if (req.session.user && req.session.StudentHub) {
        res.render("home", {bool:isSignedIn})
    } else {
        next()
    }
}

app.route("/")
.get(sessionChecker, function(req, res) {
    res.render("home", {bool:isSignedIn});
});

app.route("/signup")
.get(sessionChecker, function(req, res) {
    res.render("signup");
})
.post(function(req, res) {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        institute: req.body.institute,
        verified: false
    });

    user.save(function(err, docs) {
        if (err) {
            res.redirect("signup");
            console.log(err);
        } else {
            console.log(docs);
            req.session.user = docs;
            ver_num = Math.floor(100000 + Math.random() * 900000)
            User.find({username: req.body.username}, function(err, result){
                if(!err){
                    let mailOptions = {
                        from: 'allstudentsHub@outlook.com',
                        to: result[0].email,
                        subject: 'Student-Hub Verification Code',
                        text: 'Your verification code is: '+ver_num
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                      res.redirect("/verification")
                } else {
                    res.redirect("/signup")
                }
            }) 
        }
    })
});

app.get("/verification", sessionChecker, function(req, res){
    res.render("verification")
})
app.post("/verification", sessionChecker, function(req, res){
    if(ver_num == req.body.code){
        console.log("code verified")
        User.findOneAndUpdate({username: req.session.user.username}, {$set: {verified: true}}, function(err, result){
            if(!err){
                res.redirect("/signin")
            } else {
                console.log(err)
            }
        })
    } else {
        console.log("wrong code")
        res.redirect("/verification")
    }
})

app.route("/signin")
.get(sessionChecker, function(req, res) {
    isSignedIn = false;
    res.render("signin");
})
.post(async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    try {
        let user = await User.findOne({username: username}).exec();
        if(!user) {
            res.redirect("/signin")
        }
        if(!user.verified){
            res.redirect("/verification")
        }
        user.comparePassword(password, function(error, match) {
            if (!match) {
                res.redirect("signin");
            }
        });
        req.session.user = user;
        isSignedIn = true;
        res.redirect("/")
    } catch(e) {
        console.log(e)
    }
});

app.route("/forum")
.get(sessionChecker, function(req, res) {
    if(isSignedIn) {
        Forum.find(function(err, result){
            if (!err){
                res.render("forum", {bool: isSignedIn, result: result})
            } else {
                res.redirect("home", {bool:isSignedIn})
            }
        });
    } else {
        res.redirect("/signin")
    }
});
app.post("/forum", sessionChecker, function(req, res){
    let hint = '';
    let response = '';
    let searchQ = req.body.query.toLowerCase();
    console.log(searchQ)
    if(searchQ.length > 0){
        Forum.find({}, function(err, results) {
            if(!err){
                results.forEach(function(result) {
                    if(result.title.toLowerCase().indexOf(searchQ) == 0){
                        if(hint === ""){
                            hint = "<a href='/forum/"+ result._id +"'>"+ result.title +"</a>"
                        } else {
                            hint = hint + "<hr><br><a href='/forum/"+ result._id +"'>"+ result.title +"</a>"
                        }
                    }
                })
            } else {
                console.log(err)
            }
            if(hint === ""){
                response = "nothing found"
            } else {
                response = hint
            }
            console.log(response)
            res.send({response: response})
        })
    }
});

app.route("/forum/add")
.get(sessionChecker, function(req, res){
    if (isSignedIn){
        res.render("forum_add", {bool: isSignedIn})
    } else {
        res.redirect("/signin")
    }
})
.post(sessionChecker, function(req, res){
    if (isSignedIn) {
        let forum = new Forum({
        title: req.body.title,
        topic: req.body.topic,
        content: req.body.content,
        author: req.session.user.username
        });
        forum.save(function(err, done){
            if (!err) {
                Forum.find(function(err, result){
                    if (!err){
                        res.redirect("/forum")
                    } else {
                        res.render("home", {bool:isSignedIn})
                    }
                });
            } else {
                res.render("forum_add", {bool: isSignedIn});                 
            }
        })
    } else {
        res.redirect("/signin", {bool: isSignedIn})
    }
})

app.get("/aboutus", sessionChecker, function(req, res) {
    res.render("aboutus", {bool: isSignedIn})
})

app.get("/profile", sessionChecker, function(req, res){
    if(isSignedIn){
        Resources.find({author: req.session.user.username}, function(err, result_res){
            if (!err){
                Experience.find({author: req.session.user.username}, function(err, result_exp){
                    if(!err){
                        console.log(result_exp)
                        User.find({username: req.session.user.username}, function(err, result_user){
                            if(!err){
                                res.render("profile", {bool: isSignedIn, result_res: result_res, result_exp: result_exp, result_user: result_user[0]})
                            } else {
                                res.redirect("home", {bool:isSignedIn})
                            }
                        })
                    } else {
                        res.redirect("home", {bool:isSignedIn})
                    }
                })
            } else {
                res.redirect("home", {bool:isSignedIn})
            }
        });
    } else {
        res.redirect("/signin")
    }
})
app.get("/profile/edit", sessionChecker, function(req, res){
    if(isSignedIn){
        res.render("profile_edit", {bool: isSignedIn})
    } else {
        res.redirect("/signin")
    }
})
app.post("/profile/edit", upload.single('image'), function(req, res){
    User.findOneAndUpdate({username: req.session.user.username}, {
        $set: {
            designation: req.body.designation,
            institute: req.body.institute,
            portfolio: req.body.portfolio,
            img: req.file.filename
        }
    }, function(err, response){
        if (!err){
            res.redirect("/profile")
        } else {
            console.log(err)
            res.redirect("/profile/edit")
        }
    })
})

app.get("/helpdesk", sessionChecker, function(req, res) {
    res.render("helpdesk", {bool: isSignedIn})
})
app.post("/helpdesk", sessionChecker, function(req, res){
    let mailOptions = {
        from: req.body.email,
        to: 'allstudentsHub@outlook.com',
        subject: 'User query: Helpdesk',
        text: req.body.name+': '+req.body.description
    };
    send_transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log(err)
        } else {
            res.redirect("/helpdesk")
        }
    })
})

app.get("/resources", function(req, res) {
    Resources.find(function(err, result_res){
        if (!err){
            Resources.find(function(err, result){
                if (!err){
                    if(isSignedIn){
                        User.findOne({username: req.session.user.username}, function(err, res_user){
                            if(!err){
                                res.render("resources", {bool: isSignedIn, result_res: result_res, result: result, res_user: res_user})
                            } else {
                                res.redirect("home", {bool:isSignedIn})
                            }
                        })
                    } else {
                        res.render("resources", {bool: isSignedIn, result_res: result_res, result: result})
                    }
                } else {
                    res.redirect("home", {bool:isSignedIn})
                }
            }).sort({views: -1})
        } else {
            res.redirect("home", {bool:isSignedIn})
        }
    });
})
app.post("/resources", sessionChecker, function(req, res){
    if(req.body.status == "true"){
        User.findOneAndUpdate({username: req.session.user.username}, {$push: {resources: {id: req.body.clicked_id, title: req.body.title}}}, function(err, result){
            if(!err){
                console.log("added")
            } else {
                console.log(err)
            }
        })
    } else {
        User.findOneAndUpdate({username: req.session.user.username}, {$pull: {resources: {id: req.body.clicked_id, title: req.body.title}}}, function(err, result){
            if(!err){
                console.log("subtracted")
            } else {
                console.log(err)
            }
        })
    }
});
app.post("/resources/search", sessionChecker, function(req, res){
    console.log(req.body)
    let hint = '';
    let response = '';
    let searchQ = req.body.query.toLowerCase();
    console.log(searchQ)
    if(searchQ.length > 0){
        Resources.find({}, function(err, results) {
            if(!err){
                results.forEach(function(result) {
                    if(result.title.toLowerCase().indexOf(searchQ) == 0){
                        if(hint === ""){
                            hint = "<a href='/resources/"+ result._id +"'>"+ result.title +"</a>"
                        } else {
                            hint = hint + "<br><a href='/resources/"+ result._id +"'>"+ result.title +"</a>"
                        }
                    }
                })
            } else {
                console.log(err)
            }
            if(hint === ""){
                response = "nothing found"
            } else {
                response = hint
            }
            console.log(response)
            res.send({response: response})
        })
    }
});
app.get("/resources/write", sessionChecker, function(req, res){
    if(isSignedIn){
        res.render("resources_write", {bool: isSignedIn});
    } else {
        res.redirect("/signin")
    }
})
app.post("/resources/write", sessionChecker, function(req, res){
    if (isSignedIn) {
        let today = new Date();
        let options = {
            day: "numeric",
            month: "long",
            year: "numeric"
        };
        let date = today.toLocaleDateString("en-US", options);
        let resources = new Resources({
        title: req.body.title,
        content: req.body.content,
        author: req.session.user.username,
        views: 0.0,
        date: date
        });
        resources.save(function(err, done){
        if (err) {
            res.render("resources_write", {bool: isSignedIn});
            console.log(err);
        } else {
            Resources.find(function(err, result_res){
                if (!err){
                    Resources.find(function(err, result){
                        if (!err){
                            User.findOne({username: req.session.user.username}, function(err, res_user){
                                if(!err){
                                    res.redirect("/resources")
                                } else {
                                    res.redirect("/home", {bool:isSignedIn})
                                }
                            })
                        } else {
                            res.redirect("/home", {bool:isSignedIn})
                        }
                    }).sort({views: -1})
                } else {
                    res.redirect("/home", {bool:isSignedIn})
                }
            });
        }
    })
    } else {
        res.redirect("/signin", {bool: isSignedIn})
    }
})

app.get("/internship", sessionChecker, function(req, res) {
    Experience.find(function(err, result){
        if (!err){
            res.render("internship", {bool: isSignedIn, result: result})
        } else {
            res.redirect("home", {bool:isSignedIn})
        }
    });
});
app.post("/internship", sessionChecker, function(req, res){
    let hint = '';
    let response = '';
    let searchQ = req.body.query.toLowerCase();
    console.log(searchQ)
    if(searchQ.length > 0){
        Experience.find({}, function(err, results) {
            if(!err){
                results.forEach(function(result) {
                    if(result.title.toLowerCase().indexOf(searchQ) == 0){
                        if(hint === ""){
                            hint = "<a href='/internship/"+ result._id +"'>"+ result.title +"</a>"
                        } else {
                            hint = hint + "<br><a href='/internship/"+ result._id +"'>"+ result.title +"</a>"
                        }
                    }
                })
            } else {
                console.log(err)
            }
            if(hint === ""){
                response = "nothing found"
            } else {
                response = hint
            }
            console.log(response)
            res.send({response: response})
        })
    }
});

app.get("/internship/write", sessionChecker, function(req, res){
    if(isSignedIn){
        res.render("internship_write", {bool: isSignedIn});
    } else {
        res.redirect("/signin")
    }
})
app.post("/internship/write", sessionChecker, function(req, res){
    let today = new Date();
    let options = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    let date = today.toLocaleDateString("en-US", options);
    if (isSignedIn) {
        User.find({username: req.session.user.username}, function(err, result_user){
            if(!err){
                let experience = new Experience({
                    title: req.body.title,
                    company: req.body.company,
                    content: req.body.content,
                    author: req.session.user.username,
                    date: date,
                    img: result_user[0].img
                })
                experience.save(function(err, done){
                    if (err) {
                        res.render("internship_write", {bool: isSignedIn});
                        console.log(err);
                    } else {
                        Experience.find(function(err, result){
                            if (!err){
                                res.redirect("internship")
                            } else {
                                res.render("home", {bool:isSignedIn})
                            }
                        }); 
                    }
                })
            } else {
                res.render("home", {bool:isSignedIn})
            }          
    });
    } else {
        res.redirect("/signin", {bool: isSignedIn})
    }
})

app.get("/forum/:id", function(req, res){
    if(isSignedIn){
        Forum.findOne({_id: req.params.id}, function(err, result){
            if (!err){
                res.render("forum_view", {bool: isSignedIn, result: result})
            } else {
                res.redirect("/forum")
            }
        });
    } else {
        res.redirect("/signin")
    }
})
app.post("/forum/:id", function(req, res){
    if(isSignedIn){
        Forum.findOneAndUpdate({_id: req.params.id}, {$push: {reply: {content: req.body.reply, respondent: req.session.user.username}}}, function(err, done){
            if (!err){
                Forum.findOne({_id: req.params.id}, function(err, result){
                    if (!err){
                        res.redirect("/forum/"+req.params.id)
                    } else {
                        res.redirect("/forum")
                    }
                });
            } else {
                res.redirect("/forum")
            }
        });
    } else {
        res.redirect("/signin")
    }
})
app.get("/forum/topics/:topic", function(req, res){
    if(isSignedIn){
        Forum.find({topic: req.params.topic}, function(err, result){
            if (!err){
                console.log(result)
                res.render("forum", {bool: isSignedIn, result: result})
            } else {
                res.redirect("/forum")
            }
        });
    } else {
        res.redirect("/signin")
    }
})

app.get("/resources/:id", function(req, res){    
    Resources.findOneAndUpdate({_id: req.params.id}, {$inc: {views: 1}}, {new: true}, function(err, response){
        if (err){
            console.log(err)
        } else {
            console.log(response)
        }
    })
    Resources.findOne({_id: req.params.id}, function(err, result){
        if (!err){
            res.render("resources_view", {bool: isSignedIn, result: result})
        } else {
            res.redirect("/resources", {bool: isSignedIn, result: result})
        }
    });
})

app.get("/internship/:id", function(req, res){       
    Experience.findOne({_id: req.params.id}, function(err, result){
        if (!err){
            console.log(result)
            res.render("internship_view", {bool: isSignedIn, result: result})
        } else {
            res.redirect("/internship")
        }
    });
})

app.get("/user/:user", function(req, res){       
    User.findOne({username: req.params.user}, function(err, result){
        if (!err){
            res.render("general_profile", {bool: isSignedIn, result: result})
        } else {
            res.redirect("/home", {bool: isSignedIn})
        }
    });
})
  
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
    console.log('Server is started '+port);
});
