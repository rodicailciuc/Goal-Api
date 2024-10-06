import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import hashPassword from '../utils/hashPassword.js';
import matchPassword from '../utils/matchPasswords.js';

const userControllers = {
    login: (req, res) => {
        const { email, password } = req.body;

        //check if the email exist
        const emailExist = User.getUserByEmail(email);
        if (!emailExist) {
            return res.status(400).render('404', {
                title: 'Your email does not exist in the data base',
                message: 'Please register'
            });
        }
        //email exist -> check if the password is correct
        bcrypt.compare(password, emailExist.password, (err, isValid) => {
            if (err) {
                console.error(err);
            }

            if (!isValid) {
                return res.status(400).render('404', {
                    title: 'Incorrect Email or Password',
                    message: 'Incorrect Email or Password'
                });
            }
            //create token
            const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
            //add to cookies
            res.cookie('token', token, { httpOnly: true });
            //redirect to goals
            res.status(302).redirect('/api/goals');
        });
    },

    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    },
    register: (req, res) => {
        const { email, password, rePassword } = req.body;

        //check if email exist
        const emailExist = User.getUserByEmail(email);
        if (emailExist) {
            return res.status(400).render('404', {
                title: 'Your email already exists',
                message: 'Your email already exists, please login'
            });
        }
        //validate email, password, check if passwords match
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const doPasswordsMatch = matchPassword(password, rePassword);

        if (isEmailValid && isPasswordValid && doPasswordsMatch) {
            //hash password
            const hashedPassword = hashPassword(password);
            console.log(hashedPassword);

            //create user
            const newUser = User.add({ email, password: hashedPassword });
            //redirect to login
            res.status(302).redirect('/api/login');
        } else {
            res.status(400).render('404', {
                title: 'Incorrect email or password',
                message: 'Incorrect email or password'
            });
        }
    },
    getRegisterForm: (req, res) => {
        res.status(200).render('register-form');
    },
    logout: (req, res) => {
        //remove token from cookies
        res.clearCookie('token');
        res.status(302).redirect('/api/goals');
    }
};

export default userControllers;
