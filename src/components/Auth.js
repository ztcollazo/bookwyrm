import express from "express";
import passport from "passport";
import faunadb, { Client } from "faunadb";
import React from "react";
import dotenv from "dotenv";
import { Strategy as LocalStrategy } from "passport-local";

class Auth {
    constructor() {
        this.q = faunadb.query;
        dotenv.config({ path: "../../.env" })
        this.users = new Client({ secret: process.env.FAUNA_USER_ADMIN_KEY })
        this.app = express();
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    LoginForm({ props }) {
        passport.use(LocalStrategy(
            (username, password, done) => {
                this.users.query(
                    this.q.Login(
                            this.q.Match(
                            this.q.Index('users_by_email'),
                            { username: username } || { email: username }
                        ),
                        { password: password }
                    )
                ).then(
                    (err, user) => {
                        if (err) { return done(err); }
                        if (!user) {
                            return done(null, false, { message: 'Incorrect username.' });
                        }
                        if (!user.validPassword(password)) {
                            return done(null, false, { message: 'Incorrect password.' });
                        }
                        return done(null, user);
                    }
                )
            }
        ));
        this.app.post(
            "/login", 
            passport.authenticate(
                'local',
                {
                    successRedirect: window.history.back(),
                    failureRedirect: '/login',
                    failureFlash: true
                }
            )
        ); 
        return (
            <>
                <form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password"/>
                    </div>
                    <div>
                        <input type="submit" value="Log In"/>
                    </div>
                </form>
            </>
        );
    }
}

export default Auth;