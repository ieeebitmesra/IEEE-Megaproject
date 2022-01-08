const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'team.space.793@gmail.com',
        pass: 'space.793'
    }
});

module.exports.check = (req, res) => {
    const { token } = req.body;
    if (token === undefined || req.body === undefined) {
        res.send({ message: 404 })
    }
    else {
        const user = jwt.verify(token, "myKey");
        // console.log(user.user);
        const passU = user.user
        res.send({ message: 200, user: passU });
    }
}

module.exports.checkMail = (req, res) => {
    const { email } = req.body
    //console.log(email);
    User.findOne({ email: email }, async function (err, user) {
        try {
            if (user)
                res.send({ exist: 1 });
            else
                res.send({ exist: 0 });
        }
        catch (err) {
            console.log(err);
        }
    })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, async function (err, user) {
        try {
            if (user) {
                const chk = await bcrypt.compare(password, user.password);
                if (chk) {
                    let token = jwt.sign({ user }, "myKey");
                    res.send({ message: "Login Successfull", user: user, token: token })
                }
                else {
                    res.send({ message: "Incorrect password" })
                }
            }
            else {
                res.send({ message: "User not registered" })
            }
        } catch {

        }
    })
}
module.exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        User.findOne({ email: email }, (err, user) => {
            if (user) {
                res.send({ message: 'User already registered' })
            }
            else {
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                })
                for (let i = 1; i <= 365; i++) {
                    user.calender.push({ day: i, value: 0 });
                }
                user.save(err => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({ message: 'User registered successfully!' })
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.code = async (req, res) => {

    const { email, r } = req.body
    var mailOptions = {
        from: 'team.space.793@gmail.com',
        to: email,
        subject: "Space Login Verification Code",
        text: `Your Code is: ${r}\nUse it to verify your email in Space.\n\nIf you didn't request this, simply ignore this message.\n\nYours,\nThe Space Team`
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send({ done: 0, detail: error });
            console.log(error);
        }
        else {
            res.send({ done: 1, detail: info });
            console.log(info);
        }
    })
}

module.exports.feedback = (req, res) => {
    const { name, subject, email, message } = req.body
    var maillist = [
        'vinamramishra2011@gmail.com',
        'ratuldawar11@gmail.com',
        'rishikaraj7263@gmail.com'
    ]
    var mail = {
        from: 'team.space.793@gmail.com',
        to: 'team.space.793@gmail.com',
        subject: `${name}'s Feedback`,
        cc: maillist,
        text: `From: ${name}\nEmail of user: ${email}\nsubject: ${subject}\n\nmessage:\n${message}`
    }
    transporter.sendMail(mail, function (error, info) {
        if (error) {
            res.send({ done: 0 });
        }
        else
            res.send({ done: 1 });
    })
}

module.exports.resetPass = (req, res) => {
    const { email, code } = req.body
    var deliver = {
        from: 'team.space.793@gmail.com',
        to: email,
        subject: 'Password Reset Code',
        text: `Code for password reset of your space account is ${code}`
    }
    transporter.sendMail(deliver, function (error, info) {
        if (error) {
            res.send({ done: 0, detail: error });
            console.log(error);
        }
        else {
            res.send({ done: 1, detail: info });
            console.log(info);
        }
    })
}

module.exports.updatePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.save();
        res.send({ status: 200 });

    } catch (err) {
        console.log(err);
    }
}
