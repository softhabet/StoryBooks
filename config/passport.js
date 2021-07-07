const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
   passport.use(
      new GoogleStrategy(
         {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
         },
         async (accessToken, refreshToken, profile, done) => {
            const newUser = {
               googleId: profile.id,
               displayName: profile.displayName,
               firstName: profile.name.givenName,
               lastName: profile.name.familyName,
               image: profile.photos[0].value,
            };

            try {
               let user = await User.findOne({ googleId: profile.id });

               if (user) {
                  done(null, user);
               } else {
                  user = await User.create(newUser);
                  done(null, user);
               }
            } catch (err) {
               console.error(err);
            }
         }
      )
   );

   // var passport = require("passport"),
   //    FacebookStrategy = require("passport-facebook").Strategy;

   // passport.use(
   //    new FacebookStrategy(
   //       {
   //          clientID: "2571109769861049",
   //          clientSecret: "ac50e027e4accd3446cd89ed9caf8eae",
   //          callbackURL: "https://localhost:3000/auth/facebook/callback",
   //       },
   //       function (accessToken, refreshToken, profile, done) {
   //          console.log(profile, "ddddddddddddddd");
   //          //  User.findOrCreate(..., function(err, user) {
   //          //    if (err) { return done(err); }
   //          //    done(null, user);
   //          //  });
   //       }
   //    )
   // );

   // passport.use(
   //    new FacebookStrategy(
   //       {
   //          clientID: 2571109769861049,
   //          clientSecret: "ac50e027e4accd3446cd89ed9caf8eae",
   //          callbackURL: "http://localhost:3000/auth/facebook/callback",
   //          profileFields: ["email", "name"],
   //       },

   //       async (accessToken, refreshToken, profile, done) => {
   //          const { email, first_name, last_name, id } = profile._json;
   //          console.log('ffffffffffffffffff')
   //          console.log(profile, "eeeeeeeeeeeeeeeeee");
   //          const newUser = {
   //             email: email,
   //             firstName: first_name,
   //             lastName: last_name,
   //             //  accessToken: accessToken,
   //             facebookID: id,
   //          };
   //          try {
   //             let user = await User.findOne({ facebookID: profile.id });

   //             if (user) {
   //                done(null, user);
   //             } else {
   //                user = await User.create(newUser);
   //                done(null, user);
   //             }
   //          } catch (err) {
   //             console.error(err);
   //          }
   //       }
   //    )
   // );

   passport.serializeUser((user, done) => {
      done(null, user.id);
   });

   passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user));
   });
};
