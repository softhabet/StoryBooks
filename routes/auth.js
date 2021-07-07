const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
   "/google/callback",
   passport.authenticate("google", { failureRedirect: "/" }),
   (req, res) => {
      res.redirect("/dashboard");
   }
);

// router.get(
//    "/facebook",
//    passport.authenticate("facebook", {
//       scope: ["read_stream", "user_friends", "publish_actions"],
//    })
// );

// router.get(
//    "/facebook/callback",
//    passport.authenticate("facebook", { failureRedirect: "/" }),
//    (req, res) => {
//       res.redirect("/dashboard");
//    }
// );

// router.get("/facebook", passport.authenticate("facebook"));

// router.get(
//    "/facebook/callback",
//    passport.authenticate("facebook", {
//       successRedirect: "/",
//       failureRedirect: "/login",
//    })
// );

// @desc    Logout user
// @route   /auth/logout
router.get("/logout", (req, res) => {
   req.logout();
   res.redirect("/");
});

module.exports = router;
