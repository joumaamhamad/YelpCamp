const User = require('../models/user');
const nodemailer = require('nodemailer');

const sendEmail = (to, message) => {
    // Create a transporter using your email service (e.g., Gmail)
    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'mhamad_jomaa@outlook.com', // Your email address
            pass: 'jom123jom', // Your email password or app-specific password
        },
    });

    // Define email options
    const mailOptions = {
        from: 'mhamad_jomaa@outlook.com', // Sender's email address
        to: to, // Recipient's email address (passed as a parameter)
        subject: 'Subject of the Email',
        text: message, // Message content (passed as a parameter)
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports.renderRegister = (req , res) => {
    res.render('users/register');
}

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })  
        
        
    } catch (e) {
        console.log(e.message);
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req , res) => {
    res.render('users/login');
}

module.exports.login = async (req , res) => {

    req.flash('success', 'welcome back!');
    await sendEmail(req.user.email , `You logged In !! Welcome Back ${req.user.username}`);
    console.log(req.user.email);
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}